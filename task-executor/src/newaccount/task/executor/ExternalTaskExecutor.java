package newaccount.task.executor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class ExternalTaskExecutor implements Runnable {
	Logger log = Logger.getLogger(getClass().getName());
	
	enum Method {
		POST,
		GET,
		DELETE
	}
	
	static class Response {
		int responseCode;
		String response;
	}
	
	public static Response call(Method method, String url, String post) throws IOException {
		HttpURLConnection u = (HttpURLConnection) new URL(url).openConnection();
		try {
			u.setRequestMethod(method != null ? method.name() : Method.GET.name());
			u.setRequestProperty("Accept", "application/json");
			u.setRequestProperty("Authorization", "Basic " + Base64.getEncoder().encodeToString("demo:demo".getBytes()));
			u.setDoInput(true);
			if (post != null) {
				u.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
				u.setDoOutput(true);
				OutputStream os = u.getOutputStream();
				try {
					OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
					osw.write(post);
					osw.flush();
					os.flush();
				} finally {
					os.close();
				}
			}
			
			Response r = new Response();
			r.responseCode = u.getResponseCode();
			InputStream is = r.responseCode > 399 ? u.getErrorStream() : u.getInputStream();
			if (is != null) {
				try {
					InputStreamReader isr = new InputStreamReader(is, "UTF-8");
					BufferedReader br = new BufferedReader(isr);
					r.response = br.readLine();
					if (r.responseCode > 399) {
						throw new IOException(r.responseCode + " " + r.response);
					}
					return r;
				} finally {
					is.close();
				}
			} else {
				if (r.responseCode > 399) {
					throw new IOException(String.valueOf(r.responseCode));
				} else {
					return r;
				}
			}
		} finally {
			//u.disconnect();
		}
	}

	// do and ignore
	public static Response burp(Method method, String url, String body) {
		try {
			Response r = call(method, url, body);
			return r;
		} catch (Exception e) {
			// Don`t care
			return null;
		}
	}
	
	static String bpmUrl = "http://localhost:8080/engine-rest/";
	static String telegramToken = null;
	static String telegramChannel = null;

	@Override
	public void run() {
		String s = System.getenv("BPM_URL");
		if (s != null) {
			bpmUrl = s.trim();
		}
		
		s = System.getenv("TELEGRAM_TOKEN");
		if (s != null) {
			telegramToken = s.trim();
		}
		
		s = System.getenv("TELEGRAM_CHANNEL");
		if (s != null) {
			telegramChannel = s.trim();
		}
		
		// log.info("Checking for available tasks...");
		try {
			Gson gson = new GsonBuilder().create();
			List<Object> topics = new ArrayList<Object>();
			List<String> variables = new ArrayList<String>();
			variables.add("phoneNumber");
			Map<String,Object> topicSendSMS = new HashMap<String, Object>();
			topicSendSMS.put("topicName", "sendSMS");
			topicSendSMS.put("lockDuration", 5000);
			topicSendSMS.put("variables", variables);
			topics.add(topicSendSMS);
			Map<String,Object> topicCreateReport = new HashMap<String, Object>();
			topicCreateReport.put("topicName", "createReport");
			topicCreateReport.put("lockDuration", 5000);
			topicCreateReport.put("variables", variables);
			topics.add(topicCreateReport);
			Map<String,Object> params = new HashMap<String, Object>();
			params.put("workerId", "test1");
			params.put("maxTasks", 1);
			params.put("topics", topics);
			String post = gson.toJson(params);
			// log.info("Sending " + post);
			Response r = call(Method.POST, bpmUrl + "/external-task/fetchAndLock", post);
			// log.info("Got " + r.responseCode + " " + r.response);
			JsonArray all = gson.fromJson(r.response, JsonArray.class);
			if (all.size() > 0) {
				//log.info("Got tasks: " + all);
				for (int i = 0; i < all.size(); i++) {
					JsonObject t = (JsonObject) all.get(i);
					String id = t.get("id").getAsString();
					String topicName = t.get("topicName").getAsString();
					String pid = t.get("processInstanceId").getAsString();
					log.info("Got task " + id + ", " + topicName + ", " + pid);
					r = call(Method.GET, bpmUrl + "/execution/" + pid + "/localVariables", null);
					
					String msg = "[" + topicName + "]";
					String phone = "+79257005113";
					JsonObject vars = gson.fromJson(r.response, JsonObject.class);
					for (Iterator<Entry<String,JsonElement>> it = vars.entrySet().iterator(); it.hasNext();) {
						Entry<String, JsonElement> e = it.next();
						String name = e.getKey();
						JsonObject o = (JsonObject) e.getValue();
						if (o.has("value")) {
							msg += ", " + name + "=" + o.get("value").getAsString();
							if (name.equals("phone") && !o.get("value").getAsString().equals("")) {
								phone = o.get("value").toString();
							}
						}
					}
					params.clear();
					params.put("workerId", "test1");
					sendMessage(msg, phone);
					post = gson.toJson(params);
					r = call(Method.POST, bpmUrl + "/external-task/" + id + "/complete", post);
					log.info("Completed, response " + r.responseCode + " " + r.response);
				}
			}
		} catch (Exception e) {
			log.log(Level.WARNING, "Failed to check: " + e.getMessage(), e);
		}
	}

	private void sendMessage(String msg, String phone) throws UnsupportedEncodingException {
		if (telegramChannel != null && telegramToken != null) {
			String chan = telegramChannel;
			if (!chan.startsWith("@")) {
				chan = "@" + chan;
			}
			String url = "https://api.telegram.org/bot" + telegramToken + "/sendMessage?chat_id=" + chan + "&text=" + URLEncoder.encode(msg, "UTF-8");
			log.info("Calling " + url);
			burp(Method.GET, url, null);
		}
	}
}

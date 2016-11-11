package newaccount.task.executor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
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
	
	class Response {
		int responseCode;
		String response;
	}
	
	public Response call(Method method, String url, String post) throws IOException {
		HttpURLConnection u = (HttpURLConnection) new URL(url).openConnection();
		try {
			u.setRequestMethod(method.name());
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
	public Response burp(Method method, String url, String body) {
		try {
			return call(method, url, body);
		} catch (Exception e) {
			// Don`t care
			return null;
		}
	}

	@Override
	public void run() {
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
			Response r = call(Method.POST, "http://localhost/bpm/external-task/fetchAndLock", post);
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
					r = call(Method.GET, "http://localhost/bpm/execution/" + pid + "/localVariables", null);
					
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
					String url = "http://192.168.1.2/sendsms.php?phone=" + URLEncoder.encode(phone, "UTF-8") + "&sendsms=1&text=" + URLEncoder.encode(msg, "UTF-8");
					log.info("Calling " + url);
					burp(Method.GET, url, null);
					post = gson.toJson(params);
					r = call(Method.POST, "http://localhost/bpm/external-task/" + id + "/complete", post);
					log.info("Completed, response " + r.responseCode + " " + r.response);
				}
			}
		} catch (Exception e) {
			log.log(Level.WARNING, "Failed to check: " + e.getMessage(), e);
		}
	}
}

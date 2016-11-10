package newaccount.task.executor;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class StartupListener implements ServletContextListener {
	Logger log = Logger.getLogger(getClass().getName());
	ScheduledExecutorService executor;
	
	@Override
	public void contextDestroyed(ServletContextEvent ev) {
		log.info("Context stopping...");
		executor.shutdown();
		executor.shutdownNow();
	}
	
	@Override
	public void contextInitialized(ServletContextEvent ev) {
		log.info("Context starting...");
		executor = Executors.newScheduledThreadPool(1);
		executor.scheduleWithFixedDelay(new ExternalTaskExecutor(), 0, 1000, TimeUnit.MILLISECONDS);
	}
}

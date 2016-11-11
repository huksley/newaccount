# New Account

Proof of concept for SPA + Camunda BPM application architecture.

Processing applications to open bank account for business entity.

  * [Camunda BPM](https://camunda.org/) - process orchestration, auth
  * [AdminLTE](https://almsaeedstudio.com/themes/AdminLTE/index2.html) - application theme, forms
  * [jQuery](https://jquery.com/) - JS framework
  * [Bootstrap](http://getbootstrap.com/) - UI foundation
  * [Kendo UI](http://www.telerik.com/kendo-ui/open-source-core) - Routing framework (for now)
  * [RequireJS](http://requirejs.org/) - JS dependency management
  * [Java8](http://www.oracle.com/technetwork/java/javase/downloads/index.html) - [External Task execution](https://docs.camunda.org/manual/7.4/user-guide/process-engine/external-tasks/)
  * [Vue.JS](https://vuejs.org/v2/guide/) - MVVM framework
  * [Apache 2.4](http://httpd.apache.org/) - Web server
  
**WARNING** This is not a real application!!! This is for demo and technology testing!

## Target process

![Image of process](process/newaccount.png)

## Structure

  * SPA HTML5 webapp
  * Apache Http 2.4
  * Java task executor application
  * Camunda BPM 7.5.0 bundle
  
Camunda BPM localhost:8080/engine -> localhost:80/bpm

## Installation and usage

  * Download Camunda BPM tomcat bundle from [camunda.org](https://camunda.org/download/)
  * Extract Camunda BPM tomcat bundle 
  * Download task-executor.war and place into server/apache-tomcat-*/webapps folder inside Camunda BPM tomcat bundle
  * Enable authentication in engine-rest as per [documentation](https://docs.camunda.org/manual/7.5/reference/rest/overview/authentication/)
  * Execute start-camunda
  * Install Apache 2.4
  * Modify httpd.conf - add ``ProxyPass /bpm/ http://localhost:8080/engine-rest/``
  * In folder Apache24/htdocs execute ``git clone https://github.com/huksley/newaccount/``
  * Execute ``bower update`` in ``newaccount``
  * Start Apache 2.4
  * Launch http://localhost/newaccount/index.html
  * Login into app using demo:demo
  * Upload process
  * Start new process using "Open new account"
  
## Useful links

  * [app](http://localhost/newaccount/index.html)
  * [cockpit - monitor processes](http://localhost:8080/camunda/app/cockpit/)
  * [tasklist - execute processes](http://localhost:8080/camunda/app/tasklist/)
  * [admin - manage users](http://localhost:8080/camunda/app/admin/)
  * [tomcat manager - reload apps](http://localhost:8080/manager/html)
  


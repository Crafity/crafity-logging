# Crafity Logging [![Dependency status](https://david-dm.org/crafity/crafity-logging.png)](https://david-dm.org/crafity/crafity-logging) [![Travis Build Status](https://travis-ci.org/Crafity/crafity-logging.png?branch=master)](https://travis-ci.org/Crafity/crafity-logging) [![NPM Module version](https://badge.fury.io/js/crafity-logging.png)](http://badge.fury.io/js/crafity-logging)

### SUMMARY

crafity-logging module bridges a configurable crafity web application infrastructure to logging procedures.
At the moment log4js module is used underneath and its appender functionality, but again,
wrapped up in a separate crafity-log4js module. See [***crafity-log4js***](https://github.com/Crafity/crafity-log4js) README file for more information.


### PREPARATION

Before you start using crafity-logging you must install all its dependencies. They are listed in ***package.json*** file under key ***dependencies***.
Install them first by running command on the terminal from ***crafity-logging*** as current directory:

```sh
	$ npm install
```

After the dependencies have been installed, run the unit tests to check the sanity of the module. From the command line
and current directory ***crafity-logging*** type the command:

```sh
	$ npm test
```


### HOW TO USE

Specify a configuration for logging and pass it to the ***create*** method:

```js
var config = {                                                       
		"logging": {                                                       
			"keep": false,    
			"appenders": [                                                    
				{                                                                
					"type": "console",                                              
					"name": "crafity-logging-test"                        
				},                                                               
				{                                                                
					"type": "file",                                                 
					"name": "crafity-logging-test",                                  
					"filename": "/logs/app.log",                      
					"maxLogSize": 20971520,                                         
					"backups": 100,                                                 
					"console": true                                                 
				}                                                                
			]}                                                                
	};                                                                                                                              

var logging = require('../main.js')
	, logger = logging.create(config)
	;
```
***keep*** = *false* means - do not keep the default appenders of log4js.
# Crafity Logging [![Dependency status](https://david-dm.org/crafity/crafity-logging.png)](https://david-dm.org/crafity/crafity-logging) [![Travis Build Status](https://travis-ci.org/Crafity/crafity-logging.png?branch=master)](https://travis-ci.org/Crafity/crafity-logging) [![NPM Module version](https://badge.fury.io/js/crafity-logging.png)](http://badge.fury.io/js/crafity-logging)


## Preparation

Install crafity-logging module via NPM installer or by cloning this repository from GitHub:

### via NPM

```sh
$ npm install crafity-logging
```


### via GitHub
```sh
$ git clone https://github.com/Crafity/crafity-logging.git
$ cd crafity-logging
```

Before you start using it you must install all its dependencies. They are listed in ``package.json`` file under key ``dependencies``.
Install them first by running command on the terminal from ``crafity-logging`` as current directory:

```sh
$ npm install
```

After the dependencies have been installed, run the unit tests to check the sanity of the module. From the command line
and current directory ``crafity-logging`` type the command:

```sh
$ npm test
```


## Summary

crafity-logging module bridges a configurable crafity web application infrastructure to logging procedures.
At the moment log4js module is used underneath except for minor changes that are wrapped up in crafity-log4js module. 
See [``crafity-log4js``](https://github.com/Crafity/crafity-log4js) for more information.


## Public API

Require logging module and and ask for a logger:


```js
var logging = require('../main.js')
	, logger = logging.create([name], [category], config)
	;
```

### logging.create(name, category, config);

* ``name`` String A name for the logger
* ``category`` String A category for the logger
* ``config`` Object An object literal with configuration


The following configuration example describes a logger with one console appender and one file appender:

```json
{                                                       
	"keep": false, // drop default appenders   
	"appenders": [                                                    
		{                                                                
			"type": "console",                                              
			"category": "unittest",
			"name": "crafity-logging-to-console"
		},                                                               
		{                                                                
			"type": "file",                                                 
			"filename": "~/logs/app.log",                      
			"maxLogSize": 20971520,                                         
			"backups": 100,
			"category": "unittest"
			"name": "crafity-logging-to-file",                                  
		}                                                                
	]
}                                                                                                                                                                                             
```

* ``type: file`` - this tells log4js to use the file appender 
* ``type: console`` - this tells log4js to use the console appender 
* ``category: ...`` - if omitted in the configuration, it can be passed as an argument in ``create`` method and this will hold for all logger appenders.
* ``keep: false`` - forget the default appenders on initialization

## Links
* Issues: [Github](https://github.com/Crafity/crafity-logging/issues)
* IRC Lounge: [IRC Link](irc://irc.freenode.net:6667/crafity-lounge) [Webchat](http://webchat.freenode.net?channels=crafity-lounge&uio=OT10cnVlJjExPTUx91)
* IRC CI: [IRC Link](irc://irc.freenode.net:6667/crafity-ci) [Webchat](http://webchat.freenode.net?channels=crafity-ci&uio=OT10cnVlJjExPTUx91)
* Website: [Crafity](http://crafity.com)

## License
(The MIT License)  

* Copyright (c) 2010-2013 Bart Riemens <briemens@crafity.com>  
* Copyright (c) 2010-2013 Galina Slavova <galina@crafity.com>  
* Copyright (c) 2010-2013 Crafity <info@crafity.com>  

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

*THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*

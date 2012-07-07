/*jslint node:true */
/*!
 * crafity-config - Generic configuration provider
 * Copyright(c) 2011-2012 Crafity
 * Copyright(c) 2011-2012 Bart Riemens
 * Copyright(c) 2011-2012 Galina Slavova
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var log4js = require('log4js')
	, fs = require('crafity-filesystem');

/**
 * Create a new logger instance
 * @param name The name of the logger
 * @param category The category of the logger
 * @param config More configuration opetions
 * @return {*} A new logger instance
 */
exports.create = function (name, category, config) {
	"use strict";

	/**
	 * Organize the parameters
	 */
	if (name === undefined && category === undefined && config === undefined) {
		name = undefined;
		category = undefined;
		config = {};
	} else if (typeof name === 'string' && typeof category === 'object' && config === undefined) {
		config = category;
		category = undefined;
	} else if (typeof name === 'object' && category === undefined && config === undefined) {
		config = name;
		name = config.name;
		category = config.category;
	}

	/**
	 * Variable declatations
	 */
	var logger;

	/**
	 * Initialize the appenders
	 */
	config.appenders = (config.appenders || []).map(function (appender) {
		appender.name = name || appender.name;
		appender.category = category || appender.category;
		appender.filename = appender.filename || 
			(appender.path && fs.combine(process.cwd(), appender.path, appender.name + ".log"));
		return appender;
	});

	/**
	 * Configure log4js
	 */
	log4js.configure(config, { keep: config.keep !== false });

	/**
	 * Get the logger and return it
	 */
	logger = log4js.getLogger(name);
	logger.setLevel('ALL');
	logger.name = name;
	return logger;
};

//(function () {
//	"use strict";
//	
//	return;
//
////console.log("log4js", log4js);
//
////log4js.configure("logging.json", {});
//	log4js.configure(undefined, {
//		"appenders": [
//			{
//				"type": "file",
//				"filename": "logs/test.log",
//				"name": "cheese",
//				"maxLogSize": 1024,
//				"backups": 10,
//				"pollInterval": 15
//			}
//		]
//	});
//
//	log4js.addAppender(log4js.consoleAppender());
////log4js.addAppender(log4js.fileAppender('logs/cheese.log'), 'cheese');
//
//	var logger = log4js.getLogger('cheese');
//	logger.setLevel('ALL');
//
//	logger.trace('Entering cheese testing');
//	logger.debug('Got cheese.');
//	logger.info('Cheese is Gouda.');
//	logger.warn('Cheese is quite smelly.');
//	logger.error('Cheese is too ripe!');
//	logger.fatal('Cheese was breeding ground for listeria.');
//}());

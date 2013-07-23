/*jslint node:true, white:true, stupid: true */
"use strict";

/*!
 * logging.test.js - Test logging functionality 
 * Copyright(c) 2011 Crafity
 * Copyright(c) 2012 Galina Slavova
 * Copyright(c) 2012 Bart Riemens
 * MIT Licensed
 */

/**
 * Test dependencies.
 */

console.log("Test is starting");

(function createLoggerWithoutAppender() {

	var logging = require('./../main')
		, logger = logging.create();

	logger.info("LOGGER:createLoggerWithoutParameters");
	console.log("CONSOLE:createLoggerWithoutParameters");

}());

(function createLoggerWithConsoleAppender() {

	var logging = require('./../main')
		, logger = logging.create({
			keep: false,
			appenders: [
				{
					type: "console",
					name: "unittest"
				}
			]});

	logger.info("LOGGER:createLoggerWithConsoleAppender");
	console.log("CONSOLE:createLoggerWithConsoleAppender");

}());

(function createLoggerWithFileAppender() {

	var logging = require('./../main')
		, logger = logging.create({
			keep: false,
			appenders: [
				{
					type: "file",
					name: "unittest",
					filename: "test/logs/test.log",
					console: true
				}
			]
		});

	logger.info("LOGGER:createLoggerWithFileAppender");
	console.log("CONSOLE:createLoggerWithFileAppender");

}());

(function createLoggerWithoutAppender() {

	var logging = require('../main')
		, logger = logging.create({keep: false});

	logger.info("LOGGER:createLoggerWithoutAppender");
	console.log("CONSOLE:createLoggerWithoutAppender");

}());

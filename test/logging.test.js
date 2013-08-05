/*jslint node: true, white: true, stupid: true */
"use strict";

/*!
 * crafity-logging - Test logging functionality 
 * Copyright(c) 2013 Crafity
 * Copyright(c) 2013 Bart Riemens
 * Copyright(c) 2013 Galina Slavova
 * MIT Licensed
 */

/**
 * Test dependencies.
 */

var jstest = require('crafity-jstest').createContext("Crafity Logging Tests")
	, fs = require('crafity-filesystem')
	, assert = jstest.assert
	, logging = require('../main.js')
	;

/**
 * Run the tests
 */

jstest.run({

	"Require the crafity logging module": function () {
		assert.isFunction(logging.create, "Expected logger to be a function.");
	},

	"When creating a logger without configuration Then a logger with default category is returned.": function () {
		var logger = logging.create();

		assert.isDefined(logger, "Expected logger to be defined.");
		assert.isDefined(logger.category, "Expected a logger category to be defined.");
		assert.areEqual("[default]", logger.category, "Expected this logger to have [default] category.");
	},

	"When creating a logger without configuration Then a logger with undefined name is returned.": function () {
		var logger = logging.create();

		assert.isDefined(logger, "Expected logger to be defined.");
		assert.isDefined(logger.name, "Expected a logger name to be defined.");
	},

	"When creating a logger without configuration Then a logger with no appenders is returned.": function () {
		var logger = logging.create();

		assert.isDefined(logger, "Expected logger to be defined.");
		assert.areEqual(0, Object.keys(logger.appenders).length, "Expected this logger to have appenders.");
	},

	"When creating a logger without custom appenders but with flag to keep defaults Then has no appenders.": function () {
		var logger = logging.create({ keep: false });

		console.log("logger.appenders", logger.appenders);

		assert.isDefined(logger, "Expected logger to be defined.");
		assert.isDefined(logger.appenders, "Expected logger appenders list to be defined.");
		assert.areEqual(0, Object.keys(logger.appenders).length, "Expected default appenders to be defined.");
	},

	"When configuring a logger with a file appender Then return a logger with one file appender.": function (test) {
		test.async(2000);
		
		// arrange
		var path = "test/logs/test.log"
			, messageToLog = "This test message is going to be logged to the file"
			, logger = null
			, logFileContents = null
			;

		// act
		fs.unlinkSync(path);

		logger = logging.create({
			appenders: [
				{
					type: "file", // input for lopg4js to choose from its appender list: console, file, etc
					filename: path,
					name: "unittest" // a specific name for the logger appender
				}
			]
		});

		console.log(messageToLog);

		setTimeout(function () {

			logFileContents = fs.readFileSync(path).toString();

			// assert
			assert.isTrue(logFileContents.indexOf(messageToLog) > -1, "Expected this log file to have same content with the logged content.");
			assert.areEqual("file", Object.keys(logger.appenders)[0], "Expected this logger to a file appender.");
			
			console.log("WE ARE HERE...");

			test.complete();
		}, 0);

	},

	"When calling the http logger Then it will have method logRequestResponse.": function () {
		// arrange + act
		var logger = logging.create();

		// assert
		assert.isFunction(logger.http.logRequestResponse, "Expected the http logger to have function logRequestResponse");
	},

	"When calling the Http logger Then the ansi colour formatting will be used.": function () {
		// arrange
		var logger = logging.create()
			, req = {
				client: {
					remoteAddress: "127.0.0.1",
					remotePort: "50543"
				},
				method: "GET",
				headers: {
					host: "static.crafity.dev",
					referer: "http://crafity.dev/",
					"user-agent": "user-agent"
				},
				url: "/about/clients?layout=false"
			}
			, res = {
				statusCode: "200"
			}
			;

		// act
		logger.http.logRequestResponse(req, res, null);

		// assert
		assert.isDefined(logger.http, "Expected the http logger to be defined.");
		assert.isFunction(logger.http.logRequestResponse, "Expected the http logger to have function logRequestResponse");
	}

});



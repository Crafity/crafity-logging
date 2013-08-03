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

	"When creating a logger without options Then the default is returned.": function () {
		var logger = logging.create();

		assert.isDefined(logger, "Expected logger to be defined.");
	},

	"When creating a logger without appender Then it has undefined name and default category.": function () {
		var logger = logging.create({ keep: false });

		console.log("\n\rNB This doesn't show in console!! ... logger = ", logger);

		assert.isDefined(logger, "Expected logger to be defined.");
	},

	"When creating a logger with a console appender Then ...TODO": function () {
		var logger = logging.create({
			keep: false,
			appenders: [
				{
					type: "console",
					name: "unittest"
				}
			]});

		assert.isDefined(logger, "Expected logger to be defined.");
	},

//	"BEWARE of this function - it restarst all over again - When creating a logger with a file appender.": function () {
//		// arrange + act
//		var logger = logging.create({
//			keep: false,
//			appenders: [
//				{
//					type: "file",
//					name: "unittest",
//					filename: "test/logs/test.log",
//					console: true
//				}
//			]
//		});
//
//		console.log("logger", logger);
//
//		// assert
//		assert.isDefined(logger, "Expected logger to be defined.");
//	},

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



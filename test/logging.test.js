/*jslint node: true*/
console.log("Test is starting");

console.log("module", module);

(function createLoggerWithoutAppender() {
	"use strict";

	var logging = require('./../logging')
		, logger = logging.create();

	logger.info("LOGGER:createLoggerWithoutParameters");
	console.log("CONSOLE:createLoggerWithoutParameters");

}());

(function createLoggerWithConsoleAppender() {
	"use strict";

	var logging = require('./../logging')
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
	"use strict";

	var logging = require('./../logging')
		, logger = logging.create({
			keep: false,
			appenders: [
				{
					type: "file",
					name: "unittest",
					filename: "logs/test.log",
					console: true
				}
			]
		});

	logger.info("LOGGER:createLoggerWithFileAppender");
	console.log("CONSOLE:createLoggerWithFileAppender");

}());

(function createLoggerWithoutAppender() {
	"use strict";

	var logging = require('./../logging')
		, logger = logging.create({keep: false});

	logger.info("LOGGER:createLoggerWithoutAppender");
	console.log("CONSOLE:createLoggerWithoutAppender");

}());

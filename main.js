/*jslint node:true, white:true */
"use strict";

/*!
 * crafity-logging - Crafity's logging abstraction
 * Copyright(c) 2011-2013 Crafity
 * Copyright(c) 2011-2013 Bart Riemens
 * Copyright(c) 2011-2013 Galina Slavova
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var ansi = require("ansi")
	, ansiCursor = ansi(process.stdout)
	, moment = require("moment")
	;

/**
 * Framework name.
 */
exports.fullname = 'crafity-logging';

/**
 * Framework version.
 */
exports.version = '0.1.5';

/**
 * Create a new logger instance.
 *
 * @param name The name of the logger
 * @param category The category of the logger
 * @param config More configuration options
 * @return {*} A new logger instance
 */
exports.create = function (name, category, config) {
	/**
	 * Module dependencies.
	 */
	var log4js = require('crafity-log4js')
		, fs = require('crafity-filesystem')
		;

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
	 * Variable declarations.
	 */
	var logger;

	/**
	 * Initialize the appenders.
	 */
	config.appenders = (config.appenders || []).map(function (appender) {
		appender.name = name || appender.name;
		appender.category = category || appender.category;
		appender.filename = appender.filename ||
			(appender.path && fs.combine(process.cwd(), appender.path, appender.name + ".log"));
		return appender;
	});

	/**
	 * Configure log4js, which is internally used.
	 */
	log4js.configure(config, { keep: config.keep !== false });

	/**
	 * Get the logger and return it
	 */
	logger = log4js.getLogger(name);
	logger.setLevel('ALL');
	logger.name = name ||  "";
	logger.appenders = log4js.appenders;

	logger.http = {};
	logger.http.logRequestResponse = function (req, res, err) {
		var crafityColours = {
			orange: "#E38418",
			red: "#C21705",
			brown: "#483432",
			lightGray: "#525252",
			gray: "#a1a1a1",
			blue: "#7cb6e9",
			white: "#D8D7D7"
		};

		ansiCursor
			.hex(crafityColours.blue)
			.write(moment().format("YYYYMMDD, HH:mm:ss.SSS ZZ")) //source: http://momentjs.com/docs/
			.fg.reset()

			.hex(crafityColours.brown).write(" - Client:")
			.fg.reset()
			.hex(crafityColours.white)
			.write(req.client.remoteAddress + ":" + req.client.remotePort)
			.fg.reset()

			.hex(crafityColours.brown).write(", Method: ")
			.fg.reset()
			.hex(crafityColours.orange)
			.write(req.method)
			.fg.reset()

			.hex(crafityColours.brown).write(", Status: ")
			.fg.reset()
			.hex(crafityColours.orange)
			.write(res.statusCode ? res.statusCode.toString() : "?")
			.fg.reset()

			.hex(crafityColours.brown).write(", Url: ")
			.fg.reset()
			.hex(crafityColours.orange)
			.write(req.url)
			.fg.reset()

			.hex(crafityColours.brown).write(", Host: ")
			.fg.reset()
			.hex(crafityColours.white)
			.write(req.headers.host)
			.fg.reset()

			.hex(crafityColours.brown).write((req.headers && req.headers.referer) ? ", Referer: " : "")
			.fg.reset()
			.hex(crafityColours.white)
			.write((req.headers && req.headers.referer) ? req.headers.referer : "")
			.fg.reset()

			.hex(crafityColours.brown).write(", UA: ")
			.fg.reset()
			.hex(crafityColours.white)
			.write(req.headers["user-agent"])
			.write("\n")
			.fg.reset()

			.hex(crafityColours.red).write(err ? "\nERROR: " : "")
			.write(err ? (err.toString() + (err.stack ? err.stack + "\n" : "\n")) : "\n")
			.fg.reset()

			.reset();
	};

	return logger;
};



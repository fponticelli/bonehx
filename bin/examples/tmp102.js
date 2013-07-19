(function () { "use strict";
var Temperature = function() { }
Temperature.main = function() {
	var port = "/dev/i2c-1";
	bone.weather.TMP102.open(port,null,function(tmp102) {
		js.Node.setInterval(function() {
			tmp102.read(function(temp) {
				console.log("Temperature: " + Temperature.format(temp) + "c (" + Temperature.format(bone.weather.TMP102.convertToFahrenheit(temp)) + "f)");
			});
		},1000);
	});
}
Temperature.format = function(v) {
	return Math.round(v * 10) / 10;
}
var bone = {}
bone.weather = {}
bone.weather.TMP102 = function(port) {
	this.port = port;
};
bone.weather.TMP102.open = function(port,address,callback) {
	if(address == null) address = 72;
	bone.Bone.i2cOpen(port,address,{ },function(e) {
		console.log("OPEN");
		console.log(e);
	});
	callback(new bone.weather.TMP102(port));
}
bone.weather.TMP102.convertToFahrenheit = function(celsius) {
	return celsius * 1.8 + 32;
}
bone.weather.TMP102.prototype = {
	read: function(callback) {
		bone.Bone.i2cReadBytes(this.port,null,2,function(e) {
			if(e.err != null || e.event != "callback") return;
			var buf = e.res, t = buf[0] << 4;
			t |= buf[1] >> 4;
			callback(t * 0.0625);
		});
	}
}
var js = {}
js.Node = function() { }
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
var bone = "undefined" !== typeof bone ? bone : {};
bone.Bone = require("bonescript");
js.Node.setTimeout = setTimeout;
js.Node.clearTimeout = clearTimeout;
js.Node.setInterval = setInterval;
js.Node.clearInterval = clearInterval;
if('undefined' === typeof setImmediate) {
	js.Node.setImmediate = function(h) { setTimeout(h,0); }
	js.Node.clearImmediate = clearTimeout;
} else {
	js.Node.setImmediate = setImmediate;
	js.Node.clearImmediate = clearImmediate;
}
js.Node.global = global;
js.Node.process = process;
js.Node.require = require;
js.Node.console = console;
js.Node.module = module;
js.Node.stringify = JSON.stringify;
js.Node.parse = JSON.parse;
Temperature.main();
})();

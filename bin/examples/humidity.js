(function () { "use strict";
var Humidity = function(pin,supplyVolt) {
	if(supplyVolt == null) supplyVolt = 5.0;
	this.pin = pin;
	this.supplyVolt = supplyVolt;
};
Humidity.main = function() {
	var pin = "P9_38", temp = 30, delay = 250;
	var humidity = new Humidity(pin);
	var poll = (function() {
		var reading = 0;
		var print = (function($this) {
			var $r;
			var print1 = null;
			print1 = function() {
				console.log("" + ++reading + ". humidity: " + humidity.get(temp));
				js.Node.setTimeout(print1,delay);
			};
			$r = print1;
			return $r;
		}(this));
		return print;
	})();
	poll();
}
Humidity.prototype = {
	get: function(degreesCelsius) {
		var reading = bone.Bone.analogRead(this.pin), voltage = reading / 1023.0 * this.supplyVolt, sensorRH = 161.0 * voltage / this.supplyVolt - 25.8;
		return sensorRH / (1.0546 - 0.0026 * degreesCelsius);
	}
}
var js = {}
js.Node = function() { }
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
Humidity.main();
})();

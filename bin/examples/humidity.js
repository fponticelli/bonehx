(function () { "use strict";
var Humidity = function(pin,supplyVolt) {
	if(supplyVolt == null) supplyVolt = 5.0;
	this.pin = pin;
	this.supplyVolt = supplyVolt;
};
Humidity.main = function() {
	var pin = "P9_39", temp = 25;
	var humidity = new Humidity(pin);
	js.Node.setInterval(function() {
		console.log("humidity: " + humidity.get(temp));
	},2000);
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
js.Node.setImmediate = setImmediate;
js.Node.clearImmediate = clearImmediate;
js.Node.global = global;
js.Node.process = process;
js.Node.require = require;
js.Node.console = console;
js.Node.module = module;
js.Node.stringify = JSON.stringify;
js.Node.parse = JSON.parse;
Humidity.main();
})();

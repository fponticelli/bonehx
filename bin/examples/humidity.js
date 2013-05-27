(function () { "use strict";
var Humidity = function(pin,supplyVolt) {
	if(supplyVolt == null) supplyVolt = 5.0;
	this.pin = pin;
	this.supplyVolt = supplyVolt;
};
Humidity.main = function() {
	var pin = "P9_39", temp = 25;
	var humidity = new Humidity(pin);
	setInterval(function() {
		console.log("humidity: " + humidity.get(temp));
	},2000);
}
Humidity.prototype = {
	get: function(degreesCelsius) {
		console.log(this.pin);
		console.log(bone.Bone.analogRead(this.pin));
		var reading = bone.Bone.analogRead(this.pin), voltage = reading / 1023.0 * this.supplyVolt, sensorRH = 161.0 * voltage / this.supplyVolt - 25.8;
		return sensorRH / (1.0546 - 0.0026 * degreesCelsius);
	}
}
var bone = "undefined" !== typeof bone ? bone : {};
bone.Bone = require("bonescript");
var node = "undefined" !== typeof node ? node : {};
node.events = "undefined" !== typeof node.events ? node.events : {};
node.events.EventEmitter = require("events").EventEmitter;
Humidity.main();
})();

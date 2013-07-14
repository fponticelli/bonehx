(function () { "use strict";
var Leds = function() { }
Leds.main = function() {
	var leds = ["USR0","USR1","USR2","USR3"];
	leds.map(function(pin) {
		bone.Bone.pinMode(pin,bone.Bone.OUTPUT);
		bone.Bone.digitalWrite(pin,bone.Bone.LOW);
	});
	var pointer = new Pointer(leds.length);
	js.Node.setInterval(function() {
		pointer.next();
		leds.map(function(pin) {
			bone.Bone.digitalWrite(pin,pin != leds[pointer.index]?bone.Bone.LOW:bone.Bone.HIGH);
		});
	},50);
}
var Pointer = function(length) {
	this.forward = true;
	this.index = -1;
	this.length = length;
};
Pointer.prototype = {
	next: function() {
		this.index += this.forward?1:-1;
		if(this.forward && this.index == this.length) {
			this.forward = !this.forward;
			this.index = this.length - 1;
		} else if(!this.forward && this.index == -1) {
			this.index = 0;
			this.forward = !this.forward;
		}
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
Leds.main();
})();

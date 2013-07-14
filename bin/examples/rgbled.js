(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var RGBLed = function(pinR,pinG,pinB,invert) {
	if(invert == null) invert = true;
	this.channels = [pinR,pinG,pinB];
	this.invert = invert;
};
RGBLed.main = function() {
	RGBLed.reset();
	var led = new RGBLed("P8_19","P9_14","P8_13",false), hsl = new thx.color.HSL(0,1,0.5);
	js.Node.setInterval(function() {
		led.setColor(hsl);
		var _g = hsl, _g1 = _g.get_hue();
		_g.set_hue(_g1 + 1);
		_g1;
	},20);
}
RGBLed.reset = function() {
	["USR0","USR1","USR2","USR3"].map(function(pin) {
		bone.Bone.pinMode(pin,bone.Bone.OUTPUT);
		bone.Bone.digitalWrite(pin,bone.Bone.LOW);
	});
}
RGBLed.prototype = {
	setColor: function(color) {
		var rgbx = color.toRGBX();
		bone.Bone.analogWrite(this.channels[0],this.norm(rgbx.get_redf()));
		bone.Bone.analogWrite(this.channels[1],this.norm(rgbx.get_greenf()));
		bone.Bone.analogWrite(this.channels[2],this.norm(rgbx.get_bluef()));
	}
	,norm: function(c) {
		return this.invert?1 - c:c;
	}
}
var js = {}
js.Node = function() { }
var thx = {}
thx.color = {}
thx.color.Color = function() { }
thx.color.Color.prototype = {
	toRGBX: function() {
		return (function($this) {
			var $r;
			throw "abstract method, must override";
			return $r;
		}(this));
	}
}
thx.color.HSL = function(hue,saturation,lightness) {
	this.set_hue(hue);
	this.set_saturation(saturation);
	this.set_lightness(lightness);
};
thx.color.HSL._c = function(d,s,l) {
	var m2 = l <= 0.5?l * (1 + s):l + s - l * s, m1 = 2 * l - m2;
	d = thx.core.Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
}
thx.color.HSL.__super__ = thx.color.Color;
thx.color.HSL.prototype = $extend(thx.color.Color.prototype,{
	set_lightness: function(value) {
		return this.lightness = value < 0?0:value > 1?1:value;
	}
	,get_lightness: function() {
		return this.lightness;
	}
	,set_saturation: function(value) {
		return this.saturation = value < 0?0:value > 1?1:value;
	}
	,get_saturation: function() {
		return this.saturation;
	}
	,set_hue: function(value) {
		return this.hue = thx.core.Floats.wrapCircular(value,360);
	}
	,get_hue: function() {
		return this.hue;
	}
	,toRGBX: function() {
		return new thx.color.RGBX(thx.color.HSL._c(this.get_hue() + 120,this.get_saturation(),this.get_lightness()),thx.color.HSL._c(this.get_hue(),this.get_saturation(),this.get_lightness()),thx.color.HSL._c(this.get_hue() - 120,this.get_saturation(),this.get_lightness()));
	}
});
thx.color.RGBX = function(red,green,blue) {
	this.set_redf(red < 0?0:red > 1?1:red);
	this.set_greenf(green < 0?0:green > 1?1:green);
	this.set_bluef(blue < 0?0:blue > 1?1:blue);
};
thx.color.RGBX.__super__ = thx.color.Color;
thx.color.RGBX.prototype = $extend(thx.color.Color.prototype,{
	set_bluef: function(value) {
		return this.bluef = value < 0?0:value > 1?1:value;
	}
	,set_greenf: function(value) {
		return this.greenf = value < 0?0:value > 1?1:value;
	}
	,set_redf: function(value) {
		return this.redf = value < 0?0:value > 1?1:value;
	}
	,get_bluef: function() {
		return this.bluef;
	}
	,get_greenf: function() {
		return this.greenf;
	}
	,get_redf: function() {
		return this.redf;
	}
	,clone: function() {
		return new thx.color.RGBX(this.get_redf(),this.get_greenf(),this.get_bluef());
	}
	,toRGBX: function() {
		return this.clone();
	}
});
thx.core = {}
thx.core.Floats = function() { }
thx.core.Floats.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
}
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
RGBLed.main();
})();

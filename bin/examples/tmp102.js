(function () { "use strict";
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var Temperature = function() { }
Temperature.__name__ = true;
Temperature.main = function() {
	var port = "/dev/i2c-1", tmp102 = bone.weather.TMP102.open(port);
	var read = (function($this) {
		var $r;
		var read1 = null;
		read1 = function() {
			tmp102.readCelsius(function(celsius) {
				console.log("" + Std.string(new Date()) + " Temperature: " + Temperature.format(celsius) + "°C (" + Temperature.format(bone.weather.TMP102.convertToFahrenheit(celsius)) + "°F)");
				js.Node.setTimeout(read1,2000);
			});
		};
		$r = read1;
		return $r;
	}(this));
	read();
}
Temperature.format = function(v) {
	return Math.round(v * 10) / 10;
}
var bone = {}
bone.weather = {}
bone.weather.TMP102 = function(port) {
	this.port = port;
};
bone.weather.TMP102.__name__ = true;
bone.weather.TMP102.open = function(port,address) {
	if(address == null) address = 72;
	bone.Bone.i2cOpen(port,address,{ });
	return new bone.weather.TMP102(port);
}
bone.weather.TMP102.convertToFahrenheit = function(celsius) {
	return celsius * 1.8 + 32;
}
bone.weather.TMP102.prototype = {
	readCelsius: function(callback) {
		var _g = this;
		var attempts = 0, guard = 10, delay = 100;
		var attempt = (function($this) {
			var $r;
			var attempt1 = null;
			attempt1 = function() {
				bone.Bone.i2cReadBytes(_g.port,null,2,function(e) {
					if(attempts == guard) throw "unable to read temperature, last event is " + js.Node.stringify(e,null,null);
					attempts++;
					if(e.event == "return") return; else if(e.err != null) js.Node.setTimeout(attempt1,delay); else if(e.event != "callback") {
						console.log("Unexpected event: " + Std.string(e));
						js.Node.setTimeout(attempt1,delay);
					} else {
						var buf = e.res;
						callback(((buf[0] << 8 | buf[1]) >> 4) * 0.0625);
					}
				});
			};
			$r = attempt1;
			return $r;
		}(this));
		attempt();
	}
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Node = function() { }
js.Node.__name__ = true;
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
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
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

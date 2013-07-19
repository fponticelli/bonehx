package bone.weather;

import bone.Bone;
import js.Node;

class TMP102
{
	static inline var DEFAULT_ADDRESS = 0x48;

	public static function open(port : String, address : Int = DEFAULT_ADDRESS)
	{
		Bone.i2cOpen(port, address, {});
		return new TMP102(port);
	}

	public static function convertToFahrenheit(celsius : Float)
	{
		return celsius * 1.8 + 32;
	}

	var port : String;
	function new(port : String)
	{
		this.port = port;
	}

	public function readCelsius(callback : Float -> Void)
	{

		var attempts = 0,
			guard    = 10,
			delay    = 100;
		function attempt()
		{
			Bone.i2cReadBytes(port, null, 2, function(e) {
				if(attempts == guard)
					throw 'unable to read temperature, last event is ${haxe.Json.stringify(e)}';
				attempts++;
				if(e.event == "return") {
					return;
				} else if(e.err != null)  {
					Node.setTimeout(attempt, delay);
				} else if(e.event != "callback") {
					trace("Unexpected event: " + Std.string(e));
					Node.setTimeout(attempt, delay);
				} else {
					var buf : Array<Int> = e.res;
					callback((((buf[0] << 8) | buf[1]) >> 4) * 0.0625);
				}
			});
		}
		attempt();
	}
}
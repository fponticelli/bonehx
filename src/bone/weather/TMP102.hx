package bone.weather;

import bone.Bone;

class TMP102
{
	static inline var DEFAULT_ADDRESS = 0x48;

	public static function open(port : String, address : Int = DEFAULT_ADDRESS, callback : TMP102 -> Void)
	{
		Bone.i2cOpen(port, address, {}, function(e) {
			trace("OPEN");
			trace(e);
		});
		callback(new TMP102(port));
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

	public function read(callback : Float -> Void)
	{
		Bone.i2cReadBytes(port, null, 2, function(e) {
			if(e.err != null || e.event != "callback") return;
			var buf : Array<Int> = e.res,
				t = buf[0] << 4;
			t |= buf[1] >> 4;
			callback(t * 0.0625);
		});
	}
}
/*
var responseLength = 2;
var buffer = new byte[responseLength];
I2CDevice.I2CTransaction[] transaction = new I2CDevice.I2CTransaction[]
{
    I2CDevice.CreateReadTransaction(buffer)
};
I2CDevice.Execute(transaction, 1000);
var t = ((buffer[0]) << 4);
t |= (buffer[1] >> 4);

return t * 0.0625;
*/
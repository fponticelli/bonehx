import bone.Bone;
import thx.color.Color;
import thx.color.HSL;
using thx.color.Convert;

class RGBLed
{
	public static function main()
	{
		reset();

		var led = new RGBLed("P8_19", "P9_14", "P8_13", false),
			hsl = new HSL(0, 1, 0.5);

		js.Node.setInterval(function() {
			led.setColor(hsl);
			hsl.hue++;
		}, 20);
	}

	public static function reset()
	{
		["USR0", "USR1", "USR2", "USR3"]
			.map(function(pin) {
				Bone.pinMode(pin, Bone.OUTPUT);	
				Bone.digitalWrite(pin, Bone.LOW);
			});
	}

	var channels : Array<String>;
	var invert : Bool;
	public function new(pinR : String, pinG : String, pinB : String, invert : Bool = true)
	{
		channels = [pinR, pinG, pinB];
		this.invert = invert;
	}

	function norm(c : Float)
		return invert ? 1 - c : c;

	public function setColor(color : Color)
	{
		var rgbx = color.toRGBX();
		Bone.analogWrite(channels[0], norm(rgbx.redf));
		Bone.analogWrite(channels[1], norm(rgbx.greenf));
		Bone.analogWrite(channels[2], norm(rgbx.bluef));
	}
}
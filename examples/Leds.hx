import bone.Bone;

class Leds
{
	public static function main()
	{
		var leds = ["USR0", "USR1", "USR2", "USR3"];
		leds.map(function(pin) {
				Bone.pinMode(pin, Bone.OUTPUT);	
				Bone.digitalWrite(pin, Bone.LOW);
			});
		var pointer = new Pointer(leds.length);
		js.Node.setInterval(function() {
			pointer.next();
			leds.map(function (pin) {
				Bone.digitalWrite(pin, pin != leds[pointer.index] ? Bone.LOW : Bone.HIGH);
			});
		}, 50);
	}
}

class Pointer
{
	var length : Int;
	public var index(default, null) : Int = -1;
	var forward : Bool = true;
	public function new(length : Int) {
		this.length = length;
	}

	public function next() {
		index += forward ? 1 : -1;
		if(forward && index == length) {
			forward = !forward;
			index = length - 1;
		} else if(!forward && index == -1) {
			index = 0;
			forward = !forward;
		}
	}
}
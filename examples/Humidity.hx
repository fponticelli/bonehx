import bone.Bone;

class Humidity
{
	public static function main()
	{
		var pin = 'P9_39',
			temp = 25;

		var humidity = new Humidity(pin);
		N.setInterval(function() {
			trace('humidity: ${humidity.get(temp)}');
		}, 2000);
	}

	var pin : String;
	var supplyVolt : Float;
	public function new(pin : String, ?supplyVolt : Float = 5.0)
	{
		this.pin = pin;
		this.supplyVolt = supplyVolt;
	}

	public function get(degreesCelsius : Float)
	{
trace(pin);
trace(Bone.analogRead(pin));
		var reading = Bone.analogRead(pin),
			voltage = reading / 1023.0 * supplyVolt,
			sensorRH = 161.0 * voltage / supplyVolt - 25.8;

		return sensorRH / (1.0546 - 0.0026 * degreesCelsius);
	}
}
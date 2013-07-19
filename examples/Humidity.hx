import bone.Bone;

class Humidity
{
	public static function main()
	{
		var pin   = 'P9_38',
			temp  = 30,
			delay = 250;

		var humidity = new Humidity(pin);

		var poll = (function() {
				var reading = 0;
				function print() {
					trace('${++reading}. humidity: ${humidity.get(temp)}');
					js.Node.setTimeout(print, delay);
				};
				return print;
			})();

		poll();
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
		var reading = Bone.analogRead(pin),
			voltage = reading / 1023.0 * supplyVolt,
			sensorRH = 161.0 * voltage / supplyVolt - 25.8;
		return sensorRH / (1.0546 - 0.0026 * degreesCelsius);
	}
}
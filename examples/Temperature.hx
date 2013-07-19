import bone.Bone;
import bone.weather.TMP102;
import js.Node;

class Temperature
{
	public static function main()
	{
		var port   = '/dev/i2c-1',
			tmp102 = TMP102.open(port);

		function read()	
		{
			tmp102.readCelsius(function(celsius) {
				trace('${Date.now()} Temperature: ${format(celsius)}°C (${format(TMP102.convertToFahrenheit(celsius))}°F)');
				Node.setTimeout(read, 2000);
			});
		}
		read();
	}

	static function format(v : Float)
	{
		return Math.round(v * 10) / 10;
	}
}
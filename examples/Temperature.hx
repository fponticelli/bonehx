import bone.Bone;
import bone.weather.TMP102;
import js.Node;

class Temperature
{
	public static function main()
	{
		var port   = '/dev/i2c-1';
		TMP102.open(port, function(tmp102 : TMP102) {
			Node.setInterval(function() {
				tmp102.read(function(temp) {
					trace('Temperature: ${format(temp)}c (${format(TMP102.convertToFahrenheit(temp))}f)');
				});
			}, 1000);
		});
	}

	static function format(v : Float)
	{
		return Math.round(v * 10) / 10;
	}
}
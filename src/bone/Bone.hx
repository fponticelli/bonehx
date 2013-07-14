package bone;

extern class Bone
{
	static function analogRead(pin : String, ?callback : Float -> Void) : Float;
	static function analogWrite(pin : String, value : Float, ?freq : Float, ?callback : Void -> Void) : Void;
	// TODO is handler value Bool?
	static function attachInterrupt(pin : String, handler : {pin : String, value : Bool} -> Void, mode : Dynamic, ?callback : {pin : String, attached : Bool, ?configured : Bool} -> Void) : Bool;
	static function detachInterrupt(pin : String, ?callback : {pin : String, detached : Bool} -> Void) : Bool;
	static function digitalRead(pin : String, ?callback : Int -> Void) : Int;
	static function digitalWrite(pin : String, value : Int, ?callback : Void -> Void) : Void;
	static function getEeproms(?callback : {} -> Void) : {};
	static function pinMode(pin : String, direction : String, ?mux : Int, ?pullup : String, ?slew : String, ?callback : {value : Bool, ?err : String} -> Void) : Bool;
	static function getPinMode(pin : String, ?callback : PinMode -> Void) : PinMode;
	// callback seems to be broken in the implementation
	static function shiftOut(dataPin : String, clockPin : String, bitOrder : Int, val : Float, ?callback : Void -> Void) : Void;
	static function getPlatform(?callback : Platform -> Void) : Platform;	

	
	static function lowByte(value : Int) : Int;
	static function highByte(value : Int) : Int;
	static function bitRead(value : Int, bitnum : Int) : Int;
	static function bitWrite(value : Int, bitnum : Int, bitdata : Int) : Int;
	static function bitSet(value : Int, bitnum : Int) : Int;
	static function bitClear(value : Int, bitnum : Int) : Int;
	static function bit(bitnum : Int) : Int;
	static function constrain<T>(x : T, a : T, b : T) : T;
	static function map(value : Float, fromLow : Float, fromHigh : Float, toLow : Float, toHigh : Float) : Float;

	static var OUTPUT(default, null) : String;
	static var INPUT(default, null) : String;
	static var INPUT_PULLUP(default, null) : String;

	static var HIGH(default, null) : Int;
	static var LOW(default, null) : Int;

	static var LSBFIRST(default, null) : Int;
	static var MSBFIRST(default, null) : Int;
	static var CHANGE(default, null) : String;
	static var RISING(default, null) : String;
	static var FALLING(default, null) : String;

// TODO
// setDate
// readTextFile
// writeTextFile

	static var pins : {
		USR0 : PinGPIOInfo,
		USR1 : PinGPIOInfo,
		USR2 : PinGPIOInfo,
		USR3 : PinGPIOInfo,
		P8_1 : PinInfo,
		P8_2 : PinInfo,
		P8_3 : PinEpromInfo,
		P8_4 : PinEpromInfo,
		P8_5 : PinEpromInfo,
		P8_6 : PinEpromInfo,
		P8_7 : PinEpromInfo,
		P8_8 : PinEpromInfo,
		P8_9 : PinEpromInfo,
		P8_10 : PinEpromInfo,
		P8_11 : PinEpromInfo,
		P8_12 : PinEpromInfo,
		P8_13 : PinPWMInfo,
		P8_14 : PinEpromInfo,
		P8_15 : PinEpromInfo,
		P8_16 : PinEpromInfo,
		P8_17 : PinEpromInfo,
		P8_18 : PinEpromInfo,
		P8_19 : PinPWMInfo,
		P8_20 : PinEpromInfo,
		P8_21 : PinEpromInfo,
		P8_22 : PinEpromInfo,
		P8_23 : PinEpromInfo,
		P8_24 : PinEpromInfo,
		P8_25 : PinEpromInfo,
		P8_26 : PinEpromInfo,
		P8_27 : PinEpromInfo,
		P8_28 : PinEpromInfo,
		P8_29 : PinEpromInfo,
		P8_30 : PinEpromInfo,
		P8_31 : PinEpromInfo,
		P8_32 : PinEpromInfo,
		P8_33 : PinEpromInfo,
		P8_34 : PinPWMInfo,
		P8_35 : PinEpromInfo,
		P8_36 : PinPWMInfo,
		P8_37 : PinEpromInfo,
		P8_38 : PinEpromInfo,
		P8_39 : PinEpromInfo,
		P8_40 : PinEpromInfo,
		P8_41 : PinEpromInfo,
		P8_42 : PinEpromInfo,
		P8_43 : PinEpromInfo,
		P8_44 : PinEpromInfo,
		P8_45 : PinPWMInfo,
		P8_46 : PinPWMInfo,

		P9_1 : PinInfo,
		P9_2 : PinInfo,
		P9_3 : PinInfo,
		P9_4 : PinInfo,
		P9_5 : PinInfo,
		P9_6 : PinInfo,
		P9_7 : PinInfo,
		P9_8 : PinInfo,
		P9_9 : PinInfo,
		P9_10 : PinInfo,
		P9_11 : PinEpromInfo,
		P9_12 : PinEpromInfo,
		P9_13 : PinEpromInfo,
		P9_14 : PinPWMInfo,
		P9_15 : PinEpromInfo,
		P9_16 : PinPWMInfo,
		P9_17 : PinEpromInfo,
		P9_18 : PinEpromInfo,
		P9_19 : PinEpromInfo,
		P9_20 : PinEpromInfo,
		P9_21 : PinPWMInfo,
		P9_22 : PinPWMInfo,
		P9_23 : PinEpromInfo,
		P9_24 : PinEpromInfo,
		P9_25 : PinEpromInfo,
		P9_26 : PinEpromInfo,
		P9_27 : PinEpromInfo,
		P9_28 : PinPWMInfo,
		P9_29 : PinPWMInfo,
		P9_30 : PinEpromInfo,
		P9_31 : PinPWMInfo,
		P9_32 : PinInfo,
		P9_33 : PinAinInfo,
		P9_34 : PinInfo,
		P9_35 : PinAinInfo,
		P9_36 : PinAinInfo,
		P9_37 : PinAinInfo,
		P9_38 : PinAinInfo,
		P9_39 : PinAinInfo,
		P9_40 : PinAinInfo,
		P9_41 : PinEpromInfo,
		P9_42 : PinPWMInfo,
		P9_43 : PinInfo,
		P9_44 : PinInfo,
		P9_45 : PinInfo,
		P9_46 : PinInfo
	};

	static var pinIndex : Array<PinInfo>;
	static var uarts : Dynamic<UartInfo>;
	static inline function getUart(dev : String) : UartInfo
		return Reflect.field(uarts, dev);

	static function __init__() : Void
	{
		nodejs.Extern.link("bone.Bone", "bonescript");
	}
}

typedef Platform = {
	platform : String,
	name: String,
	bonescript : String
}

typedef PinMode = {
	mux : Int,
	options : Array<String>,
	slew : String,
	rx : String,
	pullup : String,
	pin : String,
	name : String
};

typedef UartInfo = {
	?devicetree : String,
	?rx : String,
	?tx : String
}

typedef PinInfo = {
	name : String,
	key : String
}

typedef PinAinInfo = {> PinInfo,
	ain : Int,
	eeprom : Int,
	scale : Int
}

typedef PinGPIOInfo = {> PinInfo,
	gpio : Int,
	led : String,
	mux : String,
	muxRegOffset : String,
	options : Array<String>
}

typedef PinEpromInfo = {> PinGPIOInfo,
	eeprom : Int
}

typedef PinPWMInfo = {> PinEpromInfo,
	pwm : {
		muxmode : Int,
		path : String,
		name : String
	}
}
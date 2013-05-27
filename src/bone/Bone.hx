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

	static function __init__() : Void
	{
		node.Link.module("bone.Bone", "bonescript");
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
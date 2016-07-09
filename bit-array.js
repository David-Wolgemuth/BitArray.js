var BitArray;

(function () {

"use strict";
BitArray = function ()
{
    this._subArrays = [];
};
BitArray.BitArray32 = BitArray32;  // Alternate Contructor
BitArray.prototype.get = function (pos)  // -> Boolean
{
    var subArr = this._subArrayForPos(pos);
    if (!subArr) { return false; }
    pos = pos % 32;
    return subArr.get(pos);
};
BitArray.prototype.set = function (pos, bool)
{
    var subArr = this._subArrayForPos(pos, bool);
    if (!subArr) { return; }
    pos = pos % 32;
    subArr.set(pos, bool);
};
BitArray.prototype.toggle = function (pos)  // -> Boolean
{
    var subArr = this._subArrayForPos(pos, true);
    pos = pos % 32;
    return subArr.toggle(pos);
};
BitArray.prototype.toString = function ()
{
    var str = "";
    var empty32 = new BitArray32().toString();
    for (var i = 0; i < this._subArrays.length; i++) {
        if (this._subArrays[i]) {
            str += this._subArrays[i].toString();
        } else {
            str += empty32;
        }
    }
    return str;
};

BitArray.prototype._subArrayForPos = function (pos, upsert)
{
    if (typeof pos !== "number" || pos < 0) { return null; }
    pos = Math.floor(pos / 32);
    if (!this._subArrays[pos]) {
        if (!upsert) {
            return null;
        }
        this._subArrays[pos] = new BitArray32();
    }
    return this._subArrays[pos];
};


function BitArray32 ()
{
    this._num = 0;
}
BitArray32.prototype.get = function (pos)
{
    this._validateInput(pos);
    return !!(this._numForBitAtPos(pos) & this._num);
};
BitArray32.prototype.set = function (pos, bool)
{
    this._validateInput(pos);
    if (bool) {
        this._num = this._num | this._numForBitAtPos(pos);
    } else {
        this._num = this._num ^ this._numForBitAtPos(pos);
    }
};
BitArray32.prototype.toggle = function (pos)
{
    this._validateInput(pos);
    var bool = this.get(pos);
    this.set(pos, !bool);
    return !bool;
};
BitArray32.prototype._validateInput = function (num)
{
    if (typeof num !== "number" || num >= 32 || num < 0) { 
        throw Error("Out Of Range");
    }
};
BitArray32.prototype._numForBitAtPos = function (pos)
{
    return Math.pow(2, 31-pos);
};
BitArray32.prototype.toString = function ()
{
    var str = (this._num >>> 0).toString(2);
    while (str.length < 32) {
        str = 0 + str;
    }
    return str;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BitArray;
}

}).call(this);
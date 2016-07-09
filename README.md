## BitArray.js

###Basic Usage: 

`var arr = new BitArray();`

`var arr = new BitArray.BitArray32();  // Limit to 32 bits`

`arr.set(128, true);`

`arr.get(128); // -> true`

`arr.toggle(128); // -> false (new value)`

`arr.get(200); // -> false`

`arr.toString();  // -> 0011000000100000100000001000000000000000100000001000000000010000`
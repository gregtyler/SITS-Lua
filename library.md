## Formatting
A(val, string, direction) -- `direction` is 'prefix' (default) or 'suffix'
C(val, num)
D(val, format) -- `format` is a string in the usual SITS date syntax
E(val, index, separator) -- `index` is 0-indexed, unlike SITS
E(val, index, length, separate) -- `index` as above. Returns `length` elements
H(val, xhtml) -- `xhtml` is a boolean
L(val, num)
M(val, format) -- `format` is a string in the usual SITS maths syntax
N(val, format) -- `format` is a string in the usual SITS number syntax
R(val, num)
S(val, find, replace)
S(val, obj) -- `obj` contains find/replace pairs
**TODO:** How to deal with single/double quotes?
U(val)
V(val)
W(val)
X(val, table) -- `table` is the XON table to use
#(val, format) -- `format` is one of ASCII, LATIN, UCAS, MD5, URL, BASE64, BASE64URL, SQL, AES, TDES, BLOWFISH
%(val, format) -- `format` is a string in the usual SITS percentage syntax

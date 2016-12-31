import {asciiToUnicode as a2u} from 'indicjs/ekarupa';
import * as maps from 'indicjs/unicode-conversion-maps';

console.log(maps);
var ascii = document.getElementById('ascii');
// alert(ascii.value);
var unicode = document.getElementById('unicode');

var convert = document.getElementById('convert');
convert.addEventListener('click', (e) => {
  var map = document.getElementById('mapchooser');
  unicode.value = a2u(ascii.value, maps[map.value], {});
});

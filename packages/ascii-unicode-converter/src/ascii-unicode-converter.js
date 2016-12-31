import {asciiToUnicode as a2u} from 'indicjs/ekarupa';
import {ambili} from 'indicjs/unicode-conversion-maps';

var ascii = document.getElementById('ascii');
// alert(ascii.value);
var unicode = document.getElementById('unicode');

var convert = document.getElementById('convert');
convert.addEventListener('click', (e) => {
  unicode.value = a2u(ascii.value, ambili, {});
});

import chai from 'chai';
import {asciiToUnicode as a2u} from 'lib/ekarupa';
import fs from 'fs';
import {getJSONMap} from 'indicjs/map-converter';

chai.should();

var map = getJSONMap('./test/ambili.map');
// console.log(JSON.stringify(map, null, 2));

describe('ekarupa', () => {
  it('should convert kartika to unicode properly', () => {
    a2u('A', map).should.equal('അ');

    console.log(a2u('At]£ ka¿∏nt°-≠Xv', map));
    // a2u('At]£ ka¿∏nt°-≠Xv', map).should.equal('അപേക്ഷ സമര്‍പ്പിക്കേണ്ടത്');

    console.log(a2u(' DtZym-Kÿ - ≥', map));
    a2u('DtZym-Kÿ-≥', map).should.equal('ഉദ്യോഗസ്ഥന്‍');
    ///ഉ േ ദ ്യ  ാ 
  });
  // it('should convert some other font to unicode properly', () => {
  // });
});

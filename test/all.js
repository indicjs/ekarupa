import chai from 'chai';
import {ascii_to_unicode} from 'project/ekarupa'

chai.should();

describe('ekarupa', () => {
  it('should convert kartika to unicode properly', () => {
    decode('A').should.equal('അ');
    decode('B').should.equal('വ');
  });
  it('should convert some other font to unicode properly', () => {
  });
});

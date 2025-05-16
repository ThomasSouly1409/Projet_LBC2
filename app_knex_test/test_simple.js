const chai = require('chai');
const expect = chai.expect;

describe('Test Example', () => {
  it('should check equality', () => {
    const result = 10;
    expect(result).to.equal(10);
  });

  it('should check if an array includes an element', () => {
    const arr = [1, 2, 3];
    expect(arr).to.include(5);
  });

  // Ajoutez d'autres assertions selon vos besoins
});
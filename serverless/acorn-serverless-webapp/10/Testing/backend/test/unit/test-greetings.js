const assert = require('assert');
const greetings = require('../../functions/greetings');

describe('Greetings', () => {
  describe('#hello()', () => {
    it('should return hello + name', (done) => {
      const event = {
        name: 'John'
      };

      const context = null;

      greetings.hello(event, context, (err, response) => {
        const expected = 'Hello, John!';
        const actual = response;
        assert.equal(expected, actual);

        done(err);
      });
    });
  });
});

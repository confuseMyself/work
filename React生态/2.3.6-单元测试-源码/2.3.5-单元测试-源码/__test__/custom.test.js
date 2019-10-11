// api.js

expect.extend({
  toPostive(received) {
    console.log(received,'rece')
    if (received > 0) {
      return {
        message: () =>
          `expected ${received} is positive`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} is no positive`,
        pass: false,
      };
    }
  },
});

test('the data is peanut butter', () => {
  expect(1).toPostive();
});



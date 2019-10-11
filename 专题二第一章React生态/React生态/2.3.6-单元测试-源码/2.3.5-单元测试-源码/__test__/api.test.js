// api.js
const fetchData = () => {
  return new Promise((resovle) => {
    setTimeout(() => {
      resovle([
        {
          name: 'ryan'
        }
      ])
    })
  })
}


test('the data is peanut butter', () => {
  return fetchData().then(data => {
    console.log(data)
    expect(data.length).toEqual(1);
  });
});



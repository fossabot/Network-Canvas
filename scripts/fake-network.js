const faker = require('faker');

const nodes = 500;

console.log(
`{
  "edges": [],
  "nodes": [
`);

for (let i = 0; i < nodes; i += 1) {
  if (i > 0) { console.log(','); }
  const person = Object.assign({}, faker.helpers.userCard());
  console.log(JSON.stringify(person));
}
console.log(`
  ]
}`);


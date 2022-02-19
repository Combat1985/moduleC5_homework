const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

/*
// образец выхода
{
  list: [
    { name: 'Petr', age: 20, prof: 'mechanic' },
    { name: 'Vova', age: 60, prof: 'pilot' },
  ]
}
*/

let list;
let result;

let data = JSON.parse(jsonString);


const listName = Object.keys(data)[0];
  
list = data[listName];
result = {[listName]:[]};


for(let values of list)
{
  result[listName].push({
  name: values.name,
  age:  Number(values.age),
  prof: values.prof
  });  
}

console.log('result:',result);
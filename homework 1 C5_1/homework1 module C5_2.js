const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

/*
// образец выхода
{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/

let parser = new DOMParser();
let xmlDOM = parser.parseFromString(xmlString, 'text/xml');

// получаем первый элемент в списке
let listNode = xmlDOM.firstElementChild;  
const listNodeName = listNode.tagName;

let result = {[listNodeName]: []};
console.log(result);

let obj = {};
for(let values of listNode.children)
{
  let nameElement = values.querySelector('name');
  
  let langStr = nameElement.getAttribute('lang');
  let nameStr = nameElement.querySelector('first').textContent + ' ' + nameElement.querySelector('second').textContent;
  let ageVal  = values.querySelector('age').textContent;
  let profStr = values.querySelector('prof').textContent;

  
  obj.name = nameStr;
  obj.age  = Number(ageVal);
  obj.prof = profStr; 
  obj.lang = langStr;
  
  console.log(obj);
  
  result[listNodeName].push(obj);
  
  obj = {};
}

console.log('result:',result);
const minValue = 1;
const maxValue = 10;

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');

// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

// Параграф, в который будем выводить сообщение о результатах считывания параметров из инпутов
const errorNode = document.querySelector('.err-msg');

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
  let strNum = document.querySelector('.input-str-num').value;
  let limit = document.querySelector('.input-limit').value;

  num = Number(strNum);
  limit = Number(limit);

  
  console.log("Выводим изображение");
  errorNode.innerHTML = "Изображение:";

  //console.log('num', num);
  //console.log('limit', limit);
  
  // определяем наличие ошибок ввода
  let numError = Boolean(minValue > num || maxValue < num || isNaN(num));
  let limitError = Boolean(minValue > limit || maxValue < limit || isNaN(limit));

  //console.log('numError', numError);
  //console.log('limitError', limitError);

  if(!numError && !limitError)
  {
    console.log('Оба поля заполнены правильно. Делаем запрос...');
    errorNode.innerHTML = "Оба поля заполнены правильно";

    fetch(`https://picsum.photos/v2/list?page=${num}&limit=${limit}`)
    .then((result)=>{ 
      //console.log('result', result);
      data = result.json();

      return data;
    })
    .then((data)=>{
      console.log('data:', data);
      
      //console.log('JSON.stringify(data):', JSON.stringify(data));
      localStorage.setItem('imagesObject', JSON.stringify(data));

      console.log('Выводим результат');
      displayResult(data);
    })
    .catch(()=>{
      console.log('Ошибка выполнения запроса');
      errorNode.innerHTML = "Ошибка выполнения запроса";
    });

  }
  else
  {
    if(numError && limitError)
    {
      //console.log('Номер страницы и лимит вне диапазона от 1 до 10');
      errorNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    }
    else
    {
      if(numError)
      {
        //console.log('Номер страницы вне диапазона от 1 до 10');
        errorNode.innerHTML = "Номер страницы вне диапазона от 1 до 10";
      }
      else
      {
        //console.log('Лимит вне диапазона от 1 до 10');
        errorNode.innerHTML = "Лимит вне диапазона от 1 до 10";
      }

    }

  }
});


document.addEventListener('DOMContentLoaded', loadStorage);

// для отладки с целью очистки loadStorage
// document.addEventListener('DOMContentLoaded', ()=>{
//   localStorage.clear();
//   alert('localStorage очищен');
//   }); 

function loadStorage(event){
  console.log('Loading Storage');
  
  let imagesObjectString = localStorage.getItem('imagesObject');
  let imagesObject = JSON.parse(imagesObjectString);
  
  console.log('imagesObject', imagesObject);
  //console.log('len:', imagesObject.length);
  if(imagesObject)
  {
    displayResult(imagesObject);
  }
}


function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  // console.log('end cards', cards);
    
  resultNode.innerHTML = cards;
}
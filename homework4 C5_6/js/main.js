const minValue = 100;
const maxValue = 300;

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');

// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

// Параграф, в который будем выводить сообщение о результатах считывания параметров из инпутов
const errorNode = document.querySelector('.err-msg');

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
  let width = document.querySelector('.input-width').value;
  let height = document.querySelector('.input-height').value;

  width = Number(width);
  height = Number(height);

  console.log('width:', width);
  console.log('height:', height);

  let widthError = Boolean(minValue > width || maxValue < width || isNaN(width));
  let heightError = Boolean(minValue > height || maxValue < height || isNaN(height));

  console.log('widthError:', widthError);
  console.log('heightError:', heightError);

  if(!widthError && !heightError)
  {
    console.log("Выводим изображение");
    errorNode.innerHTML = "Изображение:";

    //сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
    fetch(`https://picsum.photos/${width}/${height}`)
    .then((response) => {
      // выводим объект ответа на запрос
      console.log('response', response);

      return response.url;
    })
    .then((url)=>{
      resultNode.innerHTML = `
      <div class="card">
        <img
          class="card-image"
          src="${url}"
          width="${width}"
          height="${height}"    
        />
      </div>`;
    })
    .catch(()=>{
      errorNode.innerHTML = "Запрос выполнился с ошибкой";  
    });
  }    
  else
  {  
    console.log("Одно из чисел вне диапазона");
    errorNode.innerHTML = `Одно из чисел вне диапазона от ${minValue} до ${maxValue}. Попробуйте снова...`;
    resultNode.innerHTML = "";
  }       
});
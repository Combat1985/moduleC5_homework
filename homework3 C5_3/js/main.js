/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
 function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };

  /**
    * Функция обработки полученного результата
    * apiData - объект с результатом запроса
    */
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
      
    resultNode.innerHTML += cards;
  }
  

  // Ищем ноду для вставки результата запроса
  const resultNode = document.querySelector('.j-result');
  
  // Ищем кнопку, по нажатии на которую будет запрос
  const btnNode = document.querySelector('.j-btn-request');
  
  // Параграф, в который будем выводить сообщение о результатах считывания параметра из инпута
  const errorNode = document.querySelector('.err_msg');

  // Вешаем обработчик на кнопку для запроса
  btnNode.addEventListener('click', () => {
    let value = document.querySelector('input').value;
    value = Number(value);
    console.log('value:', value);

    if(isNaN(value))
    {
      errorNode.innerHTML = "Ошибка! Вы ввели не число. Введите число от 1 до 10.";

      resultNode.innerHTML = "";
    }    
    else
    {
      if(value >= 1 && value <= 10)
      {
        errorNode.innerHTML = "Будет загружено " + value + " изображений."

        useRequest(`https://picsum.photos/v2/list/?limit=${value}`, displayResult);
      }
      else
      {
        errorNode.innerHTML = "Ошибка! Число вне диапазона от 1 до 10. Попробуйте снова...";

        resultNode.innerHTML = "";
      }
    }       
  })
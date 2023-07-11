(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.notes = {
    attach: function (context, settings) {
      const notesform = document.querySelectorAll("form#notes-form");
      $(notesform).once('notesform').each(function () {
        Drupal.behaviors.notes.notesFormBuild.bind(this)(this, settings);
      });
    },
    notesFormBuild: function (notesform, settings) {
      if (notesform) {
        var savetimer; // Таймер для отложенной отправки данных
        var button = document.createElement("div"); // Создание кнопки для добавления новых полей
        button.innerHTML = "+";
        button.classList.add("buttonadd");
        notesform.appendChild(button);

        getNotes(); // Загрузка существующих заметок

        button.addEventListener("click", function () {
          // Обработчик клика по кнопке добавления
          const allInputs = notesform.querySelectorAll(".allbut .input");
          const lastIndex = allInputs.length > 0 ? parseInt(allInputs[allInputs.length - 1].parentNode.querySelector('.number').textContent) : 0;
          const block = getBlockWithInputAndBtns("", lastIndex); // Создание нового блока с полем ввода и кнопками
          notesform.appendChild(block);
          block.querySelector('.input').focus(); // Установка фокуса на новое поле ввода
        });
      }

      function getBlockWithInputAndBtns(value, index) {
        // Функция для создания блока с полем ввода и кнопками
        var allbut = document.createElement("div");
        allbut.classList.add("allbut");

        var number = document.createElement("span");
        number.classList.add("number");
        number.textContent = index + 1;
        allbut.appendChild(number);

        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Введите текст";
        input.value = value;
        input.classList.add("input");
        allbut.appendChild(input);

        var butdelete = document.createElement("button");
        butdelete.innerHTML = "✕";
        butdelete.classList.add("butdelete");
        allbut.appendChild(butdelete);

        butdelete.addEventListener("click", function () {
          // Обработчик клика по кнопке удаления
          notesform.removeChild(allbut);
          const num = document.querySelectorAll('.allbut');
          for (var i =0; i < num.length; i++){
            const inp = num[i];
            const numb = inp.querySelector('.number') ;
            if(numb){
              numb.textContent = i+1;
            }
          }
        });

        input.addEventListener("keydown", function () {
          // Обработчик события "keydown" для поля ввода
          clearTimeout(savetimer);
          savetimer = setTimeout(sendData, 1000);
        });

        butdelete.addEventListener("click", function () {
          // Обработчик клика по кнопке удаления
          clearTimeout(savetimer);
          savetimer = setTimeout(sendData, 500);
        });

        return allbut;
      }

      function sendData() {
        // Функция для отправки данных на сервер
        const data = getData(); // Получение данных из полей ввода
        console.log(data);
        $.ajax({
          url: "/save_notes_data", // URL-адрес для сохранения данных
          data: {data: data}, // Данные для отправки
          dataType: "json",
          type: 'POST',
          success: function (msg) {
            console.log(msg); // Обработка успешного ответа от сервера
          },
          error: function () {
            console.log('updateContent error'); // Обработка ошибки при отправке данных
          },
          beforeSend: function () {
            // Действия перед отправкой данных
          },
          complete: function () {
            // Действия после завершения отправки данных
          }
        });
      }

      function getData() {
        // Функция для получения данных из полей ввода
        const allinputs = notesform.querySelectorAll(".allbut input");

        var data = [];
        if (allinputs.length > 0) {
          for (let i = 0; i < allinputs.length; i++) {
            const inp = allinputs[i];
            if (inp.value !== "") {
              data.push(inp.value);
            }
          }
        }
        return data;
      }

      function getNotes() {
        // Функция для загрузки существующих заметок с сервера
        $.ajax({
          url: "/get_notes_data", // URL-адрес для получения данных
          dataType: "json",
          type: 'GET',
          success: function (msg) {
            if (msg.length == 0) {
              notesform.appendChild(getBlockWithInputAndBtns("", 0));
            } else {
              for (var i = 0; i < msg.length; i++) {
                var value = msg[i];
                notesform.appendChild(getBlockWithInputAndBtns(value, i));
              }
            }
          },
          error: function () {
            console.log('updateContent error'); // Обработка ошибки при получении данных
          },
          beforeSend: function () {
            // Действия перед отправкой запроса на получение данных
          },
          complete: function () {
            // Действия после завершения запроса на получение данных
          }
        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);

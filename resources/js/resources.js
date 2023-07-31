(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.resources = {
    attach: function (context, settings) {
      const resourcesForm = document.querySelectorAll("form#resources-form");
      $(resourcesForm).once('resources-form').each(function () {
        Drupal.behaviors.resources.resourcesFormBuild.bind(this)(this, settings);
      });
    },
    resourcesFormBuild: function (resourcesForm, settings) {
      if (resourcesForm) {
        var savetimer; // Таймер для отложенной отправки данных

        // Добавление кнопки для динамического добавления новых ресурсов
        var addButton = document.createElement("div");
        addButton.innerHTML = "+";
        addButton.classList.add("buttonadd");
        resourcesForm.appendChild(addButton);

        // Загрузка существующих ресурсов при загрузке страницы
        getResources();

        addButton.addEventListener("click", function () {
          // Обработчик события для кнопки добавления
          const allInputs = resourcesForm.querySelectorAll(".resource-row .input");
          const lastIndex = allInputs.length > 0 ? parseInt(allInputs[allInputs.length - 1].parentNode.querySelector('.number').textContent) : 0;
          const newRow = getResourceRow("", "", false, lastIndex); // Создание новой строки с пустыми полями ввода
          resourcesForm.appendChild(newRow);
          newRow.querySelector('.input-title').focus(); // Установка фокуса на новое поле ввода
        });

        resourcesForm.addEventListener("keydown", function (event) {
          // Обработчик события "keydown" для всей формы
          if (event.target.classList.contains("input")) {
            clearTimeout(savetimer);
            savetimer = setTimeout(sendData, 1000);
          }
        });

        resourcesForm.addEventListener("click", function (event) {
          // Обработчик события "click" для всей формы
          if (event.target.classList.contains("butdelete")) {
            clearTimeout(savetimer);
            savetimer = setTimeout(sendData, 500);
          }
        });
      }

      function getResourceRow(value, index) {
        // Функция для создания новой строки с полями ввода и кнопками
        var row = document.createElement("div");
        row.classList.add("resource-row");

        var number = document.createElement("span");
        number.classList.add("number");
        number.textContent = index + 1;
        row.appendChild(number);

        var inputTitle = document.createElement("input");
        inputTitle.type = "text";
        inputTitle.placeholder = "Введите имя ссылки";
        inputTitle.value = value;
        inputTitle.classList.add("input");
        row.appendChild(inputTitle);

        var inputUrl = document.createElement("input");
        inputUrl.type = "text";
        inputUrl.placeholder = "URL";
        //inputUrl.value = url;
        inputUrl.classList.add("input-url");
        row.appendChild(inputUrl);

        var butdelete = document.createElement("button");
        butdelete.innerHTML = "✕";
        butdelete.classList.add("butdelete");
        row.appendChild(butdelete);

        butdelete.addEventListener("click", function () {
          // Обработчик события "click" для кнопки удаления
          resourcesForm.querySelector('.resources-container').removeChild(row);
          const rows = resourcesForm.querySelectorAll('.resource-row');
          for (var i = 0; i < rows.length; i++) {
            const currentRow = rows[i];
            const num = currentRow.querySelector('.number');
            if (num) {
              num.textContent = i + 1;
            }
          }
        });

        return row;
      }

      function sendData() {
        // Функция для отправки данных на сервер
        const data = getData(); // Получение данных из полей ввода

        // AJAX-запрос для сохранения данных о ресурсах
        $.ajax({
          url: "/save_resources_data", // URL-адрес для сохранения данных
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
        const rows = resourcesForm.querySelectorAll(".resource-row");

        var data = [];
        if (rows.length > 0) {
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const title = row.querySelector(".input-title").value;
            const url = row.querySelector(".input-url").value;
            const personal = row.querySelector(".input-personal").checked;

            if (title !== "" && url !== "") {
              data.push({title: title, url: url, personal: personal});
            }
          }
        }
        return data;
      }

      function getResources() {
        // Функция для загрузки существующих ресурсов с сервера
        $.ajax({
          url: "/get_resources_data", // URL-адрес для получения данных
          dataType: "json",
          type: 'GET',
          success: function (msg) {
            if (msg.length === 0) {
              const newRow = getResourceRow("", "", false, 0);
              resourcesForm.querySelector('.resources-container').appendChild(newRow);
            } else {
              for (var i = 0; i < msg.length; i++) {
                var resource = msg[i];
                const newRow = getResourceRow(resource.title, resource.url, resource.personal, i);
                resourcesForm.querySelector('.resources-container').appendChild(newRow);
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

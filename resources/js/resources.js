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
        addButton.classList.add("buttonadd");
        resourcesForm.appendChild(addButton);

        // Загрузка существующих ресурсов при загрузке страницы
        getResources();

        addButton.addEventListener("click", function () {
          // Обработчик события для кнопки добавления
          const allInputs = resourcesForm.querySelectorAll(".resource-row .input");
          const lastIndex = allInputs.length > 0 ? parseInt(allInputs[allInputs.length - 1].parentNode.querySelector('.number').textContent) : 0;
          const newRow = getResourceRow("", lastIndex); // Создание новой строки с пустыми полями ввода
          resourcesForm.appendChild(newRow);
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
        inputUrl.classList.add("input-url");
        row.appendChild(inputUrl);

        var butdelete = document.createElement("button");
        butdelete.classList.add("butdelete");
        row.appendChild(butdelete);

        var butsave = document.createElement("button");
        butsave.classList.add("butsave");
        row.appendChild(butsave);

        butsave.addEventListener("click", function () {
          //row.removeChild(inputUrl);
          row.removeChild(butsave);

          });

        butdelete.addEventListener("click", function () {
          // Обработчик события "click" для кнопки удаления
          resourcesForm.removeChild(row);
          const rows = resourcesForm.querySelectorAll('.resource-row');
          for (var i = 0; i < rows.length; i++) {
            const currentRow = rows[i];
            const num = currentRow.querySelector('.number');
            if (num) {
              num.textContent = i + 1;
            }
          }
        });

        butdelete.addEventListener("click", function () {
          // Обработчик клика по кнопке удаления
          clearTimeout(savetimer);
          savetimer = setTimeout(sendData, 500);
        });
        butsave.addEventListener("click", function () {
          // Обработчик клика по кнопке удаления
          clearTimeout(savetimer);
          savetimer = setTimeout(sendData, 200);
        });
        return row;
      }
      function getUrl(){

        var link = document.createElement("div");
        link.classList.add("resource-link");
        var a = document.createElement('a');
        link.appendChild(a);
        var number = document.createElement("span");
        number.classList.add("number");
        number.textContent = index + 1;
        link.appendChild(number);
        var butdelete = document.createElement("button");
        butdelete.classList.add("butdelete");
        link.appendChild(butdelete);
        butdelete.addEventListener("click", function () {
          // Обработчик события "click" для кнопки удаления
          resourcesForm.removeChild(row);
          const rows = resourcesForm.querySelectorAll('.resource-row');
          for (var i = 0; i < rows.length; i++) {
            const currentRow = rows[i];
            const num = currentRow.querySelector('.number');
            if (num) {
              num.textContent = i + 1;
            }
          }
        });

        butdelete.addEventListener("click", function () {
          // Обработчик клика по кнопке удаления
          clearTimeout(savetimer);
          savetimer = setTimeout(sendData, 500);
        });
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
        var protocolSite = document.location.protocol;
        var hostSite = document.location.host;
        var portSite = document.location.port;
        var data = [];
        if (rows.length > 0) {
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const title = row.querySelector(".input").value;
            var url = new URL(row.querySelector(".input-url").value);
            if(url.protocol == protocolSite && url.host==hostSite && url.port==portSite){
              url = url.pathname;
            }
            if (title !== "" && url !== "") {
              data.push({title: title, url: url});
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

              for (var i = 0; i < msg.length; i++) {
                var resource = msg[i];
                //const newRow = getResourceRow(resource.title, resource.url, i);
                resourcesForm.appendChild(getUrl(resource.title, resource.url, i));
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

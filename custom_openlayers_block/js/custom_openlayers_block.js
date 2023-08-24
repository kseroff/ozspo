(function ($, Drupal) {

  Drupal.behaviors.customOpenlayersBlock = {
    attach: function (context, settings) {
      var self = this;
      var block = $('#custom-openlayers-block');

      self.showBlock = function () {
        block.css('right', 0);
      };

      self.hideBlock = function () {
        block.css('right', '-400px');
      };

      // Обработчик события на кнопке закрытия
      $('#custom-openlayers-block .close-button').on('click', function () {
        self.hideBlock();
      });

      // Обработчик события на кнопке в основном модуле для показа блока
      $('#openlayers-gis-map').once().on('click', '.custom-open-button', function () {
        self.showBlock();
      });

      self.loadBlock = function () {
        var blockHtml = `
          <div id="custom-openlayers-block">
            <div class="close-button">X</div>
            <div class="content"></div>
          </div>
        `;
        $('body').append(blockHtml);

      };

      // Вызываем функцию click из openlayersGis, чтобы подключить обработку кликов на точках
      Drupal.behaviors.openlayersGis.click();
  
        // Получение точек при клике на карту
        self.click = function () {
          var self = this;
          if (self.map) {
            self.map.on('click', function (event) {
              var feature = self.map.forEachFeatureAtPixel(event.pixel, function (feature) {
                return feature;
              });
        
              if (feature) {
                var properties = feature.getProperties(); // Получаем свойства точки
                var latitude = properties.latitude;
                var longitude = properties.longitude;
                var info = properties.info;
        
                self.showPointInfo(latitude, longitude, info);
              } 
              else {
                $('#custom-openlayers-block .content').empty(); // Очищаем содержимое блока
              }
            });
          }
        };
        
        // Код для отображения информации о точках в блоке
        self.showPointInfo = function (latitude, longitude, info) {
          // Создаем или обновляем блок с информацией о точке
          var contentBlock = $('#custom-openlayers-block .content');
          if (contentBlock.length === 0) {
            self.loadBlock();
            contentBlock = $('#custom-openlayers-block .content');
          }
        
          // Отображаем информацию о точке в блоке
          var contentHtml = '<p>Latitude: ' + latitude + '</p>';
          contentHtml += '<p>Longitude: ' + longitude + '</p>';
          contentHtml += '<p>' + info + '</p>';
          contentBlock.html(contentHtml);
        };
  
        // Добавление функции в объект Drupal.behaviors
        Drupal.behaviors.customOpenlayersBlock.click = self.click;
  
      }
    };
  
  })(jQuery, Drupal);
  
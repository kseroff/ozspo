(function ($, Drupal) {
  Drupal.behaviors.gis_info_block = {
    map: null, // Добавьте переменную для хранения объекта карты.
    
    attach: function (context, settings) {
      var self = this;
      var block = $('#gis_info_block');
      var currentLayerName = ''; // Сюда будет сохранено имя текущего слоя.

      self.showBlock = function () {
        block.css('right', 0);
      };

      self.hideBlock = function () {
        block.css('right', '-400px');
      };

      // Добавьте обработчик события для изменения видимости слоя.
      $('.layer-toggle').on('change', function () {
        var isChecked = $(this).is(':checked');
        var layerName = $(this).attr('data-layer-name');
        if (layerName !== currentLayerName) {
          self.hideBlock();
          currentLayerName = layerName;
        }
        self.toggleLayerVisibility(layerName, isChecked);
      });

      // Обработчик события на кнопке закрытия.
      $('#gis_info_block .close-button').on('click', function () {
        self.hideBlock();
      });

      self.showPointInfo = function (points) {
        var contentBlock = $('#gis_info_block .content');
        contentBlock.empty();

        for (var index = 0; index < points[0].features.length; index++) {
          var pointInfoBlock = $('<div class="point-info"></div>');
          pointInfoBlock.html('<p>' + points[0].features[index].values_.info + '</p>');
          contentBlock.append(pointInfoBlock);

          if (index < points[0].features.length - 1) {
            contentBlock.append('<div class="point-gap"></div>');
          }
        }

        self.showBlock();
      };

      // Функция для изменения видимости слоя.
      self.toggleLayerVisibility = function (layerName, isVisible) {
        if (self.map) { // Проверяем, есть ли объект карты.
          var layer = self.map.getLayers().getArray().find(function (l) {
            return l.get('name') === layerName;
          });

          if (layer) {
            layer.setVisible(isVisible);
          }
        }
      };
    },
  };
})(jQuery, Drupal);
(function ($, Drupal) {

        Drupal.behaviors.gis_info_block = {
          attach: function (context, settings) {
            var self = this;
            var block = $('#gis_info_block');
      
            self.showBlock = function () {
              block.css('right', 0);
            };
      
            self.hideBlock = function () {
              block.css('right', '-400px');
            };
      
            // Добавьте обработчик события для изменения видимости слоя
            $('#layer-toggle').on('change', function () {
              var isChecked = $(this).is(':checked');
              self.toggleLayerVisibility(isChecked);
            });
      
            // Обработчик события на кнопке закрытия
            $('#gis_info_block .close-button').on('click', function () {
              self.hideBlock();
            });
      
            self.showPointInfo = function (points) {
              var contentBlock = $('#gis_info_block .content');
              if (contentBlock.length === 0) {
                self.loadBlock();
                contentBlock = $('gis_info_block .content');
              }
        
              contentBlock.empty(); 
      
              for (let index = 0; index < points[0].features.length; index++){
                var pointInfoBlock = $('<div class="point-info"></div>');
                
                pointInfoBlock.html('<p>' + points[0].features[index].values_.info + '</p>');
                contentBlock.append(pointInfoBlock);
                
                if (index <  points[0].features.length - 1) {
                  contentBlock.append('<div class="point-gap"></div>');
                }
              }
      
              self.showBlock(); 
            };
      
            self.loadBlock = function () {
              var blockHtml =
                '<div id="gis_info_block">' +
                '<div class="close-button">X</div>' +
                '<div class="content"></div>' +
                '</div>';
              $('body').append(blockHtml);
              block = $('#gis_info_block');
            };
      
            // Функция для изменения видимости слоя
            self.toggleLayerVisibility = function (isVisible) {
              // Ваш код для изменения видимости слоя, например:
              var layer = self.map.getLayers().getArray().find(function (l) {
                return l.get('name') === 'Ваш слой';
              });
      
              if (layer) {
                layer.setVisible(isVisible);
              }
            };
          },
        };
      })(jQuery, Drupal);
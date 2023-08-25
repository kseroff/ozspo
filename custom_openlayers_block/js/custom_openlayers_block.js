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

      self.showPointInfo = function (point) {
        var contentBlock = $('#custom-openlayers-block .content');
        if (contentBlock.length == 0) {
          self.loadBlock();
          contentBlock = $('#custom-openlayers-block .content');
        }
        self.showBlock(); 

        contentBlock.html('<p>' + point.info + '</p>');
      };

      self.loadBlock = function () {
        var blockHtml =
          '<div id="custom-openlayers-block">' +
          '<div class="close-button">X</div>' +
          '<div class="content"></div>' +
          '</div>';
        $('body').append(blockHtml);
        block = $('#custom-openlayers-block');
      };

    },
  };
})(jQuery, Drupal);

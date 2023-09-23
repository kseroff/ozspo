(function ($) {
  Drupal.behaviors.gisLayersBlock = {
    attach: function (context, settings) {
      var layerToggle = $('#layer-toggle');
      layerToggle.on('change', function () {
        Drupal.behaviors.openlayersGis.toggleLayerVisibility(this.checked);
      });
    }
  };
})(jQuery);
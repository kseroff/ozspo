(function ($) {
    Drupal.behaviors.mapmoduleOpenLayers = {
      attach: function (context, settings) {
        
        var map = new ol.Map({
          target: 'map',
          layers: [
            // слои
          ],
          view: new ol.View({
           // уровень масштабирования карты
            center: ol.proj.fromLonLat([0, 0]),
            zoom: 10
          })
        });
  
        // если что, код для настройаи карты
      }
    };
  })(jQuery);
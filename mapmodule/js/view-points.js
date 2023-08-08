(function ($) {
    Drupal.behaviors.mapmoduleViewPoints = {
      attach: function (context, settings) {
        var savedPoints = settings.mapmodule.savedPoints;
  
        if (savedPoints) {
          savedPoints.forEach(function (point) {
            var marker = new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude]))
            });
  
            var iconStyle = new ol.style.Style({
              image: new ol.style.Icon({
                src: point.iconUrl,
                anchor: [0.5, 1]
              })
            });
  
            marker.setStyle(iconStyle);
  
            vectorLayer.getSource().addFeature(marker);
          });
        }
        map.on('click', function (event) {
          var clickedFeature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
            return feature;
          });
  
          if (clickedFeature) {
// Обработать событие щелчка по точке

          }
        });
      }
    };
  })(jQuery);
(function ($, Drupal) {

  Drupal.behaviors.openlayersGis = {
    proc: function(){
var map = new ol.Map({
        target: 'openlayers-gis-map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([45.0174, 53.1959]),
          zoom: 12,
        }),
      });

      $.ajax({
        url: '/openlayers-gis/points',
        success: function (data) {
          var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
          });

          map.addLayer(vectorLayer);

          data.forEach(function (point) {
            var feature = new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude])),
            });
            feature.set('info', point.info);
            vectorLayer.getSource().addFeature(feature);
          });
        },
      });

      var popup = new ol.Overlay({
        element: document.getElementById('openlayers-gis-popup'),
      });
      map.addOverlay(popup);

      map.on('click', function (event) {
        var feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
          return feature;
        });

        if (feature) {
          var coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          var content = '<div class="popup-content">' + feature.get('info') + '</div>';
          $('#openlayers-gis-popup').html(content);
        } else {
          popup.setPosition(undefined);
          $('#openlayers-gis-popup').empty();
        }
      });
    },

    attach: function (context, settings) {
       $(context).find('main').once().each(Drupal.behaviors.openlayersGis.proc);
    },
  };

})(jQuery, Drupal);

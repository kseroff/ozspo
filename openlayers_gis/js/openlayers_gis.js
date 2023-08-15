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

      var popup = new ol.Overlay({
        element: document.getElementById('openlayers-gis-popup'),
      });
      map.addOverlay(popup);

      $.ajax({
        url: '/openlayers-gis/getpoint',
        method: 'GET',
        success: function (data) {
          var points = data;
          points.forEach(function (point) {
            var marker = new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude])),
              info: point.info,
            });
            marker.setStyle(new ol.style.Style({
              image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({color: 'red'}),
              }),
            }));
            var vectorSource = new ol.source.Vector({
              features: [marker],
            });
            var vectorLayer = new ol.layer.Vector({
              source: vectorSource,
            });
            map.addLayer(vectorLayer);
          });
        },
      });

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

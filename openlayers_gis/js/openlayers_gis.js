(function ($, Drupal, openlayers) {

  'use strict';

  Drupal.behaviors.openlayersGis = {
    attach: function (context, settings) {
      var map = new openlayers.Map({
        target: 'openlayers-gis-map',
        layers: [
          new openlayers.layer.Tile({
            source: new openlayers.source.OSM(),
          }),
        ],
        view: new openlayers.View({
          center: openlayers.proj.fromLonLat([45.0174, 53.1959]),
          zoom: 12,
        }),
      });

      // Fetch points from Drupal and add them to the vector layer.
      $.ajax({
        url: '/openlayers-gis/points',
        success: function (data) {
          var vectorLayer = new openlayers.layer.Vector({
            source: new openlayers.source.Vector(),
          });

          map.addLayer(vectorLayer);

          data.forEach(function (point) {
            var feature = new openlayers.Feature({
              geometry: new openlayers.geom.Point(openlayers.proj.fromLonLat([point.longitude, point.latitude])),
            });
            feature.set('info', point.info);
            vectorLayer.getSource().addFeature(feature);
          });
        },
      });

      var popup = new openlayers.Overlay({
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
  };

})(jQuery, Drupal, openlayers);

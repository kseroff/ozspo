(function ($, Drupal) {

  var mapInitialized = false;
  var vectorSource = new ol.source.Vector();
  var map;
  var markerLayer;
  var selectedMarker = 'default';
  var markerFeature;

  Drupal.behaviors.pointsAddMap = {
    attach: function (context, settings) {
      if (!mapInitialized) {
        this.proc();
        mapInitialized = true;
      }
    },

    proc: function () {
      map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([45.0174, 53.1959]),
          zoom: 12,
          minZoom: 4,
        }),
      });

      markerLayer = new ol.layer.Vector({
        source: vectorSource,
      });
      map.addLayer(markerLayer);

      map.on('click', function (event) {
        var coordinate = event.coordinate;
        updateCoordinates(coordinate);
        updateMarker(coordinate);
      });

      $('#edit-marker').on('change', function () {
        selectedMarker = $(this).val();
        if (markerFeature) {
          var markerGeometry = markerFeature.getGeometry();
          var markerCoordinates = markerGeometry.getCoordinates();
          updateMarker(markerCoordinates);
        }
      });

      // Обработчики изменения текстовых полей координат
      $('#latitude, #longitude').on('change', function () {
        var latitude = parseFloat($('#latitude').val());
        var longitude = parseFloat($('#longitude').val());

        if (!isNaN(latitude) && !isNaN(longitude)) {
          var coordinate = ol.proj.fromLonLat([longitude, latitude]);
          updateMarker(coordinate);
        }
      });

      function updateMarker(coordinate) {
        vectorSource.clear();

        markerFeature = new ol.Feature({
          geometry: new ol.geom.Point(coordinate),
        });

        if (selectedMarker === 'default') {
          markerFeature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
              radius: 6,
              fill: new ol.style.Fill({color: 'red'}),
            }),
          }));
        } else {
          markerFeature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
              src: '/modules/gis_points_add/image/' + selectedMarker,
              scale: 0.1,
            }),
          }));
        }

        vectorSource.addFeature(markerFeature);
      }

      function updateCoordinates(coordinate) {
        var lonLat = ol.proj.toLonLat(coordinate);
        $('#latitude').val(lonLat[1]);
        $('#longitude').val(lonLat[0]);
      }
    },
  };

})(jQuery, Drupal);

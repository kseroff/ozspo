(function ($, Drupal, drupalSettings) {

  var mapInitialized = false;
  var vectorSource = new ol.source.Vector();
  var markerLayer; // хранения маркеров

  Drupal.behaviors.pointsAddMap = {
    attach: function (context, settings) {
      if (!mapInitialized) {
        this.proc();
        mapInitialized = true;
      }
    },

    proc: function () {
      var self = this;

      var map = new ol.Map({
        target: 'map',
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

      // Создание слоя с маркерами
      markerLayer = new ol.layer.Vector({
        source: vectorSource,
      });
      map.addLayer(markerLayer);

      map.on('click', function (event) {
        var coordinate = event.coordinate;
        var lonLat = ol.proj.toLonLat(coordinate);
        $('#latitude').val(lonLat[1]);
        $('#longitude').val(lonLat[0]);

        // Очистка предыдущих маркеров
        vectorSource.clear();

        // Создание маркера и добавление в хранилище
        var marker = new ol.Feature({
          geometry: new ol.geom.Point(coordinate),
        });
        vectorSource.addFeature(marker);

        //стиль маркера
        marker.setStyle(new ol.style.Style({
          image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({color: 'red'}),
          }),
        }));
      });
    },
  };

})(jQuery, Drupal, drupalSettings);

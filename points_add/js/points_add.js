(function ($, Drupal) {

  var mapInitialized = false;
  var vectorSource = new ol.source.Vector();
  var map;
  var markerLayer; // хранение маркеров
  var selectedMarker = 'default'; // начальный выбор маркера
  var markerFeature; // переменная для хранения текущего маркера

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

        updateMarker(coordinate);
      });

      // Определите функцию для обновления маркера на карте
      function updateMarker(coordinate) {
        // Очистка предыдущих маркеров
        vectorSource.clear();

        markerFeature = new ol.Feature({
          geometry: new ol.geom.Point(coordinate),
        });

        if (selectedMarker === 'default') {
          // Если выбрана стандартная красная точка
          markerFeature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
              radius: 6,
              fill: new ol.style.Fill({color: 'red'}),
            }),
          }));
        } 
        else 
        {
          // Иначе, использовать выбранный изображение маркера
          markerFeature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
              src: '/modules/points_add/image/' + selectedMarker,
              scale: 0.1,
            }),
          }));
        }

        vectorSource.addFeature(markerFeature);
      }

      // Обработчик изменения выбора маркера
      $('#edit-marker').on('change', function () {
        selectedMarker = $(this).val();
        if (markerFeature) {
          // Если на карте уже есть маркер, обновить
          var markerGeometry = markerFeature.getGeometry();
          var markerCoordinates = markerGeometry.getCoordinates();
          updateMarker(markerCoordinates);
        }
      });
    },
  };

})(jQuery, Drupal);

(function ($, Drupal) {

  // Создание объекта openlayersGis внутри behaviors
  Drupal.behaviors.openlayersGis = {
    map: null, // Хранение объекта карты

    attach: function (context, settings) {
      var self = this;

      // Выполняем процедуру proc для каждого элемента main
      $(context).find('main').once().each(function () { self.proc.call(self, this); });

      // Обновляем точки на карте
      self.updatePoints.call(self);

      // Добавляем обработчик события click на карту
      self.click.call(self);
    },

    // Процедура инициализации карты
    proc: function (element) {
      this.map = new ol.Map({
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

      // Создание всплывающего окна на карте
      var popup = new ol.Overlay({
        element: document.getElementById('openlayers-gis-popup'),
      });
      this.map.addOverlay(popup);
    },

    // Обновление точек на карте
    updatePoints: function () {
      var self = this;
      if (self.map) { // Проверяем, что карта уже инициализирована
        var bounds = self.map.getView().calculateExtent();

        // Запрос данных о точках с сервера
        $.ajax({
          url: '/openlayers-gis/getpoint',
          method: 'GET',
          data: { 'bbox': bounds.join(','), },
          success: function (data) {
            var points = data;
            var vectorSource = new ol.source.Vector();

            // Создание маркеров для каждой точки
            points.forEach(function (point) {
              var marker = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude])),
                info: point.info,
              });

              // Определение стиля маркера
              marker.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                  radius: 6,
                  fill: new ol.style.Fill({color: 'red'}),
                }),
              }));

              vectorSource.addFeature(marker);
            });

            // Создание слоя с точками и добавление на карту
            var vectorLayer = new ol.layer.Vector({
              source: vectorSource,
            });

            self.map.addLayer(vectorLayer);
          },
        });
      }
    },

    // Обработчик события клика на точку на карте
    click: function () {
      var self = this;
      if (self.map) {
        self.map.on('click', function (event) {
          var feature = self.map.forEachFeatureAtPixel(event.pixel, function (feature) {
            console.log("Событие щелчка запущено");
            return feature;
          });

          if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            var popup = self.map.getOverlayById('openlayers-gis-popup');
            popup.setPosition(coordinates);
            var content = '<div class="popup-content">' + feature.get('info') + '</div>';
            $('#openlayers-gis-popup').html(content);
          } else {
            console.log("Функция не выбрана");
            var popup = self.map.getOverlayById('openlayers-gis-popup');
            popup.setPosition(undefined);
            $('#openlayers-gis-popup').empty();
          }
        });
      }
    },
  };

})(jQuery, Drupal);

(function ($, Drupal) {
  var loadedPointIds = {};

  Drupal.behaviors.openlayersGis = {
    map: null,

    attach: function (context, settings) {
      var self = this;
      $(context).find('main').once().each(function () {
          self.proc();
        });

      self.map.on('moveend', function () {
        self.updatePoints();
      });

      self.click();

      var exportButton = $('<button class="print-button">Скачать карту</button>');
      $('body').append(exportButton);
  
      exportButton.on('click', function () {
        self.exportButton();
      });

    },

    proc: function () {
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
          minZoom: 4,
        }),
      });

      // Добавляем ol-ext
      ol.source.Vector.prototype.clustering = function () {
        return new ol.source.Cluster({
          source: this,
        });
      };

      var vectorSource = new ol.source.Vector().clustering();

      // Создаем слой для кластеров
      var clusterLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function (feature) {
          var size = feature.get('features') ? feature.get('features').length : 1;
          var style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 10,
              fill: new ol.style.Fill({
                color: 'red',
              }),
            }),
            text: new ol.style.Text({
              text: size.toString(),
              fill: new ol.style.Fill({
                color: '#fff',
              }),
            }),
          });
          return style;
        },
      });

      this.map.addLayer(clusterLayer);
      this.popup = new ol.Overlay({
        element: document.getElementById('openlayers-gis-popup'),
      });
      this.map.addOverlay(this.popup);
    },

    updatePoints: function () {
      var self = this;
      if (self.map) {
        var bounds = self.map.getView().calculateExtent();
        var bbox = bounds.join(',');

        $.ajax({
          url: '/openlayers-gis/getpoint',
          method: 'GET',
          data: { bbox: bbox },
          success: function (data) {
            // Очищаем источник кластеров от точек, которые больше не видны
            self.map.getLayers().forEach(function (layer) {
              if (layer instanceof ol.layer.Vector) {
                var features = layer.getSource().getSource().getFeatures();
                features.forEach(function (feature) {
                  var featureId = feature.getProperties().id;
                  if (!loadedPointIds[featureId]) {
                    layer.getSource().getSource().removeFeature(feature);
                  }
                });
              }
            });

            // Загружаем только те точки, которые еще не были загружены
            data.forEach(function (point) {
              var featureId = point.id;
              if (!loadedPointIds[featureId]) {
                loadedPointIds[featureId] = true;

                var feature = new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude])),
                  info: point.info,
                  id: featureId,
                });

                self.map.getLayers().forEach(function (layer) {
                  if (layer instanceof ol.layer.Vector) {
                    layer.getSource().getSource().addFeature(feature);
                  }
                });
              }
            });
          },
        });
      }
    },

    exportButton: function () { 
      var self = this;
  var mapCanvas = document.querySelector('.ol-viewport canvas');
  var mapImage = new Image();
  mapImage.src = mapCanvas.toDataURL('image/png');

  mapImage.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = mapCanvas.width;
    canvas.height = mapCanvas.height;
    var context = canvas.getContext('2d');
    context.drawImage(mapImage, 0, 0);

    // Отрисовываем точки на изображении
    var clusterLayer = self.map.getLayers().getArray()[1];
    var features = clusterLayer.getSource().getFeatures();
    
    features.forEach(function (feature) {
      var coordinates = feature.getGeometry().getCoordinates();
      var pixel = self.map.getPixelFromCoordinate(coordinates);
      
      // Получаем координаты пикселей на изображении с учетом пропорций
      var mapImagePixelX = (pixel[0] / self.map.getSize()[0]) * mapCanvas.width;
      var mapImagePixelY = (pixel[1] / self.map.getSize()[1]) * mapCanvas.height;
      
      context.beginPath();
      context.arc(mapImagePixelX, mapImagePixelY, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
    });

    // Скачиваем карту с точками как изображение
    var imageWithPoints = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = imageWithPoints;
    link.download = 'map_with_points.png';
    link.click();
  };
},

    click: function () {
      var self = this;
      if (self.map) {
        self.map.on('click', function (event) {
          var features = self.map.getFeaturesAtPixel(event.pixel);
    
          if (features && features.length > 0) {
            for (var i = 0; i < features.length; i++) {
              var feature = features[i];
              var points = feature.getProperties();

              Drupal.behaviors.customOpenlayersBlock.showPointInfo([points]);
            }
          } else {
            Drupal.behaviors.customOpenlayersBlock.hideBlock();
          }
        });

      }
    },
    
  };
})(jQuery, Drupal);
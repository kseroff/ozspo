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
      if (self.map) 
      {
        var bounds = self.map.getView().calculateExtent();
        var bbox = bounds.join(',');

        $.ajax({
          url: '/openlayers-gis/getpoint',
          method: 'GET',
          data: { bbox: bbox },
          success: function (data) {
            // Очищаем источник кластеров от точек, которые больше не видны
            self.map.getLayers().forEach(function (layer) {
              if (layer instanceof ol.layer.Vector) 
              {
                var features = layer.getSource().getSource().getFeatures();
                features.forEach(function (feature) {
                  var featureId = feature.getProperties().id;
                  if (!loadedPointIds[featureId]) 
                  {
                    layer.getSource().getSource().removeFeature(feature);
                  }
                });
              }
            });

            // Загружаем только те точки, которые еще не были загружены
            data.forEach(function (point) {
              var featureId = point.id;
              if (!loadedPointIds[featureId]) 
              {
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
      var mapCanvas = document.createElement('canvas');
      var size = self.map.getSize();

      mapCanvas.width = size[0];
      mapCanvas.height = size[1];

      var mapContext = mapCanvas.getContext('2d');
      var mapViewport = self.map.getViewport();
    
      self.map.once('rendercomplete', function () {
        Array.prototype.forEach.call(
          mapViewport.querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
          function (canvas) {

        if (canvas.width > 0) 
        {
          var opacity = canvas.parentNode.style.opacity || canvas.style.opacity;
          mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);

          var matrix;
          var transform = canvas.style.transform;

          if (transform) 
          {
            matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
          } 
          else 
          {
            matrix = [
              parseFloat(canvas.style.width) / canvas.width, 0, 0,
              parseFloat(canvas.style.height) / canvas.height, 0, 0,
            ];
          }
          CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
          var backgroundColor = canvas.parentNode.style.backgroundColor;

          if (backgroundColor) 
          {
            mapContext.fillStyle = backgroundColor;
            mapContext.fillRect(0, 0, canvas.width, canvas.height);
          }
          mapContext.drawImage(canvas, 0, 0);
        }
      }
    );

    var link = document.createElement('a');
    link.href = mapCanvas.toDataURL();
    link.download = 'map.png';
    link.click();

    mapContext.globalAlpha = 1;
    mapContext.setTransform(1, 0, 0, 1, 0, 0);
  });

  self.map.renderSync();
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
(function ($, Drupal) {

  var loadedPointIds = {};

  Drupal.behaviors.openlayersGis = {
    map: null,

    attach: function (context, settings) {
      var self = this;
      $(context).find('main').once().each(function () { self.proc.call(self, this); });

      self.map.on('moveend', function ()
      {
      self.updatePoints();
      });
      
      $(document).ready(function () {
        Drupal.behaviors.customOpenlayersBlock.loadBlock();
      });
    },

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
          minZoom: 4,
        }),
      });

      // Добавляем ol-ext
      ol.source.Vector.prototype.clustering = function() {
        return new ol.source.Cluster({
          source: this
        });
      };

      var vectorSource = new ol.source.Vector().clustering();
    
          // Создаем слой для кластеров
          var clusterLayer = new ol.layer.Vector({
            source: vectorSource,
            style: function(feature) {
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
          data: { 'bbox': bbox },
          success: function (data) {
            var points = data;

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
            points.forEach(function (point) {
              var featureId = point.id;
              if (!loadedPointIds[featureId]) {
                loadedPointIds[featureId] = true;

                var feature = new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude])),
                  info: point.info,
                  id: featureId, // Добавляем ID точки в свойства
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

    // Обработчик события клика на точку на карте
    click: function () {
      var self = this;
      if (self.map) {
        self.map.on('click', function (event) {
          var feature = self.map.forEachFeatureAtPixel(event.pixel, function (feature) {
            return feature;
          });
    
          if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            self.popup.setPosition(coordinates);
    
            var pointInfo = feature.get('info');
            Drupal.behaviors.customOpenlayersBlock.showPointInfo({ info: pointInfo });
    
            Drupal.behaviors.customOpenlayersBlock.showBlock();
          } 
          else {
            self.popup.setPosition(undefined);
            Drupal.behaviors.customOpenlayersBlock.hideBlock();
          }
        });
      }
    },
  };

})(jQuery, Drupal);
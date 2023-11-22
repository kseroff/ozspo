(function ($, Drupal) {
  var layers = {};
  var loadedPoints = {};
  var myLayersGroup;
  var switcher;

  Drupal.behaviors.openlayersGis = {
    map: null,

    attach: function (context, settings) {
      var self = this;
       
        $(context).find('main').once().each(function () {
          switcher = new ol.control.LayerSwitcher({});
          self.proc();
          self.printDialog();
        });
  
        self.map.on('moveend', function () {
          self.updatePoints();
        });
  
        self.click();

        document.addEventListener('fullscreenchange', function () {
          self.toggleLayerSwitcherInMap();
        });

    },

    proc: function () {

      var layers=[
        new ol.layer.Group({
          openInLayerSwitcher: true,
          title: 'Base layers',
        layers: [
          new ol.layer.Tile({
            title: 'OSM',
            source: new ol.source.OSM(),
          }),
          new ol.layer.Graticule({
            title: 'Graticule',
            strokeStyle: new ol.style.Stroke({
              color: 'rgba(255,120,0,0.9)',
              width: 2,
              lineDash: [0.5, 4]
            }),
            showLabels: true,
            wrapX: false
          })
        ],
      }),
      ];

      layers.push(      
        myLayersGroup = new ol.layer.Group({
        layers: [],
        name: 'MyLayers',
      }));

      this.map = new ol.Map({
        target: 'openlayers-gis-map',
        layers: layers,
        view: new ol.View({
          center: ol.proj.fromLonLat([45.0174, 53.1959]),
          rotation: 0,
          zoom: 10,
          minZoom: 4,
        }),
        controls: ol.control.defaults().extend([ 
          new ol.control.ZoomSlider(),
          new ol.control.FullScreen(),
        ]),
      });

      //добавляет layerswicher снаружи от карты карты
      var lswitcher = new ol.control.LayerSwitcher({
        target:$(".layerSwitcher").get(0), 
        show_progress:true,
      });
      this.map.addControl(lswitcher);

      var search = $('<input>').attr('placeholder','filter');
      function filterLayers(rex, layers) {
        var found = false;
        layers.forEach(function(l){
          // Layer Group
          if (l.getLayers) {
            if (filterLayers(rex, l.getLayers().getArray())) {
              l.set('noLayer', false);
              found = true;
            } else {
              l.set('noLayer', true);
            }
          } else {
            if (rex.test(l.get('title'))) {
              l.setVisible(true);
              found = true;
            } else {
              l.setVisible(false);
            }
          }
        });
        return found;
      }
      search.on('keyup change', function(){
        var rex = new RegExp(search.val());
        filterLayers(rex, layers);
        // Force layer switcher redraw
        // layers[0].changed();
      });
      lswitcher.setHeader(search.get(0));
    
      lswitcher.on('drawlist', function(e) {
        if (e.layer.getLayers) {
          if (e.layer.get('noLayer')) {
            $(e.li).hide();
          } else {
            $(e.li).show();
          }
        } else {
          var rex = new RegExp(search.val());
          if (rex.test(e.layer.get('title'))) {
            $(e.li).show();
          } else {
            $(e.li).hide();
          }
        }
      });

      function customCoordinateFormat(coordinate) {
        const latitude = coordinate[1];
        const longitude = coordinate[0];
        const formattedLatitude = latitude >= 0 ? latitude.toFixed(4) + '°N' : (-latitude).toFixed(4) + '°S';
        const formattedLongitude = longitude >= 0 ? longitude.toFixed(4) + '°E' : (-longitude).toFixed(4) + '°W';
        return formattedLatitude + ', ' + formattedLongitude;
      }
      
      this.map.addControl(new ol.control.MousePosition({
        coordinateFormat: customCoordinateFormat,
        projection: 'EPSG:4326',
      }));

      this.map.addControl(new ol.control.CanvasScaleLine());

    },

    //добавляет layerswicher внутри карты(при открытие полноэкранного режима)
    toggleLayerSwitcherInMap: function () {
      var isFullScreen = document.fullscreenElement !== null;

      if (isFullScreen) {
        this.map.addControl(switcher);
      } else {
        this.map.removeControl(switcher);
      }
    },
   
    updatePoints: function () {

      var self = this;
      var bounds = self.map.getView().calculateExtent();
      
      $.ajax({
        url: '/gis-openlayers/getlayersandpoints',
        method: 'GET',
        success: function (data) {
    
          data.forEach(function (layerPoint) {
            var layerId = layerPoint.id;
            var layerMarkerSvg = layerPoint.marker_svg;

            // Создаем новый слой для этой сущности, если его еще нет.
            if (!layers[layerId]) {
              var clusterSource = new ol.source.Cluster({
                distance: 20,
                source: new ol.source.Vector({
                  features: [],
                }),
              });
              var layer = new ol.layer.Vector({
                source: clusterSource,
                style: function (feature) {
                 // var features = feature.get('features');
                 // var size = features.length;
                  var style = new ol.style.Style({
                    image: new ol.style.Icon({
                      src: layerMarkerSvg,
                      scale: 0.13,
                    }),
                    // text: new ol.style.Text({
                    //   text: size.toString(),
                    // }),
                  });
                  return style;
                },
                visible: true,
              });
              layer.set('title', layerPoint.layer_name);
              myLayersGroup.getLayers().push(layer);

              layers[layerId] = layer;
            }

            layers[layerId].getSource().getSource().getFeatures().forEach(function (feature) {
              if (!self.pointIsVisible(feature.getGeometry(), bounds)) {
                layers[layerId].getSource().getSource().removeFeature(feature);
                delete loadedPoints[feature.getProperties().id];
              }
            });

            // Добавляем точки в соответствующий слой.
            layerPoint.points.forEach(function (point) {
              var featureId = point.id;
              if  (!loadedPoints[featureId] && 
                self.pointIsVisible(new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude])), bounds))  
                {
                var feature = new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([point.longitude, point.latitude])),
                  title: point.point_name,
                  info: point.info,
                  id: featureId,
                });
                layers[layerId].getSource().getSource().addFeature(feature);

                // Отмечаем точку как уже отображенную.
                loadedPoints[featureId] = true;
              }
            });
          });
        },
      });
    },

    pointIsVisible: function (geometry, bounds) {
      var geometryExtent = geometry.getExtent();
      return ol.extent.intersects(geometryExtent, bounds);
    },

    printDialog: function () { 
      var self = this; 

      self.map.addControl(new ol.control.CanvasTitle({ 
        title: 'Название', 
        visible: false,
        style: new ol.style.Style({ text: new ol.style.Text({ font: '20px "Lucida Grande",Verdana,Geneva,Lucida,Arial,Helvetica,sans-serif'}) })
      }));
      
      var printControl = new ol.control.PrintDialog();
      printControl.setSize('A4');
      self.map.addControl(printControl);
      
      /* On print > save image file */
      printControl.on(['print', 'error'], function(e) {
        // Print success

        if (e.image) {
          if (e.pdf) {
            // Export pdf using the print info
            var pdf = new jsPDF({
              orientation: e.print.orientation,
              unit: e.print.unit,
              format: e.print.size
            });
            pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
            pdf.save(e.print.legend ? 'legend.pdf' : 'map.pdf');
          } else  {
            // сохранить картинку или файл
            e.canvas.toBlob(function(blob) {
              var name = (e.print.legend ? 'legend.' : 'map.')+e.imageType.replace('image/','');
              saveAs(blob, name);
            }, e.imageType, e.quality);
          }
        } else {
          console.warn('No canvas to export');
        }
      });
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

          Drupal.behaviors.gis_info_block.showPointInfo([points]);
        }
      } 
      else {
        Drupal.behaviors.gis_info_block.hideBlock();
      }
    });
    
  }
},

    
  };
})(jQuery, Drupal);
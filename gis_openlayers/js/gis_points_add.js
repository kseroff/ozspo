(function ($, Drupal) {
  var mapInitialized = false;

  Drupal.behaviors.pointsAddMap = {
    attach: function (context, settings) {
      if (!mapInitialized) {
        this.proc();
        mapInitialized = true;
      }
    },

    proc: function () {
      
     var vector = new ol.layer.Vector( { 
      title: 'Название',
      source: new ol.source.Vector(),
      style: function (f) {
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({ width: 1.5, color: f.get('color') || [255,128,0] }),
            fill: new ol.style.Fill({ color: (f.get('color') || [255,128,0]).concat([.3]) })
          }),
          stroke: new ol.style.Stroke({ width: 2.5, color: f.get('color') || [255,128,0] }),
          fill: new ol.style.Fill({ color: (f.get('color') || [255,128,0]).concat([.3]) })
        })
      }
    })

    this.map = new ol.Map({
      target: 'map',
      layers: [
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
          }),
        ],
      }),
      vector,
      ],
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

    this.map.addControl(new ol.control.LayerSwitcher({}));

    // Main control bar
    var mainbar = new ol.control.Bar();
    this.map.addControl(mainbar);

    // Editbar
    var editbar = new ol.control.EditBar ({
      source: vector.getSource(),
      interactions: { Info: false },
      map: this.map,
    });
    mainbar.addControl(editbar);
  
   // Undo redo interaction
    var undoInteraction = new ol.interaction.UndoRedo();
    this.map.addInteraction(undoInteraction);
    // Prevent selection of a deleted feature
    undoInteraction.on('undo', function(e) {
      if (e.action.type === 'addfeature') {
        editbar.getInteraction('Select').getFeatures().clear();
        editbar.getInteraction('Transform').select();
      }
    });

    // Handle undo/redo stack
    undoInteraction.on('stack:add', function (e) {
      // New action element
      if (!e.action.element) {
        var elt = e.action.element = $('<li>').text(e.action.name || e.action.type)
        elt.addClass(e.action.name || e.action.type);
        elt.click(function() {
          // undo or redo stack
          if (elt.parent().hasClass('undo')) {
            undoInteraction.undo();
          } else {
            undoInteraction.redo();
          }
        })
      }
      // Append to undo stack
      $('.options .undo').append(e.action.element);
      e.action.element.attr('title', 'undo');
      if (!undoInteraction.hasRedo()) $('.options .redo').html('');
    //  console.log(undoInteraction.length()+' undo | '+undoInteraction.length('redo')+' redo')
    });
    // Append to redo stack
    undoInteraction.on('stack:remove', function (e) {
      if (e.shift) {
        $('.options .undo li').first().remove();
      } else {
        $('.options .redo').prepend($('.options .undo li').last());
      }
      e.action.element.attr('title', 'redo');
    //  console.log(undoInteraction.length()+' undo | '+undoInteraction.length('redo')+' redo')
    });
    // Clear stack
    undoInteraction.on('stack:clear', function (e) {
      $('.options .undo').html('');
      $('.options .redo').html('');
    //  console.log(undoInteraction.length()+' undo | '+undoInteraction.length('redo')+' redo')
    });

    // Add buttons to the bar
    var bar = new ol.control.Bar({ 
      group: true,
      controls: [
        new ol.control.Button({
          html: '<i class="fa fa-undo" ></i>',
          title: 'назад...',
          handleClick: function() {
            undoInteraction.undo();
          }
        }),
        new ol.control.Button({
          html: '<i class="fa fa-repeat" ></i>',
          title: 'вперед...',
          handleClick: function() {
            undoInteraction.redo();
          }
        })
      ]
    });
    mainbar.addControl(bar);
    
    // Add a snap
    this.map.addInteraction(new ol.interaction.Snap({ 
      source: vector.getSource() 
    }));
    
    },
  };
})(jQuery, Drupal);

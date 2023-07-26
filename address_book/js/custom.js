(function ($, Drupal) {
  Drupal.behaviors.addressBookIntegration = {
    attach: function (context, settings) {
      // Leaflet map integration
      if (typeof L !== 'undefined') {
        var map = L.map('address-book-map').setView([0, 0], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        map.on('click', function (e) {
          var locationField = $('input[name="location[latlon]"]');
          locationField.val(e.latlng.lat + ',' + e.latlng.lng);
          Drupal.ajax({ url: '/address-book/update-address-field', submit: { triggering_element: locationField[0] } });
        });
      }

      // Search input
      $('.search-input', context).once('address-book-search').each(function () {
        var searchInput = $(this);

        searchInput.on('input', function () {
          var searchInputValue = searchInput.val();
          var url = '/address-book/search';

          $.ajax({
            url: url,
            success: function (response) {
              $('#address-book-table').html(response);

              Drupal.attachBehaviors(context, settings);
            }
          });
        });
      });
    }
  };
})(jQuery, Drupal);
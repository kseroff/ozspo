(function ($, Drupal) {
  Drupal.behaviors.addressBookSearch = {
    attach: function (context, settings) {
      $('.search-input', context).once('address-book-search').each(function () {
        var searchInput = $(this);

        searchInput.on('input', function () {
          var searchInputValue = searchInput.val();
          var url = '/address-book/search?q=' + encodeURIComponent(searchInputValue);

          $.ajax({
            url: url,
            dataType: 'json',
            success: function (response) {
              if (response.hasOwnProperty('table')) {
                $('#address-book-table').html(response.table);
              }
            }
          });
        });
      });
    }
  };
})(jQuery, Drupal);

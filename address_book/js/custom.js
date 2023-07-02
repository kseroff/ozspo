(function ($, Drupal) {
  Drupal.behaviors.addressBookSearch = {
    attach: function (context, settings) {
      $('.search-input', context).once('address-book-search').each(function () {
        var searchInput = $(this);

        searchInput.on('input', function () {
          var searchInputValue = searchInput.val();
          var url = '/address-book/search';
        
          $.ajax({
            url: url,
            success: function (response) {
              $('#address-book-table').html(response);
            }
          });
        });
      });
    }
  };
})(jQuery, Drupal);
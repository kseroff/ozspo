(function ($, Drupal) {
    Drupal.behaviors.addressBookSearch = {
      attach: function (context, settings) {
        $('.search-input', context).once('address-book-search').each(function () {
          var searchInput = $(this);
          var searchButton = searchInput.closest('form').find(':submit');
  
          searchInput.on('keyup', function () {
            searchButton.trigger('click');
          });
        });
      }
    };
  })(jQuery, Drupal);
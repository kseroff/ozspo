(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.addressBookSearch = {
    attach: function (context, settings) {
      $('#address-book-search-form', context).once('addressBookSearch').find('button[type="submit"]').click(function (e) {
        e.preventDefault();
        var searchTerm = $('#address-book-search-form', context).find('input[type="search"]').val();
        var url = Drupal.url('address-book/search-ajax', { query: { q: searchTerm } });

        $.ajax({
          url: url,
          dataType: 'json',
          success: function (response) {
            if (response && response.status === 'success') {
              $('#address-book-table').replaceWith(response.table);
            }
          },
          error: function (xhr, statusText, errorThrown) {
            alert('An error occurred while searching. Please try again.');
          }
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
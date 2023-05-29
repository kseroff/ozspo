(function ($, Drupal) {
  Drupal.behaviors.addressBookSearch = {
    attach: function (context, settings) {
      $('#address-book-search-form', context).once('addressBookSearch').ajaxForm({
        beforeSubmit: function (arr, $form, options) {
          options.dataType = 'json';
        },
        success: function (response, statusText, xhr, $form) {
          if (response && response[0] && response[0].command === 'insert') {
            var target = response[0].selector;
            var content = response[0].data;
            $(target, context).replaceWith(content);
            Drupal.attachBehaviors(context, Drupal.settings);
          }
        }
      });
    }
  };
})(jQuery, Drupal);
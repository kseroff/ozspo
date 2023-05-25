(function ($, Drupal) {
    Drupal.behaviors.addressBookSearch = {
      attach: function (context, settings) {
        $('#search-form', context).once('addressBookSearch').ajaxForm({
          beforeSubmit: function (arr, $form, options) {
            options.dataType = 'json';
          },
          success: function (response, statusText, xhr, $form) {
            if (response && response.command) {
              var command = response.command;
              if (command === 'insert' && response.method === 'replaceWith') {
                var target = response.selector;
                var content = response.data;
                $(target, context).replaceWith(content);
              }
            }
          }
        });
      }
    };
  })(jQuery, Drupal);
(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.customNotes = {
      attach: function (context, settings) {
        $(context).find('#custom-notes-container').once('custom-notes-init').each(function () {
          let addButton = '<button class="js-add-note">' + Drupal.t('Add Note') + '</button>';
          $(this).append(addButton);
  
          $(this).on('click', '.js-add-note', function (e) {
            e.preventDefault();
            let ajaxUrl = '/custom_notes/add';
            let ajaxOptions = {
              url: ajaxUrl,
              event: 'custom_notes_modal_display',
              dialogType: 'modal',
              dialogOptions: { width: 600 },
            };
            Drupal.ajax(ajaxOptions).execute();
          });
        });
      }
    };
  })(jQuery, Drupal, drupalSettings);
  
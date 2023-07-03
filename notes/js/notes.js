(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.notes = {
      attach: function (context, settings) {
        $('#edit-note', context).once('notes').each(function () {
          var $noteField = $(this);
          var $submitButton = $('input.form-submit');
          $submitButton.hide();
          $noteField.on('input', function () {
            if ($noteField.val() !== '') {
              $submitButton.show();
            } else {
              $submitButton.hide();
            }
          });
        });
  
        // Add AJAX functionality to the submit button.
        $('input.form-submit', context).once('notes').each(function () {
          var $submitButton = $(this);
          var $form = $submitButton.closest('form');
          var formId = $form.attr('id');
          var ajaxSettings = {
            url: $form.attr('action'),
            submit: {
              js: true,
            },
            progress: {
              type: 'throbber',
              message: Drupal.t('Saving...'),
            },
            wrapper: 'notes-list',
          };
  
          $submitButton.on('mousedown', function (event) {
            event.preventDefault();
            Drupal.ajax(formId, $form, ajaxSettings).execute();
          });
        });
      }
    };
  
    Drupal.ajax.prototype.commands.notesAddField = function (ajax, response, status) {
        if (status === 'success') {
          var $newNoteField = $('<textarea id="edit-note" name="note" rows="4" cols="60" class="form-textarea"></textarea>');
          var $submitButton = $('input.form-submit');
          $newNoteField.insertBefore($submitButton);
          $submitButton.hide();
          $newNoteField.on('input', function () {
            if ($newNoteField.val() !== '') {
              $submitButton.show();
            } else {
              $submitButton.hide();
            }
          });
        }
      };
  })(jQuery, Drupal, drupalSettings);
  
(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.notes = {
    attach: function (context, settings) {
      var $noteField = $('input[name="note"]', context).once('notes');
      var $submitButton = $('input.form-submit', context).once('notes');

      $noteField.on('input', function () {
        if ($noteField.val() !== '') {
          $submitButton.show();
        } else {
          $submitButton.hide();
        }
      });

      $('button[name="add_note"]').on('click', function (event) {
        event.preventDefault();
        var $form = $(this).closest('form');
        var formData = $form.serialize();
        $.ajax({
          url: $form.attr('action'),
          method: 'POST',
          data: formData,
          success: function (response) {
            var $noteField = $('<input type="text" name="note_wrapper[' + response.index + ']" class="form-text" required>');
            var $submitButton = $('input.form-submit');
            var $noteWrapper = $('<div id="note-wrapper-' + response.index + '"></div>');
            $noteWrapper.append($noteField);
            $noteWrapper.insertAfter('#note-wrapper-' + (response.index - 1));
            $submitButton.hide();
            $noteField.on('input', function () {
              if ($noteField.val() !== '') {
                $submitButton.show();
              } else {
                $submitButton.hide();
              }
            });
            $form.find('input[name="note_wrapper[' + response.index + ']"]').once('notes').val('');
            $form.find('input[name="add_note"]').once('notes').attr('disabled', true);
            Drupal.attachBehaviors($noteWrapper.get(0));
          },
          error: function (error) {
            console.log(error);
          }
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);

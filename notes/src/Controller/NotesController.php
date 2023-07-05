<?php

namespace Drupal\notes\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;

/**
 * Controller for the notes page.
 */
class NotesController extends ControllerBase {

  /**
   * Renders the notes page.
   */
 /**
 * Renders the notes page.
 */
public function notesPage() {
  $form = $this->formBuilder()->getForm('Drupal\notes\Form\NotesForm');

  $notes = \Drupal::entityTypeManager()
    ->getStorage('note')
    ->loadMultiple();

  $output['notes_form'] = $form;

  foreach ($notes as $note) {
    $output['note_' . $note->id()] = [
      '#type' => 'textfield',
      '#title' => $this->t('Note @id', ['@id' => $note->id()]),
      '#default_value' => $note->getTitle(),
      '#attributes' => [
        'readonly' => 'readonly',
        'class' => ['note-field', 'note-editable'], // Добавьте класс 'note-editable'
      ],
    ];
  }

  $output['#attached']['library'][] = 'core/drupal.ajax';

  return $output;
}

  /**
 * Deletes a note.
 *
 * @param int $note_id
 *   The ID of the note to delete.
 *
 * @return \Drupal\Core\Ajax\AjaxResponse
 *   The AJAX response.
 */
public function deleteNote($note_id) {
  $response = new AjaxResponse();

  $note = \Drupal::entityTypeManager()
    ->getStorage('note')
    ->load($note_id);

  if ($note) {
    $note->delete();
  }

  // Trigger an AJAX refresh of the notes form.
  $response->addCommand(new UpdateCommand('#notes-fields'));

  return $response;
}


}

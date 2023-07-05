<?php

namespace Drupal\notes\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;

/**
 * Provides a form for adding and editing notes.
 */
class NotesForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'notes_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['note'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Note'),
      '#required' => TRUE,
    ];
  
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      '#ajax' => [
        'callback' => '::ajaxSubmitForm',
        'wrapper' => 'notes-fields',
      ],
    ];
  
    $notes = \Drupal::entityTypeManager()
      ->getStorage('note')
      ->loadMultiple();
  
    $form['notes'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'notes-container',
      ],
    ];
  
    foreach ($notes as $note) {
      if (!empty($note->getTitle())) {
        $form['notes'][$note->id()] = [
          '#type' => 'container',
          '#attributes' => [
            'class' => ['note-wrapper'],
          ],
        ];
    
        $form['notes'][$note->id()]['note'] = [
          '#type' => 'textfield', // Измените тип поля на textfield
          '#title' => $this->t('Note @id', ['@id' => $note->id()]),
          '#default_value' => $note->getTitle(),
          '#attributes' => [
            'class' => ['note-field', 'note-editable'], // Добавьте класс 'note-editable'
          ],
        ];
    
        $form['notes'][$note->id()]['delete'] = [
          '#type' => 'submit',
          '#value' => $this->t('Delete'),
          '#name' => 'delete-note-' . $note->id(),
          '#attributes' => [
            'class' => ['delete-note'],
            'data-note-id' => $note->id(),
          ],
          '#ajax' => [
            'callback' => '::ajaxDeleteNote',
            'wrapper' => 'notes-fields',
          ],
          '#submit' => ['::deleteNoteSubmit'],
        ];
      }
    }
    
  
    $form['#attached']['library'][] = 'notes/notes';
  
    $form['#prefix'] = '<div id="notes-fields">';
    $form['#suffix'] = '</div>';
  
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $note = $form_state->getValue('note');
    if (!empty($note)) {
      $this->saveNoteToDatabase($note);
    }
    $form_state->setRebuild();
  }
  /**
 * Form submission handler for note deletion.
 */
public function deleteNoteSubmit(array &$form, FormStateInterface $form_state) {
  $triggering_element = $form_state->getTriggeringElement();
  $note_id = substr($triggering_element['#name'], strlen('delete-note-'));

  $note = \Drupal::entityTypeManager()
    ->getStorage('note')
    ->load($note_id);

  if ($note) {
    $note->delete();
  }

  $form_state->setRebuild();
}
 /**
 * AJAX callback to add a new note field.
 */
public function ajaxSubmitForm(array &$form, FormStateInterface $form_state) {
  $response = new AjaxResponse();
  $note_field = $form['note'];
  $note_field['#value'] = '';
  $response->addCommand(new ReplaceCommand('#edit-note', $note_field));

  $notes = \Drupal::entityTypeManager()
    ->getStorage('note')
    ->loadMultiple();

  foreach ($notes as $note) {
    if (!empty($note->getTitle())) {
      $note_value = $note->getTitle();
      $response->addCommand(new ReplaceCommand('#note_' . $note->id(), $note_value));
    } else {
      $response->addCommand(new ReplaceCommand('#note_' . $note->id(), ''));
    }
  }


  return $response;
}
/**
 * AJAX callback for note deletion.
 */
public function ajaxDeleteNote(array &$form, FormStateInterface $form_state) {
  $response = new AjaxResponse();

  $notes = \Drupal::entityTypeManager()
    ->getStorage('note')
    ->loadMultiple();

  foreach ($notes as $note) {
    if (!empty($note->getTitle())) {
      $note_value = $note->getTitle();
      $response->addCommand(new ReplaceCommand('#note_' . $note->id(), $note_value));
    } else {
      $response->addCommand(new ReplaceCommand('#note_' . $note->id(), ''));
    }
  }

  return $response;
}

  /**
   * Save the note to the database.
   *
   * @param string $note
   *   The note to save.
   */
  protected function saveNoteToDatabase($note) {
    $uuid = \Drupal::service('uuid')->generate();
    $note_entity = \Drupal::entityTypeManager()
      ->getStorage('note')
      ->create([
        'uuid' => $uuid,
        'title' => $note,
      ]);
    $note_entity->save();
  }

}

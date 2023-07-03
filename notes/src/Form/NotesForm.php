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
        'wrapper' => 'notes-list',
      ],
    ];

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
   * AJAX callback to add a new note field.
   */
  public function ajaxSubmitForm(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    $note_field = $form['note'];
    $note_field['#value'] = '';
    $response->addCommand(new ReplaceCommand('#edit-note-wrapper', $note_field));
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

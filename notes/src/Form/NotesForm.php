<?php

namespace Drupal\notes\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Ajax\AppendCommand;

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
    $form['note_wrapper'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'note-wrapper',
      ],
    ];

    $notes = $form_state->get('notes') ?? [];

    foreach ($notes as $key => $note) {
      $form['note_wrapper'][$key] = [
        '#type' => 'textfield',
        '#title' => $this->t('Note'),
        '#default_value' => $note,
        '#required' => TRUE,
        '#attributes' => [
          'readonly' => 'readonly',
        ],
      ];
    }

    $form['actions'] = [
      '#type' => 'actions',
    ];

    $form['actions']['add_note'] = [
      '#type' => 'button',
      '#value' => $this->t('Add Note'),
      '#ajax' => [
        'callback' => '::addNoteAjaxCallback',
        'wrapper' => 'note-wrapper',
      ],
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $notes = $form_state->getValue('notes') ?? [];
    $note = $form_state->getValue('note');
    if (!empty($note)) {
      $notes[] = $note;
    }
    $form_state->set('notes', $notes);
    $form_state->setRebuild();
  }

  /**
   * AJAX callback to add a new note field.
   */
  public function addNoteAjaxCallback(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();

    $form['note_wrapper'][] = [
      '#type' => 'textfield',
      '#title' => $this->t('Note'),
      '#required' => TRUE,
      '#attributes' => [
        'readonly' => 'readonly',
      ],
    ];

    $response->addCommand(new ReplaceCommand('#note-wrapper', $form['note_wrapper']));
    return $response;
  }

}

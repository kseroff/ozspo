<?php

namespace Drupal\notes\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Ajax\AppendCommand;
use Drupal\Component\Uuid\Uuid;
use Drupal\notes\Entity\Note;
use Drupal\Core\Ajax\AfterCommand;
use Drupal\Core\Ajax\InvokeCommand;

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
  
    // Load existing notes from the database.
    $notes = \Drupal::entityTypeManager()
      ->getStorage('note')
      ->loadMultiple();
  
    // Initialize an array to store note values for rendering the form.
    $note_values = [];
  
    foreach ($notes as $index => $note) {
      $note_values[$index] = $note->getTitle();
      $form['note_wrapper'][$index] = [
        '#type' => 'textfield',
        '#title' => $this->t('Note'),
        '#required' => TRUE,
        '#default_value' => $note->getTitle(),
      ];
    }
  
    $form_state->set('note_values', $note_values);
  
    $form['add_note'] = [
      '#type' => 'button',
      '#value' => $this->t('Добавить'),
      '#attributes' => [
        'name' => 'add_note',
      ],
      '#ajax' => [
        'callback' => '::addNoteAjaxCallback',
        'wrapper' => 'note-wrapper',
      ],
    ];
  
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Сохранить'),
      '#ajax' => [
        'callback' => '::submitFormAjaxCallback',
        'wrapper' => 'note-wrapper',
      ],
    ];
    
  
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $note_values = $form_state->get('note_values') ?? [];
    $note_wrapper_values = $form_state->getValue('note_wrapper');
    
    foreach ($note_wrapper_values as $index => $note_wrapper_value) {
      if (isset($note_values[$index])) {
        $note = \Drupal::entityTypeManager()
          ->getStorage('note')
          ->load($index);
      } else {
        $note = \Drupal::entityTypeManager()
          ->getStorage('note')
          ->create([]);
      }
  
      if (!$note->hasField('uuid') || $note->get('uuid')->isEmpty()) {
        $note->set('uuid', Uuid::uuid());
      }
  
      $note->set('title', $note_wrapper_value);
      $note->save();
    }
  
    $form_state->setRebuild();
  }
  
  

  /**
   * AJAX callback to add a new note field.
   */
  public function addNoteAjaxCallback(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    
    $note_wrapper = &$form['note_wrapper'];
    $note_wrapper_count = count($note_wrapper);
    
    $index = $note_wrapper_count;
    
    $note_wrapper[$index] = [
      '#type' => 'textfield',
      '#title' => $this->t('Note'),
      '#required' => TRUE,
      '#prefix' => '<div id="note-wrapper-' . $index . '">',
      '#suffix' => '</div>',
    ];
    
    $response->addCommand(new AppendCommand('#note-wrapper', $note_wrapper[$index]));
    
    return $response;
  }

  public function submitFormAjaxCallback(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
  
    $note_values = $form_state->get('note_values') ?? [];
    $note_wrapper_values = $form_state->getValue('note_wrapper');
  
    // Save the updated note values.
    foreach ($note_values as $index => $note_value) {
      $note = \Drupal::entityTypeManager()
        ->getStorage('note')
        ->load($index);
  
      // Generate a new UUID.
      $uuid = \Drupal::service('uuid')->generate();
  
      // Set the UUID, title, and save the note.
      $note->set('uuid', $uuid);
      $note->set('title', $note_wrapper_values[$index]);
      $note->save();
    }
  
    // Rebuild the form to reflect the updated note values.
    $form_state->setRebuild();
  
    // Return the updated form.
    $form = $this->formBuilder()->getForm('Drupal\notes\Form\NotesForm');
    $response->addCommand(new ReplaceCommand('#note-wrapper', $form['note_wrapper']));
  
    return $response;
  }

}

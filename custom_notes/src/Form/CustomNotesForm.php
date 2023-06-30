<?php

namespace Drupal\custom_notes\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class CustomNotesForm extends FormBase {

  public function getFormId() {
    return 'custom_notes_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['note'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Note'),
      '#required' => TRUE,
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      '#ajax' => [
        'callback' => '::submitFormAjax',
        'event' => 'click',
        'wrapper' => 'custom-notes-container',
      ],
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $note = $form_state->getValue('note');
    // Здесь вы можете обработать сохранение заметки.
    drupal_set_message($this->t('Note saved: @note', ['@note' => $note]));
    $form_state->setRebuild();
  }

public function submitFormAjax(array &$form, FormStateInterface $form_state) {
  $response = new \Drupal\Core\Ajax\AjaxResponse();
  $response->addCommand(new \Drupal\Core\Ajax\OpenModalDialogCommand($this->t('Note saved'), '', ['width' => '700']));
  return $response;
}

}
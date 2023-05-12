<?php
namespace Drupal\my_notes\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the note entity edit forms.
 */
class NoteForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);

    $form['body']['#type'] = 'text_format';
    $form['body']['#format'] = 'full_html';

    return $form;
  }

}
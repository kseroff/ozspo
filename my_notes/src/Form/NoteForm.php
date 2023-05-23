<?php

namespace Drupal\my_notes\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the note edit form.
 *
 * @ingroup my_notes
 */
class NoteForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);

    // Add custom form elements here, if needed.

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = $this->getEntity();
    $entity->set('author', \Drupal::currentUser()->id());
    $entity->save();

    drupal_set_message($this->t('The note has been saved.'));
    $form_state->setRedirect('entity.note.canonical', ['note' => $entity->id()]);
  }

}
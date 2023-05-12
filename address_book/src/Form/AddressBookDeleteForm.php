<?php
namespace Drupal\address_book\Form;

use Drupal\Core\Entity\ContentEntityConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
/*
class AddressBookDeleteForm extends ContentEntityConfirmFormBase {

  public function getCancelURL() {
    return new Url('address_book.list');
  }

  public function getQuestion() {
    return $this->t('Do you want to delete the contact %name?', ['%name' => $this->entity->get('field_full_name')->value]);
  }

  public function getDescription() {
    return $this->t('This action cannot be undone.');
  }

  public function getConfirmText() {
    return $this->t('Delete');
  }

  public function getEntityTypeId() {
    return 'address_book';
  }

  public function getFormId() {
    return 'address_book.delete_form';
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $entity = $this->entity;
    $entity->delete();

    drupal_set_message($this->t('Contact has been deleted.'));
    
    //список контактов перенаправил. наверно
    $form_state->setRedirect('address_book.list');
  }

}
 */
<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\address_book\Entity\AddressBook;

class AddressBookFormEdit extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'address_book_form_edit';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $id = NULL) {
    $contact = AddressBook::load($id);

    if (!$contact) {
      return $form;
    }

    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Full Name'),
      '#required' => TRUE,
      '#default_value' => $contact->get('field_full_name')->value,
    ];
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone Number'),
      '#default_value' => $contact->get('field_phone_number')->value,
    ];
    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Job Title'),
      '#required' => TRUE,
      '#default_value' => $contact->get('field_job_title')->value,
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];

    $form_state->set('contact_id', $id);

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    // Validate form elements here
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $id = $form_state->get('contact_id');
    $contact = AddressBook::load($id);

    if (!$contact) {
      return;
    }

    $name = $form_state->getValue('name');
    $phone = $form_state->getValue('phone');
    $position = $form_state->getValue('position');

    $contact->set('field_full_name', $name);
    $contact->set('field_phone_number', $phone);
    $contact->set('field_job_title', $position);
    $contact->save();

    $form_state->setRedirect('address_book.list');
  }

}
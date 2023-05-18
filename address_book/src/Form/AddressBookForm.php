<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\address_book\Entity\AddressBook;

class AddressBookForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'address_book_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Add form elements here
    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Full Name'),
      '#required' => TRUE,
    ];
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone Number'),
    ];
    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Job Title'),
      '#required' => TRUE,
    ];

    // Add a save button
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];

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
    // Save form elements here
    $name = $form_state->getValue('name');
    $phone = $form_state->getValue('phone');
    $position = $form_state->getValue('position');

    $entity = AddressBook::create([
      'field_full_name' => $name,
      'field_phone_number' => $phone,
      'field_job_title' => $position,
    ]);
    $entity->save();

    $form_state->setRedirectUrl(Url::fromRoute('address_book.list'));
  }

}
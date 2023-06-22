<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\address_book\Entity\AddressBook;

class AddressBookFormEdit extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'address_book_edit_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $id = NULL) {

    $entity = AddressBook::load($id);

    if (!$entity) {

      $form['error'] = [
        '#markup' => $this->t('The specified address book entry does not exist.'),
      ];
      return $form;
    }


    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Full Name'),
      '#default_value' => $entity->get('field_full_name')->value,
      '#required' => TRUE,
    ];
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone Number'),
      '#default_value' => $entity->get('field_phone_number')->value,
    ];
    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Job Title'),
      '#default_value' => $entity->get('field_job_title')->value,
      '#required' => TRUE,
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];


    $form['id'] = [
      '#type' => 'hidden',
      '#value' => $id,
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

    $id = $form_state->getValue('id');
    $entity = AddressBook::load($id);

    if (!$entity) {

      $form_state->setError($form, $this->t('The specified address book entry does not exist.'));
      return;
    }

    $entity->set('field_full_name', $form_state->getValue('name'));
    $entity->set('field_phone_number', $form_state->getValue('phone'));
    $entity->set('field_job_title', $form_state->getValue('position'));
    $entity->save();

    $form_state->setRedirectUrl(Url::fromRoute('address_book.list'));
  }

}
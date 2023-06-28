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

    $form['id'] = [
      '#type' => 'value',
      '#value' => $id,
    ];

    $form['author'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Author'),
      '#target_type' => 'user',
      '#default_value' => $entity->get('field_author')->target_id,
      '#required' => TRUE,
    ];

    $form['created_date'] = [
      '#type' => 'item',
      '#title' => $this->t('Created date'),
      '#markup' => \Drupal::service('date.formatter')->format($entity->get('field_created_date')->value),
    ];

    $form['modified_date'] = [
      '#type' => 'item',
      '#title' => $this->t('Modified date'),
      '#markup' => \Drupal::service('date.formatter')->format(\Drupal::time()->getRequestTime()),
    ];

    $form['department'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Department'),
      '#target_type' => 'taxonomy_term',
      '#default_value' => $entity->get('field_department')->target_id,
      '#required' => TRUE,
    ];

    $form['personal'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Personal'),
      '#default_value' => $entity->get('field_personal')->value,
    ];

    $form['address'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Address'),
      '#default_value' => $entity->get('field_address')->value,
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

    $id = $form_state->getValue('id');
    $entity = AddressBook::load($id);

    if (!$entity) {
      $form_state->setError($form, $this->t('The specified address book entry does not exist.'));
      return;
    }

    $entity->set('field_full_name', $form_state->getValue('name'));
    $entity->set('field_phone_number', $form_state->getValue('phone'));
    $entity->set('field_job_title', $form_state->getValue('position'));
    $entity->set('field_author', $form_state->getValue('author'));
    $entity->set('field_modified_date', $form_state->getValue('modified_date'));
    $entity->set('field_department', $form_state->getValue('department'));
    $entity->set('field_personal', $form_state->getValue('personal'));
    $entity->set('field_address', $form_state->getValue('address'));
    $entity->save();

    $form_state->setRedirectUrl(Url::fromRoute('address_book.list'));
  }

}

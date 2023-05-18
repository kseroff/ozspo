<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\Routing\Route;

class AddressBookFormEdit extends FormBase {

  /**
   * Returns the form ID for this form.
   */
  public function getFormId() {
    return 'address_book_edit_form';
  }

  /**
   * Returns the title of the form.
   */
  public function getTitle() {
    return $this->t('Edit Contact');
  }

  /**
   * Returns the entity ID for this address book entry.
   */
  protected function getEntityId() {
    $route_match = \Drupal::service('current_route_match');
    $id = $route_match->getParameter('contact');
    return $id;
  }

  /**
   * Returns the entity for this address book entry.
   */
  protected function getEntity() {
    $id = $this->getEntityId();
    $storage = \Drupal::entityTypeManager()->getStorage('address_book');
    $entity = $storage->load($id);
    return $entity;
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Add form elements here
    $entity = $this->getEntity();
    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Name'),
      '#required' => TRUE,
      '#default_value' => $entity->get('field_full_name')->value,
    ];
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone'),
      '#default_value' => $entity->get('field_phone_number')->value,
    ];
    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Position'),
      '#required' => TRUE,
      '#default_value' => $entity->get('field_job_title')->value,
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
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $entity_id = $this->getEntityId();
    $name = $form_state->getValue('name');
    $phone = $form_state->getValue('phone');
    $position = $form_state->getValue('position');

    $entity = \Drupal::entityTypeManager()->getStorage('address_book')->load($entity_id);
    if ($entity) {
      $entity->set('field_full_name', $name);
      $entity->set('field_phone_number', $phone);
      $entity->set('field_job_title', $position);
      $entity->save();
    }

    $form_state->setRedirect('address_book.list');
  }

}
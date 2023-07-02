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

  public function buildForm(array $form, FormStateInterface $form_state, $id = NULL) {

    $entity = AddressBook::load($id);

    if (!$entity) {

      $form['error'] = [
        '#markup' => $this->t('Указанная запись в адресной книге не существует.'),
      ];
      return $form;
    }

    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Полное имя'),
      '#default_value' => $entity->get('field_full_name')->value,
      '#required' => TRUE,
    ];
    
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Номер телефона'),
      '#default_value' => $entity->get('field_phone_number')->value,
    ];
    
    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Должность'),
      '#default_value' => $entity->get('field_job_title')->value,
      '#required' => TRUE,
    ];
    
    $department_id = $entity->get('field_department')->target_id;
    $department_term = \Drupal\taxonomy\Entity\Term::load($department_id);
    $department_default_value = !empty($department_term) ? $department_term : NULL;
    
    $form['department'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Подраздиление'),
      '#target_type' => 'taxonomy_term',
      '#default_value' => $department_default_value,
      '#required' => TRUE,
    ];

    $form['personal'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Личный'),
      '#default_value' => $entity->get('field_personal')->value,
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Сохранить'),
    ];


    $form['id'] = [
      '#type' => 'hidden',
      '#value' => $id,
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {

    $id = $form_state->getValue('id');
    $entity = AddressBook::load($id);

    if (!$entity) {
      $form_state->setError($form, $this->t('Указанная запись в адресной книге не существует.'));
      return;
    }

    $entity->set('field_full_name', $form_state->getValue('name'));
    $entity->set('field_phone_number', $form_state->getValue('phone'));
    $entity->set('field_job_title', $form_state->getValue('position'));
    $entity->set('field_department', $form_state->getValue('department'));
    $entity->set('field_address', $form_state->getValue('address'));
    $entity->set('field_personal', $form_state->getValue('personal'));
    $entity->save();

    $form_state->setRedirectUrl(Url::fromRoute('address_book.list'));
  }

}
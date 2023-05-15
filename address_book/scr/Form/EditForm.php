<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

use Drupal\address_book\Entity\AddressBook;

class EditForm extends FormBase {

  public function getFormId() {
    return "address_book_edit_form";
  }

  public function buildForm(array $form, FormStateInterface $form_state, $id = NULL) {
    $entity = AddressBook::load($id);
    if (!$entity) {
      drupal_set_message(t('Запись не найдена.'), 'error');
      $form_state->setRedirect('address_book.list');
    }

    $form['fio'] = [
      '#type' => 'textfield',
      '#required' => TRUE,
      '#title' => $this->t('ФИО'),
      '#default_value' => $entity->get('fio')->value,
    ];
    
    $form['phones'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Телефоны'),
      '#default_value' => $entity->get('phones')->value,
    ];
    
    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Должность'),
      '#default_value' => $entity->get('position')->value,
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Сохранить'),
    ];

    $form['#id'] = 'address-book-edit-form';
    $form['#entity'] = $entity;

    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
    $phones = $form_state->getValue('phones');
    if (!empty($phones)) {
      $valid_phones = preg_match('/^\+[\d\- ]+$/m', $phones);
      if (!$valid_phones) {
        $form_state->setErrorByName('phones', $this->t('Неверный формат телефонов.'));
      }
    }
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $entity = $form['#entity'];
    $entity->set('fio', $form_state->getValue('fio'));
    $entity->set('phones', $form_state->getValue('phones'));
    $entity->set('position', $form_state->getValue('position'));
    $entity->set('changed', REQUEST_TIME);
    $entity->save();

    drupal_set_message(t('Запись была изменена.'));
    $form_state->setRedirect('address_book.list');
}
}
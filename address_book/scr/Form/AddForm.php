<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\Form;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

use Drupal\address_book\Entity\AddressBook;

class AddForm extends FormBase {

  public function getFormId() {
    return 'address_book_add_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['fio'] = [
      '#type' => 'textfield',
      '#required' => TRUE,
      '#title' => $this->t('ФИО'),
    ];

    $form['phones'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Телефоны'),
    ];

    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Должность'),
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Сохранить'),
    ];

    return $form;
  }

  /*
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $phones = $form_state->getValue('phones');
    if (!empty($phones)) {
      $valid_phones = preg_match('/^\+[\d\- ]+$/m', $phones);
      if (!$valid_phones) {
        $form_state->setErrorByName('phones', $this->t('Неверный формат телефонов.'));
      }
    }
  }
*/

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $fio = $form_state->getValue('fio');
    $phones = $form_state->getValue('phones');
    $position = $form_state->getValue('position');

    $entity = AddressBook::create([
      'fio' => $fio,
      'phones' => $phones,
      'position' => $position,
    ]);
    $entity->save();
    
    //drupal_set_message(t('Запись была добавлена.'));
    
    $this->messenger()->addMessage($this->t('Запись была добавлена.'));
    
    $form_state->setRedirect('address_book.list');
  }
}
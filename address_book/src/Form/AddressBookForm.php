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

  public function buildForm(array $form, FormStateInterface $form_state) {

    //$entity = \Drupal::entityTypeManager()->getStorage('address_book')->create();
  
    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Полное имя'),
      '#required' => TRUE,
    ];
  
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Номер телефона'),
    ];
  
    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Должность'),
      '#required' => TRUE,
    ];
  
    $authorId = \Drupal::currentUser()->id();
    $author = \Drupal\user\Entity\User::load($authorId);
    
    $form['author'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Автор'),
      '#target_type' => 'user',
      '#default_value' => $author,
      '#required' => TRUE,
      '#disabled' => TRUE,
    ];
    
    $form['created_date'] = [
      '#type' => 'item',
      '#title' => $this->t('Дата создания'),
      '#markup' => \Drupal::service('date.formatter')->format(\Drupal::time()->getRequestTime()),
    ];
  
    $form['department'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Подразделение'),
      '#target_type' => 'taxonomy_term',
      //'#required' => TRUE,
    ];
  
    $form['personal'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Личный'),
      '#default_value' => FALSE,
    ];
  
    $form['address'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Адрес'),
    ];
  
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Сохранить'),
    ];
  
    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $name = $form_state->getValue('name');
    $phone = $form_state->getValue('phone');
    $position = $form_state->getValue('position');
    $authorId = $form_state->getValue('author');
    $author = \Drupal\user\Entity\User::load($authorId);
    $department = $form_state->getValue('department');
    $personal = $form_state->getValue('personal');
    $address = $form_state->getValue('address');
  
    $entity = AddressBook::create([
      'field_full_name' => $name,
      'field_phone_number' => $phone,
      'field_job_title' => $position,
      'field_author' => $author,
      'field_department' => $department,
      'field_personal' => $personal,
      'field_address' => $address,
    ]);
  
    $entity->save();
  
    $form_state->setRedirectUrl(Url::fromRoute('address_book.list'));
  }

}

<?php
namespace Drupal\address_book\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Form\FormStateInterface;

class AddressBookForm extends EntityForm {

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    $entity = $this->entity;
    
    $form['full_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Full Name'),
      '#required' => TRUE,
      '#default_value' => $entity->get('field_full_name')->value,
    ];
    
    $form['phone_number'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone Number'),
      '#default_value' => $entity->get('field_phone_number')->value,
    ];
    
    $form['job_title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Job Title'),
      '#default_value' => $entity->get('field_job_title')->value,
    ];

    //пользовательские поля сущностей
    
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];
    
    return $form;
  }

  public function save(array $form, FormStateInterface $form_state) {
    $entity = $this->entity;
    $entity->set('field_full_name', $form_state->getValue('full_name'));
    $entity->set('field_phone_number', $form_state->getValue('phone_number'));
    $entity->set('field_job_title', $form_state->getValue('job_title'));

    // сохранил для сущностей
    
    $entity->save();
    
    drupal_set_message($this->t('Contact has been saved.'));
    
    $form_state->setRedirect('address_book.list');
  }

}
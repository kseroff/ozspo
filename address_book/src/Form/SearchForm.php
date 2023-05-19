<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class SearchForm extends FormBase {

  public function getFormId() {
    return 'address_book_search_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['last_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Last Name'),
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Search'),
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $last_name = $form_state->getValue('last_name');
    $form_state->setRedirect('address_book.search', ['last_name' => $last_name]);
  }

}
<?php

namespace Drupal\mapmodule\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class CoordinateForm extends FormBase {

  public function getFormId() {
    return 'mapmodule_coordinate_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['coordinates'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Coordinates'),
      '#description' => $this->t('...............'),
    ];

    // Добавлю другие элементы формы

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    
  }

}
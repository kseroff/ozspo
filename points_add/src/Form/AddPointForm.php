<?php

namespace Drupal\points_add\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\openlayers_gis\Entity\PointEntity;

class AddPointForm extends FormBase {

  public function getFormId() {
    return 'points_add_add_point_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['latitude'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Latitude'),
      '#required' => TRUE,
    ];

    $form['longitude'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Longitude'),
      '#required' => TRUE,
    ];

    $form['info'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Info'),
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Add Point'),
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();

    // Создание новой сущности PointEntity
    $point = PointEntity::create([
      'latitude' => $values['latitude'],
      'longitude' => $values['longitude'],
      'info' => $values['info'],
    ]);
    $point->save();

    drupal_set_message($this->t('Point added successfully.'));
  }

}

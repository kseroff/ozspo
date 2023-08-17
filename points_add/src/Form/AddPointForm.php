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
    $form['map'] = [
      '#markup' => '<div id="map" style="height: 400px;"></div>',
      '#attached' => [
        'library' => 
        [
          'openlayers_gis/ol',
          'openlayers_gis/openlayers_gis',
          'points_add/points_add'
        ],
      ],
    ];

    $form['latitude'] = [
      '#type' => 'hidden',
      '#attributes' => ['id' => 'latitude'],
    ];

    $form['longitude'] = [
      '#type' => 'hidden',
      '#attributes' => ['id' => 'longitude'],
    ];

    $form['info'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Инфо'),
    ];

    $form['submit'] = [
      '#type' => 'button',
      '#value' => $this->t('Сохранить'),
      '#ajax' => [
        'callback' => '::addPointCallback',
        'event' => 'click',
      ],
      '#attributes' => ['class' => ['use-ajax']],
    ];

    return $form;
  }

  public function addPointCallback(array &$form, FormStateInterface $form_state) {
    $latitude = $form_state->getValue('latitude');
    $longitude = $form_state->getValue('longitude');
    $info = $form_state->getValue('info');

    $point = PointEntity::create([
      'latitude' => $latitude,
      'longitude' => $longitude,
      'info' => $info,
    ]);
    $point->save();

    drupal_set_message($this->t('Точка добавлена успешно.'));

    $form_state->setValue('latitude', '');
    $form_state->setValue('longitude', '');
    $form_state->setValue('info', '');

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {

  }

}

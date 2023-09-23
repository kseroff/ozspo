<?php

namespace Drupal\gis_points_add\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\gis_openlayers\Entity\PointEntity;
use Drupal\file\Entity\File;

class AddPointForm extends FormBase {

  public function getFormId() {
    return 'points_add_add_point_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['latitude'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Широта'),
      '#default_value' => '',
      '#attributes' => [
        'id' => 'latitude',
      ],
    ];
  
    $form['longitude'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Долгота'),
      '#default_value' => '',
      '#attributes' => [
        'id' => 'longitude',
      ],
    ];

    $form['map'] = [
      '#markup' => '<div id="map" style="height: 400px;"></div>',
      '#attached' => [
        'library' => 
        [
          'gis_openlayers/gis_openlayers',
          'gis_points_add/gis_points_add'
        ],
      ],
    ];

    $form['info'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Инфо'),
    ];

    $form['marker'] = [
      '#type' => 'select',
      '#title' => t('Выберите маркер'),
      '#options' => $this->getMarkerOptions(),
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

    $form['#attached']['drupalSettings']['gis_points_add']['mapInitialized'] = FALSE;

    return $form;
  }

  public function addPointCallback(array &$form, FormStateInterface $form_state) {
    $latitude = $form_state->getValue('latitude');
    $longitude = $form_state->getValue('longitude');
    $marker = $form_state->getValue('marker');
    $info = $form_state->getValue('info');
  
    $point = PointEntity::create([
      'latitude' => $latitude,
      'longitude' => $longitude,
      'marker' => $marker, 
      'info' => $info,
    ]);
    $point->save();
  
    drupal_set_message($this->t('Точка добавлена успешно.'));
  
    $form_state->setValue('latitude', '');
    $form_state->setValue('longitude', '');
    $form_state->setValue('marker', ''); 
    $form_state->setValue('info', '');
  
    return $form;
  }

  protected function getMarkerOptions() {
    $options = [
      'default' => 'Стандарт',
    ];
  
    $module_path = drupal_get_path('module', 'gis_points_add');
    $marker_dir = $module_path . '/image';
  
    if (file_exists($marker_dir) && is_dir($marker_dir)) {
      $files = scandir($marker_dir);
      foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'svg') {
          $options[$file] = $file;
        }
      }
    }
  
    return $options;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {

  }

}

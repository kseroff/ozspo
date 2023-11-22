<?php

namespace Drupal\gis_openlayers\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Ajax\InvokeCommand;

class AddPointForm extends FormBase {

  public function getFormId() {
    return 'layer_add_point_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['#attached']['library'][] = 'gis_openlayers/openlayers';
    $form['#attached']['library'][] = 'gis_openlayers/gis_layer_add';

    $form['map'] = [
      '#markup' => '<div id="map"></div>',
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

  }

  public function submitForm(array &$form, FormStateInterface $form_state) {

  }

}
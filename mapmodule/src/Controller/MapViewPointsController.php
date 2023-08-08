<?php

namespace Drupal\mapmodule\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class MapController extends ControllerBase {

  public function viewPoints() {
    //получение точек, которые будут отображаться на карт
    $points = [
      [
        'latitude' => 51.5074,
        'longitude' => -0.1278,
        'name' => 'London',
      ],
      [
        'latitude' => 40.7128,
        'longitude' => -74.0060,
        'name' => 'New York',
      ],
    ];

    // точки в шаблон 
    $build = [
      '#theme' => 'mapmodule_view_points',
      '#points' => $points,
    ];

    return $build;
  }

  /**
   * AJAX callback for viewing a specific point.
   *
   * @param int $point_id
   *   The ID of the point.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   JSON response containing the point details.
   */
  public function ajaxViewPoint($point_id) {

    $point = [
      'latitude' => 51.5074,
      'longitude' => -0.1278,
      'name' => 'London',
      'description' => 'London is the capital of England.',
    ];

    return new JsonResponse($point);
  }

  /**
   * Callback for rendering the layer block.
   */
  public function layerBlock() {
    
    $layers = [
      'layer1',
      'layer2',
    ];

    $build = [
      '#theme' => 'mapmodule_layer_block',
      '#layers' => $layers,
    ];

    return $build;
  }

}
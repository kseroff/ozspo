<?php

namespace Drupal\openlayers_gis\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\openlayers_gis\Entity\PointEntity;

class OpenLayersGisController extends ControllerBase {

  public function mapPage(Request $request) {
    $output = '<div id="openlayers-gis-map" class="map"></div>';
  
    return [
      '#markup' => $output,
      '#attached' => [
        'library' => [
          'ljs/ljs_init_lib',
          'openlayers_gis/openlayers_gis',
        ],
        'drupalSettings' => [
          'openlayers_gis' => [
            'points' => $this->getPointsData($request), 
          ],
        ],
      ],
    ];
  }

  public function getPointsData(Request $request) {
    $bbox = $request->query->get('bbox');
    $data = [];

    $points = \Drupal::entityTypeManager()->getStorage('point_entity')->loadMultiple();  
    
    foreach ($points as $point) {
      $data[] = [
        'id' => $point->id(),
        'latitude' => $point->get('latitude')->value,
        'longitude' => $point->get('longitude')->value,
        'info' => $point->get('info')->value,
      ];
    }

/*
    $data = [];
    for ($i = 1; $i <= 10000; $i++) {
      $latitude = rand(50, 54) + rand(0, 99999) / 100000;
      $longitude = rand(41, 46) + rand(0, 99999) / 100000;
      $data[] = [
        'id' => $i,
        'latitude' => $latitude,
        'longitude' => $longitude,
        'info' => 'Test Point ' . $i,
      ];
    }
  */

    return new JsonResponse($data);
  }

}

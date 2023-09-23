<?php

namespace Drupal\gis_openlayers\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\gis_openlayers\Entity\PointEntity;

class OpenLayersGisController extends ControllerBase {

  public function mapPage(Request $request) {
    $output = '<div id="openlayers-gis-map" class="map"></div>';
  
    return [
      '#markup' => $output,
      '#attached' => [
        'library' => [
          'ljs/ljs_init_lib',
          'gis_openlayers/gis_openlayers',
        ],
        'drupalSettings' => [
          'gis_openlayers' => [
            'points' => $this->getPointsData($request),
          ],
        ],
      ],
    ];
  }

  public function getPointsData(Request $request) {
    $data = [];

    $points = \Drupal::entityTypeManager()
    ->getStorage('point_entity')
    ->loadMultiple();
    foreach ($points as $point) {
      $data[] = [
        'id' => $point->id(),
        'latitude' => $point->get('latitude')->value,
        'longitude' => $point->get('longitude')->value,
        'info' => $point->get('info')->value,
      ];
    }

    return new JsonResponse($data);
  }
}

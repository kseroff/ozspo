<?php

namespace Drupal\openlayers_gis\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\openlayers_gis\Entity\PointEntity;

class OpenLayersGisController extends ControllerBase {

  public function mapPage(Request $request) {
    $output = '<div id="openlayers-gis-map" class="map"></div>';
    $output .= '<div id="openlayers-gis-popup" class="popup"></div>';
  
    return [
      '#markup' => $output,
      '#attached' => [
        'library' => ['openlayers_gis/ol', 'openlayers_gis/openlayers_gis'],
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
    
    return new JsonResponse($data);
  }

}

<?php

namespace Drupal\openlayers_gis\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

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

    $data = [
      [
        'id' => 1,
        'latitude' => 53.1959,
        'longitude' => 45.0174,
        'info' => 'Новая точка',
      ],
    ];
    return new JsonResponse($data);
  }

}

<?php

namespace Drupal\openlayers_gis\Controller;

use Drupal\Core\Controller\ControllerBase;

class OpenLayersGisController extends ControllerBase {

  public function mapPage() {
    $output = '<div id="openlayers-gis-map" class="map"></div>';
    $output .= '<div id="openlayers-gis-popup" class="popup"></div>';
    
    return [
      '#markup' => $output,
      '#attached' => [
        'library' => ['openlayers_gis/openlayers_gis'],
      ],
    ];
  }
}

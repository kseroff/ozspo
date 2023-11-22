<?php

namespace Drupal\gis_openlayers\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\gis_openlayers\Entity\PointEntity;
use Drupal\file\Entity\File;

class OpenLayersGisController extends ControllerBase {

  public function mapPage(Request $request) {
    $output =  '<div class="main">';
    $output .= '<div id="openlayers-gis-map" class="map"></div>';
    $output .= '<div class="external layerSwitcher">';
    $output .= '<div class="tagle" align="center"><b>Переключатель слоев</b></div>';
    $output .= '</div>';
    $output .= '</div>';
  
    return [
      '#markup' => $output,
      '#attached' => [
        'library' => [
          'gis_openlayers/openlayers',
          'gis_openlayers/gis_openlayers',
        ],
        'drupalSettings' => [
          'gis_openlayers' => [
            'points' => $this->getLayersAndPointsData($request),
          ],
        ],
      ],
    ];
  }

  public function getLayersAndPointsData(Request $request) {
    $layers = \Drupal::entityTypeManager()
      ->getStorage('layers_entity')
      ->loadMultiple();
  
    $data = [];
  
    foreach ($layers as $layer) {
      $layer_data = [
        'id' => $layer->id(),
        'layer_name' => $layer->get('layer_name')->value,
        'marker_svg' => '',
        'points' => [],
      ];
  
      $marker_file_id = $layer->get('marker_svg')->target_id;
      $marker_entity = File::load($marker_file_id);
  
      if ($marker_entity && $marker_entity->getFileUri()) {
        $marker_url = file_create_url($marker_entity->getFileUri());
        $layer_data['marker_svg'] = $marker_url;
      }
  
      $point_references = \Drupal::entityQuery('point_entity')
      ->condition('layer_entity', $layer->id())
      ->execute();

    foreach ($point_references as $point_id) {
      $point = PointEntity::load($point_id);
      $point_data = [
        'id' => $point->id(),
        'latitude' => $point->get('latitude')->value,
        'longitude' => $point->get('longitude')->value,
        'info' => $point->get('info')->value,
        'point_name'=>$point->get('point_name')->value,
      ];

      $layer_data['points'][] = $point_data;
    }

    $data[] = $layer_data;
    }
  
    return new JsonResponse($data);
}
}

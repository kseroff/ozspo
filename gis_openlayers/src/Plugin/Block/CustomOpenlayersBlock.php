<?php

namespace Drupal\gis_openlayers\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 *
 * @Block(
 *   id = "gis_info_block",
 *   admin_label = @Translation("Info Block"),
 *   category = @Translation("Custom")
 * )
 */
class CustomOpenlayersBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $content = '<div id="gis_info_block">';
    $content .= '<div class="close-button">X</div>';
    $content .= '<div class="content"></div>';
    $content .= '</div>';

    return [
      '#markup' => $content,
      '#attached' => [
        'library' => [
          'gis_openlayers/gis_openlayers',
        ],
      ],
    ];
  }

}
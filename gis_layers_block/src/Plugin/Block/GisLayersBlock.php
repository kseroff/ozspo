<?php

namespace Drupal\gis_layers_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a GIS Layers block.
 *
 * @Block(
 *   id = "gis_layers_block",
 *   admin_label = @Translation("GIS Layers Block"),
 *   category = @Translation("Custom")
 * )
 */
class GisLayersBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $content = '<div id="gis-layers-block">';
    $content .= '<div class="search-bar"></div>';
    $content .= '<div class="layers-toggle">';
    $content .= '<input type="checkbox" id="layer-toggle" checked="checked"/>';
    $content .= '<label for="layer-toggle">Слой</label>';
    $content .= '</div>';
    $content .= '</div>';

    return [
      '#markup' => $content,
      '#allowed_tags' => ['div','input','label',],
      '#attached' => [
        'library' => [
          'gis_layers_block/gis_layers_block',
          'gis_openlayers/gis_openlayers',
        ],
      ],
    ];
  }

}

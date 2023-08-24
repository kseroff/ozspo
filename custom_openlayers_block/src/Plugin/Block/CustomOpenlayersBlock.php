<?php

namespace Drupal\custom_openlayers_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 *
 * @Block(
 *   id = "custom_openlayers_block",
 *   admin_label = @Translation("Custom OpenLayers Block"),
 *   category = @Translation("Custom")
 * )
 */
class CustomOpenlayersBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $content = '<div id="custom-openlayers-block">';
    $content .= '<div class="close-button">X</div>';
    $content .= '</div>';

    return [
      '#markup' => $content,
      '#attached' => [
        'library' => ['custom_openlayers_block/custom_openlayers_block'],
      ],
    ];
  }

}
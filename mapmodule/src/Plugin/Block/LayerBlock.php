<?php

namespace Drupal\mapmodule\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a block for displaying map layers.
 *
 * @Block(
 *   id = "layer_block",
 *   admin_label = @Translation("Layer Block"),
 *   category = @Translation("Custom")
 * )
 */
class LayerBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    // тут будет код для извлечения и отображения словем моей карты
    
    return $build;
  }

}
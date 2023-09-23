<?php

namespace Drupal\gis_openlayers\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\file\Entity\File;

/**
 * Defines the Layers Entity entity.
 *
 * @ContentEntityType(
 *   id = "layers_entity",
 *   label = @Translation("Layers Entity"),
 *   base_table = "layers_entity",
 *   entity_keys = {
 *     "id" = "id",
 *     "uuid" = "uuid",
 *   },
 * )
 */
class LayersEntity extends ContentEntityBase implements ContentEntityInterface {

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    // Точки, связанные с этим слоем.
    $fields['points'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Точки'))
      ->setDescription(t('Точки связанные с этим слоем.'))
      ->setCardinality(FieldStorageDefinitionInterface::CARDINALITY_UNLIMITED)
      ->setSetting('target_type', 'point_entity')
      ->setDisplayOptions('view', [
        'type' => 'entity_reference_label',
        'settings' => [
          'link' => TRUE,
        ],
        'weight' => 0,
      ])
      ->setDisplayOptions('form', [
        'type' => 'entity_reference_autocomplete',
        'settings' => [
          'match_operator' => 'CONTAINS',
          'size' => '60',
          'placeholder' => '',
        ],
        'weight' => 5,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);


    return $fields;
  }

}

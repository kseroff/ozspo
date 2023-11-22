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

    // Название слоя.
    $fields['layer_name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Название слоя'))
      ->setDescription(t('Название слоя.'))
      ->setRequired(TRUE)
      ->setSetting('max_length', 255);

    // Маркер для точки (SVG изображение).
    $fields['marker_svg'] = BaseFieldDefinition::create('file')
      ->setLabel(t('Маркер точки (SVG)'))
      ->setDescription(t('SVG изображение маркера для точки.'))
      ->setRequired(TRUE)
      ->setSetting('file_directory', 'markers') 
      ->setSetting('file_extensions', 'svg')
      ->setDisplayOptions('form', [
        'type' => 'file',
        'weight' => 10,
      ])
      ->setDisplayConfigurable('form', TRUE);

    // Точки, связанные с этим слоем.
    $fields['points'] = BaseFieldDefinition::create('entity_reference')
    ->setLabel(t('Точки'))
    ->setDescription(t('Точки, принадлежащие этому слою.'))
    ->setSetting('target_type', 'point_entity')
    ->setSetting('handler', 'default')
    ->setCardinality(FieldStorageDefinitionInterface::CARDINALITY_UNLIMITED)
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

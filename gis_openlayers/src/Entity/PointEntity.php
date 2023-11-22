<?php

namespace Drupal\gis_openlayers\Entity;

use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\file\Entity\File;

/**
 *
 * @ContentEntityType(
 *   id = "point_entity",
 *   label = @Translation("Point entity"),
 *   base_table = "point_entity",
 *   entity_keys = {
 *     "id" = "id",
 *     "uuid" = "uuid",
 *   },
 * )
 */

class PointEntity extends ContentEntityBase implements ContentEntityInterface {

  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

$fields['latitude'] = BaseFieldDefinition::create('decimal')
  ->setLabel(t('Широта'))
  ->setDescription(t('Широтная координата точки.'))
  ->setRequired(TRUE)
  ->setSettings([
    'precision' => 10,
    'scale' => 6,
  ]);

$fields['longitude'] = BaseFieldDefinition::create('decimal')
  ->setLabel(t('Долгота'))
  ->setDescription(t('Координата долготы точки.'))
  ->setRequired(TRUE)
  ->setSettings([
    'precision' => 10,
    'scale' => 6,
  ]);

$fields['info'] = BaseFieldDefinition::create('string')
 ->setLabel(t('Информация'))
  ->setDescription(t('Дополнительная информация о точке.'))
  ->setRequired(FALSE)
  ->setSetting('max_length', 255);

  $fields['point_name'] = BaseFieldDefinition::create('string')
  ->setLabel(t('Название точки'))
  ->setDescription(t('Название для этой точки.'))
  ->setRequired(FALSE)
  ->setSetting('max_length', 255);

  $fields['layer_entity'] = BaseFieldDefinition::create('entity_reference')
  ->setLabel(t('Слой'))
  ->setDescription(t('Связанный слой для этой точки.'))
  ->setSetting('target_type', 'layers_entity')
  ->setRequired(TRUE)
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

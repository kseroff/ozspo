<?php

namespace Drupal\openlayers_gis\Entity;

use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\ContentEntityBase;

/**
 * Defines the Point entity.
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
  ->setLabel(t('Latitude'))
  ->setDescription(t('The latitude coordinate of the point.'))
  ->setRequired(TRUE)
  ->setSettings([
    'precision' => 10,
    'scale' => 6,
  ]);

$fields['longitude'] = BaseFieldDefinition::create('decimal')
  ->setLabel(t('Longitude'))
  ->setDescription(t('The longitude coordinate of the point.'))
  ->setRequired(TRUE)
  ->setSettings([
    'precision' => 10,
    'scale' => 6,
  ]);

    $fields['info'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Info'))
      ->setDescription(t('Additional information about the point.'))
      ->setRequired(FALSE)
      ->setSetting('max_length', 255);

    return $fields;
  }

}

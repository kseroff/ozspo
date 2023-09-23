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

    return $fields;
  }

}

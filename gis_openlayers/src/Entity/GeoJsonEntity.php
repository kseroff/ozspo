<?php

namespace Drupal\gis_openlayers\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\file\Entity\File;

/**
 * Defines the GeoJsonEntity entity.
 *
 * @ContentEntityType(
 *   id = "geojson_entity",
 *   label = @Translation("GeoJsonEntity"),
 *   base_table = "geojson_entity",
 *   entity_keys = {
 *     "id" = "id",
 *     "uuid" = "uuid",
 *   },
 * )
 */
class GeoJsonEntity extends ContentEntityBase {

  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['geojson_file'] = BaseFieldDefinition::create('file')
      ->setLabel(t('GeoJSON File'))
      ->setDescription(t('The uploaded GeoJSON file.'))
      ->setRequired(TRUE)
      ->setDisplayOptions('form', [
        'type' => 'file',
        'weight' => 10,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setSetting('file_directory', 'geojson')
      ->setSetting('file_extensions', 'json geojson');

    return $fields;
  }

  /**
   * Вспомогательная функция для получения URI связанного файла GeoJSON.
   *
   * @return string
   *   The file URI or empty string if not found.
   */
  public function getGeoJsonFileUri() {
    $file_field = $this->get('geojson_file');
    $file_entity = File::load($file_field->target_id);
    if ($file_entity) {
      return $file_entity->getFileUri();
    }
    return '';
  }

}

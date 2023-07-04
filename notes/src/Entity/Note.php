<?php

namespace Drupal\notes\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;

/**
 * Defines the note entity.
 *
 * @ContentEntityType(
 *   id = "note",
 *   label = @Translation("Note"),
 *   base_table = "note",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "title",
 *     "revision" = "revision_id",
 *   },
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\notes\NoteListBuilder",
 *     "views_data" = "Drupal\notes\Entity\NoteViewsData",
 *     "storage" = "Drupal\Core\Entity\Sql\SqlContentEntityStorage",
 *   },
 *   revision_table = "note_revision",
 *   field_ui_base_route = "entity.note.edit_form",
 * )
 */
class Note extends ContentEntityBase {

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['title'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Title'))
      ->setRequired(TRUE)
      ->setTranslatable(TRUE)
      ->setSetting('max_length', 255)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    return $fields;
  }

  public function getTitle() {
    return $this->get('title')->value;
  }

}
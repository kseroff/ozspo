<?php

namespace Drupal\notes\Entity;

use Drupal\Core\Database\Database;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\StringTranslation\TranslatableMarkup;

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

    $fields['uuid'] = BaseFieldDefinition::create('uuid')
      ->setLabel(t('UUID'))
      ->setDescription(t('The UUID of the Note entity.'))
      ->setReadOnly(TRUE);

    $fields['body'] = BaseFieldDefinition::create('text_long')
      ->setLabel('Содержимое')
      ->setRevisionable(TRUE)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'text_default',
        'weight' => 0,
      ])
      ->setCardinality(-1)
      ->setSettings([
        'max_length' => 1024
      ])
      ->setDisplayConfigurable('view', TRUE)
      ->setDisplayOptions('form', [
        'type' => 'text_textfield',
        'weight' => 0,
      ])
      ->setDisplayConfigurable('form', TRUE);

    $fields['author'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(new TranslatableMarkup('User ID'))
      ->setSetting('target_type', 'user')
      ->setTranslatable($entity_type->isTranslatable())
      ->setDefaultValueCallback(static::class . '::getDefaultEntityOwner');

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the note was created.'))
      ->setRequired(TRUE);

    // Changed field.
    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the note was last edited.'))
      ->setRequired(TRUE);

    return $fields;
  }

  /**
   * автоматически заполняет поле автор текущим пользователем
   * @return int
   */
  public static function getDefaultEntityOwner() {
    return \Drupal::currentUser()->id();
  }
  public function getTitle() {
    return $this->get('title')->value;
  }
  public static function loadByProperties(array $values = [])
  {
    $ids = [];
    if (!empty($values))
    {
      $entity_query = \Drupal::entityQuery('note');
      $group = $entity_query->andConditionGroup();
      foreach ($values as $key => $value)
      {
        $group->condition($key, $value);
      }
      $ids = $entity_query->condition($group)->execute();
      if (!$ids) return [];
    }

    return static::loadMultiple($ids);
  }
  public function preSave(EntityStorageInterface $storage) {
    parent::preSave($storage);
    /** @var \Drupal\user\Entity\User $author */
    $author = $this->get("author")->entity;
    $this->set("title","Заметки_" . $author->getAccountName());
  }

}

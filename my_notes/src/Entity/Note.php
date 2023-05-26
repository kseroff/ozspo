<?php

namespace Drupal\my_notes\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;

/**
* Defines the notes entity.
*
* @ContentEntityType(
* id = "note",
* label = @Translation("Заметка"),
* handlers = {
* "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
* "list_builder" = "Drupal\my_notes\NoteListBuilder",
* "form" = {
* "default" = "Drupal\my_notes\Form\NoteForm",
* "edit" = "Drupal\my_notes\Form\NoteForm",
* "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm",
* },
* "route_provider" = {
* "html" = "Drupal\Core\Entity\Routing\DefaultHtmlRouteProvider",
* },
* },
* base_table = "note",
* revision_table = "note_revision",
* admin_permission = "administer notes",
* entity_keys = {
* "id" = "id",
* "revision" = "vid",
* "label" = "title",
* "uuid" = "uuid",
* "langcode" = "langcode",
* },
* links = {
* "canonical" = "/note/{note}",
* "edit-form" = "/note/{note}/edit",
* "delete-form" = "/note/{note}/delete",
* "collection" = "/admin/content/note",
* },
* field_ui_base_route = "entity.note.settings"
* )
*/
class Note extends ContentEntityBase {

/**
* {@inheritdoc}
*/
public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
$fields = parent::baseFieldDefinitions($entity_type);

// Title field.
$fields['title'] = BaseFieldDefinition::create('string')
->setLabel(t('Заголовок'))
->setDescription(t('Название заметки'))
->setRequired(TRUE)
->setSettings([
'max_length' => 255,
'text_processing' => 0,
])
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

// Body field.
$fields['body'] = BaseFieldDefinition::create('text_long')
->setLabel(t('Содержимое'))
->setDescription(t('Содержимое заметки'))
->setRequired(FALSE)
->setDisplayOptions('view', [
'label' => 'above',
'type' => 'text_default',
'weight' => -5,
])
->setDisplayOptions('form', [
'type' => 'text_textarea',
'weight' => -5,
])
->setDisplayConfigurable('form', TRUE)
->setDisplayConfigurable('view', TRUE);

// Author field.
$fields['author'] = BaseFieldDefinition::create('entity_reference')
->setLabel(t('Автор'))
->setDescription(t('Автор заметки'))
->setRequired(TRUE)
->setSetting('target_type', 'user')
->setSetting('handler', 'default')
->setDisplayOptions('view', [
'label' => 'above',
'type' => 'author',
'weight' => -4,
])
->setDisplayOptions('form', [
'type' => 'entity_reference_autocomplete',
'weight' => -4,
'settings' => [
'match_operator' => 'CONTAINS',
'size' => '60',
'autocomplete_type' => 'tags',
'placeholder' => '',
],
])
->setDisplayConfigurable('form', TRUE)
->setDisplayConfigurable('view', TRUE);

// Created field.
$fields['created'] = BaseFieldDefinition::create('created')
->setLabel(t('Создана'))
->setDescription(t('Время создания заметки'))
->setRequired(TRUE)
->setDisplayOptions('view', [
'label' => 'above',
'type' => 'timestamp',
'weight' => -3,
])
->setDisplayConfigurable('view', TRUE);

// Changed field.
$fields['changed'] = BaseFieldDefinition::create('changed')
->setLabel(t('Изменена'))
->setDescription(t('Дата изменения заметки'))
->setRequired(TRUE)
->setDisplayOptions('view', [
'label' => 'above',
'type' => 'timestamp',
'weight' => -2,
])
->setDisplayConfigurable('view', TRUE);

return $fields;
}

}
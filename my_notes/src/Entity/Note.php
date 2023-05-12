<?php

namespace Drupal\my_notes\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;

/**
 * Defines the notes entity.
 *
 * @ingroup notes
 *
 * @ContentEntityType(
 *   id = "note",
 *   label = @Translation("Заметка"),
 *   fieldable = TRUE,
 *   base_table = "note",
 *   data_table = "note_field_data",
 *   revision_table = "note_revision",
 *   entity_keys = {
 *     "id" = "id",
 *     "revision" = "vid",
 *     "label" = "title",
 *     "uuid" = "uuid"
 *   },
 *   handlers = {
 *     "list_builder" = "Drupal\my_notes\NoteListBuilder",
 *     "form" = {
 *       "default" = "Drupal\my_notes\Form\NoteForm",
 *    	 "edit" = "Drupal\my_notes\Form\NoteForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm",
 *     },
 *   },
 *   links = {
 *     "canonical" = "/note/{note}",
 *     "add-form" = "/note/add",
 *     "edit-form" = "/note/{note}/edit",
 *     "delete-form" = "/note/{note}/delete",
 *     "collection" = "/admin/content/note",
 *   },
 *   persistent_cache = FALSE
 * )
 */
class Note extends ContentEntityBase
{

	/**
	 * {@inheritdoc}
	 */
	public static function baseFieldDefinitions(EntityTypeInterface $entity_type)
	{
		$fields = parent::baseFieldDefinitions($entity_type);

		// Title field.
		$fields['title'] = BaseFieldDefinition::create('string')
			->setLabel(t('Title'))
			->setDescription(t('The title of the note.'))
			->setRequired(TRUE)
			->setSettings([
				'max_length' => 255,
				'text_processing' => 0,
			])
			->setDisplayConfigurable('view', TRUE)
			->setDisplayConfigurable('form', TRUE);


		// Body field.
		$fields['body'] = BaseFieldDefinition::create('text_long')
			->setLabel(t('Body'))
			->setDescription(t('The body of the note.'))
			->setRequired(FALSE)
			->setDisplayOptions('form', array(
				'type' => 'text_textarea_with_summary',
				'settings' => array(
					'rows' => 10,
				),
			))
			->setDisplayConfigurable('view', TRUE)
			->setDisplayConfigurable('form', TRUE);

		// Author field.
		$fields['author'] = BaseFieldDefinition::create('entity_reference')
			->setLabel(t('Author'))
			->setDescription(t('The author of the note.'))
			->setRequired(TRUE)
			->setSetting('target_type', 'user');

		// Created field.
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

}
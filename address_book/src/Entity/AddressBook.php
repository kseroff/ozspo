<?php

namespace Drupal\address_book\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityTypeInterface;

//"delete" = "Drupal\address_book\Form\AddressBookDeleteForm",

/**
 * Defines the address book entity.
 *
 * @ContentEntityType(
 *   id = "address_book",
 *   label = @Translation("Address Book"),
 *   base_table = "address_book",
 *   entity_keys = {
 *     "id" = "id",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *   },
 *   handlers = {
 *     "storage" = "Drupal\Core\Entity\Sql\SqlContentEntityStorage",
 *     "access" = "Drupal\Core\Entity\EntityAccessControlHandler",
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\Core\Entity\EntityListBuilder",
 *     "form" = {
 *       "default" = "Drupal\address_book\Form\AddressBookForm",
 *       
 *     }
 *   },
 * )
 */
class AddressBook extends ContentEntityBase implements ContentEntityInterface {

	public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
		$fields = parent::baseFieldDefinitions($entity_type);

		$fields['field_full_name'] = BaseFieldDefinition::create('string')
			->setLabel(t('Full Name'))
			->setDescription(t('The full name of the contact.'))
			->setRequired(TRUE)
			->setTranslatable(FALSE)
			->setRevisionable(FALSE)
			->setDisplayOptions('form', [
		    'type' => 'string_textfield',
		    'weight' => -6,
		]);

		$fields['field_phone_number'] = BaseFieldDefinition::create('string')
			->setLabel(t('Phone Number'))
			->setDescription(t('The phone number of the contact.'))
			->setRequired(FALSE)
			->setTranslatable(FALSE)
			->setRevisionable(FALSE)
			->setDisplayOptions('form', [
		    'type' => 'string_textfield',
		    'weight' => -5,
		]);

		$fields['field_job_title'] = BaseFieldDefinition::create('string')
			->setLabel(t('Job Title'))
			->setDescription(t('The job title of the contact.'))
			->setRequired(FALSE)
			->setTranslatable(FALSE)
			->setRevisionable(FALSE)
			->setDisplayOptions('form', [
		    'type' => 'string_textfield',
		    'weight' => -4,
		]);
		return $fields;
	}

}

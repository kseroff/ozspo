<?php

namespace Drupal\address_book\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\user\Entity\User;

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
 *     }
 *   },
 * )
 */
class AddressBook extends ContentEntityBase implements ContentEntityInterface {

  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'))
      ->setRevisionable(FALSE)
      ->setTranslatable(FALSE)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'timestamp',
        'weight' => 0,
      ]);

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

    $fields['field_author'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Author'))
      ->setDescription(t('The author of the contact.'))
      ->setSetting('target_type', 'user')
      ->setRequired(TRUE)
      ->setTranslatable(FALSE)
      ->setRevisionable(FALSE)
      ->setDisplayOptions('form', [
        'type' => 'entity_reference_autocomplete',
        'weight' => -3,
      ])
      ->setDefaultValueCallback('Drupal\address_book\Entity\AddressBook::getCurrentUserId');

    $fields['field_created_date'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created date'))
      ->setDescription(t('The date the contact was created.'))
      ->setTranslatable(FALSE)
      ->setRevisionable(FALSE)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'timestamp',
        'weight' => -2,
      ]);

    $fields['field_modified_date'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Modified date'))
      ->setDescription(t('The date the contact was last modified.'))
      ->setTranslatable(FALSE)
      ->setRevisionable(FALSE)
      ->setDisplayOptions('view', [
        'label' => 'hidden',
        'type' => 'timestamp',
        'weight' => -1,
      ]);

      $fields['field_department'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Department'))
      ->setDescription(t('The department of the contact.'))
      ->setSetting('target_type', 'taxonomy_term')
      ->setRequired(TRUE)
      ->setTranslatable(FALSE)
      ->setRevisionable(FALSE)
      ->setDisplayOptions('form', [
        'type' => 'entity_autocomplete',
        'weight' => 0,
        'settings' => [
          'match_operator' => 'CONTAINS',
          'size' => '60',
          'autocomplete_type' => 'tags',
          'placeholder' => '',
        ],
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['field_personal'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('Personal'))
      ->setDescription(t('Whether the contact is personal or common.'))
      ->setDefaultValue(FALSE)
      ->setTranslatable(FALSE)
      ->setRevisionable(FALSE)
      ->setDisplayOptions('form', [
        'type' => 'checkbox',
        'weight' => 1,
      ]);

    $fields['field_address'] = BaseFieldDefinition::create('text_long')
      ->setLabel(t('Address'))
      ->setDescription(t('The address of the contact.'))
      ->setTranslatable(FALSE)
      ->setRevisionable(FALSE)
      ->setDisplayOptions('form', [
        'type' => 'text_textarea',
        'weight' => 2,
      ]);

    return $fields;
  }

  public static function getCurrentUserId() {
    return \Drupal::currentUser()->id();
  }
  
  /**
   * Gets the created timestamp of the address book entry.
   *
   * @return int
   *   The created timestamp of the address book entry.
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  public function getChangedTime() {
    return $this->get('field_modified_date')->value;
  }

}
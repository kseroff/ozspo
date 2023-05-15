<?php

namespace Drupal\address_book\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Entity\ContentEntityInterface;

//"delete" = "Drupal\address_book\Form\AddressBookDeleteForm",

/**
 * Определение сущности Address Book.
 *
 * @ContentEntityType(
 *   id = "address_book",
 *   label = @Translation("Address Book"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\Core\Entity\EntityListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "form" = {
 *       "default" = "Drupal\address_book\Form\AddressBookForm",
 *       "add" = "Drupal\address_book\Form\AddressBookForm",
 *       "edit" = "Drupal\address_book\Form\AddressBookForm",
 *     },
 *   },
 *   base_table = "address_book",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "fio",
 *   },
 *   links = {
 *     "canonical" = "/address_book/{address_book}",
 *     "add-form" = "/address_book/add",
 *     "edit-form" = "/address_book/edit/{address_book}",
 *     "delete-form" = "/address_book/{address_book}/delete",
 *   },
 * )
 */
class AddressBook extends ContentEntityBase implements ContentEntityInterface{

  public static function getBaseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = [];

    $fields['id'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('ID'))
      ->setDescription(t('The ID of the Address Book record.'))
      ->setReadOnly(TRUE);

    $fields['fio'] = BaseFieldDefinition::create('string')
      ->setLabel(t('ФИО'))
      ->setDescription(t('ФИО.'))
      ->setRequired(TRUE);

    $fields['phones'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Телефоны'))
      ->setDescription(t('Телефоны.'))
      ->setRequired(FALSE);

    $fields['position'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Должность'))
      ->setDescription(t('Должность.'))
      ->setRequired(FALSE);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Creation date'))
      ->setDescription(t('The date that the item was created.'))
      ->setReadOnly(TRUE);

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Last updated'))
      ->setDescription(t('The time that the item was last updated.'))
      ->setReadOnly(TRUE);

    return $fields;
  }
}
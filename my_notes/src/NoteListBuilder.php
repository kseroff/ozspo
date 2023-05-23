<?php
namespace Drupal\my_notes;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Url;

/**
* Provides a list controller for the note entity.
*
* @ingroup note
* @list_builder(
* id = "note",
* label = @Translation("Note list"),
* entity_type = "note"
* )
*/
class NoteListBuilder extends EntityListBuilder {

/**
* {@inheritdoc}
*/
public function buildHeader() {
$header['title'] = $this->t('Title');
$header['author'] = $this->t('Author');
$header['created'] = $this->t('Created');
$header['changed'] = $this->t('Changed');
return $header + parent::buildHeader();
}

/**
* Returns the author of the note.
*
* @return \Drupal\Core\Entity\EntityInterface|null
* The author entity, or NULL if it does not exist.
*/
public function getAuthor(EntityInterface $entity) {
$uid = $entity->get('author')->target_id;
if ($uid) {
$user_storage = $this->entityTypeManager->getStorage('user');
return $user_storage->load($uid);
}
return NULL;
}

/**
* {@inheritdoc}
*/
public function buildRow(EntityInterface $entity) {
$row['title'] = $entity->toLink();
$author = $this->getAuthor($entity);
if ($author) {
$row['author'] = $author->toLink();
} else {
$row['author'] = '';
}
$row['created'] = DrupalDateTime::createFromTimestamp($entity->get('created')->value);
$row['changed'] = DrupalDateTime::createFromTimestamp($entity->get('changed')->value);
return $row + parent::buildRow($entity);
}

/**
* {@inheritdoc}
*/
public function render() {
$build['add_button'] = [
'#type' => 'link',
'#title' => $this->t('Add New Contact'),
'#url' => Url::fromRoute('my_notes.note_add'),
'#attributes' => [
'class' => ['button'],
],
];
$build += parent::render();
return $build;
}

}
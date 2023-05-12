<?php

namespace Drupal\my_notes\Entity;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;

/**
 * Provides a list controller for the note entity.
 */
class NoteListBuilder extends EntityListBuilder
{

    /**
     * {@inheritdoc}
     */
    public function buildHeader()
    {
        $header['title'] = $this->t('Title');
        $header['author'] = $this->t('Author');
        $header['created'] = $this->t('Created');
        $header['changed'] = $this->t('Changed');
        return $header + parent::buildHeader();
    }

    /**
     * {@inheritdoc}
     */
    public function buildRow(EntityInterface $entity)
    {
        $row['title'] = $entity->toLink();
        $row['author'] = $entity->getAuthor()->toLink();
        $row['created'] = DrupalDateTime::createFromTimestamp($entity->get('created')->value);
        $row['changed'] = DrupalDateTime::createFromTimestamp($entity->get('changed')->value);
        return $row + parent::buildRow($entity);
    }


    /**
     * {@inheritdoc}
     */
    public static function getListBuilderClass()
    {
        return NoteListBuilder::class;
    }
}
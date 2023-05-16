<?php

namespace Drupal\address_book\Controller;

use Drupal\address_book\Entity\AddressBook;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Link;
use Drupal\Core\Form\FormBuilder;
use Symfony\Component\DependencyInjection\ContainerInterface;

// use Symfony\Component\HttpFoundation\RedirectResponse;

class AddressBookController extends ControllerBase {

  public $formBuilder;

  public function __construct(FormBuilder $formBuilder) {
    $this->formBuilder = $formBuilder;
  }

  public static function create(ContainerInterface $container)
  {
    return new static(
      $container->get('form_builder')
    );
  }

  public function list() {
    $header = [
      ['data' => 'ФИО'],
      ['data' => 'Телефон'],
      ['data' => 'Должность'],
      ['data' => ''],
      ['data' => ''],
    ];

    $rows = [];

    // Получаем список записей из базы данных
    $query = \Drupal::database()->select('address_book', 'ab');
    $query->fields('ab', ['id', 'fio', 'phones', 'position']);
    $results = $query->execute()->fetchAll();

    foreach ($results as $result) {
      $delete_url = Url::fromRoute('address_book.delete', ['id' => $result->id])->toString();
      $edit_url = Url::fromRoute('address_book.edit', ['id' => $result->id])->toString();

      $delete_link = Link::fromTextAndUrl('Удалить', $delete_url);
      $edit_link = Link::fromTextAndUrl('Редактировать', $edit_url);

      $rows[] = [
        $result->fio,
        $result->phones,
        $result->position,
        $edit_link,
        $delete_link,
      ];
    }

    $build = [
      'address_book_list' => [
        '#theme' => 'table',
        '#header' => $header,
        '#rows' => $rows,
        '#empty' => t('Нет записей.'),
      ],
      'address_book_add' => [
        '#type' => 'link',
        '#title' => 'Добавить запись',
        '#url' => Url::fromRoute('address_book.add_form'),
      ],
    ];

    return $build;
  }

  // пока закоментировал. Главное обычное настроить
  /*
  public function delete($id) {
    $entity = AddressBook::load($id);
    if ($entity) {
      $entity->delete();
      drupal_set_message(t('Запись была удалена.'));
    }
    return new RedirectResponse('/address_book/list');
  }
  */
}
<?php

namespace Drupal\address_book\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\address_book\Entity\AddressBook;

class AddressBookController extends ControllerBase {

  public function list() {
    // Получить список контактов
    $contacts = \Drupal::entityTypeManager()->getStorage('address_book')->loadMultiple();

    // Создание таблицы
    $header = [
      'id' => $this->t('ID'),
      'field_full_name' => $this->t('Полное имя'),
      'field_phone_number' => $this->t('Номер телефона'),
      'field_job_title' => $this->t('Должность'),
      'options' => $this->t('Опции'),
    ];

      // Создание кнопки "Add Contact"
      $addLink = Link::fromTextAndUrl($this->t('Добавь Контакт'), Url::fromRoute('address_book.add'));
      $addLink = $addLink->toRenderable();
      $addLink['#attributes'] = ['class' => ['button']];
      $addLink = ['#markup' => render($addLink)];

    $rows = [];

    foreach ($contacts as $contact) {
      $rows[] = [
        'id' => $contact->id(),
        'field_full_name' => $contact->get('field_full_name')->value,
        'field_phone_number' => $contact->get('field_phone_number')->value,
        'field_job_title' => $contact->get('field_job_title')->value,
        'options' => [
          'data' => [
            '#type' => 'dropbutton',
            '#links' => [
              'edit' => [
                'title' => $this->t('Изменить'),
                'url' => Url::fromRoute('address_book.edit', ['id' => $contact->id()]),
              ],
              'delete' => [
                'title' => $this->t('Удалить'),
                'url' => Url::fromRoute('address_book.delete', ['id' => $contact->id()]),
              ],
            ],
            '#attributes' => ['class' => ['options']],
            '#attached' => [
              'library' => ['core/drupal.dropbutton'],
            ],
          ],
        ],
      ];
    }

    // Создание таблицы
    $table = [
      '#type' => 'table',
      '#header' => $header,
      '#rows' => $rows,
      '#empty' => $this->t('There are no contacts yet.'),
    ];

     // Создание строки поиска
     $searchForm = \Drupal::formBuilder()->getForm('\Drupal\address_book\Form\SearchForm');
     $searchForm['#prefix'] = render($addLink);
     $searchForm['#suffix'] = render($table);

    return $searchForm;
  }

  /**
   * Deletes an address book entry.
   *
   * @param int $id
   *   The ID of the address book entry to delete.
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   *   Redirects to the address book list.
   */
  public function delete($id) {
    $storage = \Drupal::entityTypeManager()->getStorage('address_book');
    $contact = $storage->load($id);
    if ($contact) {
      $contact->delete();
    }
    return $this->redirect('address_book.list');
  }

  /**
   * Edits an address book entry.
   *
   * @param int $id
   *   The ID of the address book entry to edit.
   *
   * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
   *   The edit form or a redirect response.
   */
  public function edit($id) {
    $form = \Drupal::formBuilder()->getForm('\Drupal\address_book\Form\AddressBookFormEdit', $id);
    return $form;
  }

}
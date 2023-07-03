<?php

namespace Drupal\address_book\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;

class AddressBookController extends ControllerBase {

  public function list(Request $request) {
    // Получить список контактов и отсортировать их по полному имени
    $query = \Drupal::entityQuery('address_book');
    $query->sort('field_full_name', 'ASC');
    $contact_ids = $query->execute();
    $contacts = \Drupal::entityTypeManager()->getStorage('address_book')->loadMultiple($contact_ids);
  
    // Создание таблицы
    $header = [
      'id' => $this->t('ID'),
      'field_full_name' => $this->t('Полное имя'),
      'field_phone_number' => $this->t('Номер телефона'),
      'field_job_title' => $this->t('Должность'),
      'field_department' => $this->t('Подразделение'),
      'field_personal' => $this->t('Личный'),
      'field_address' => $this->t('Адрес'),
      'options' => $this->t('Опции'),
    ];
  
    // Создание кнопки "Add Contact"
    $addLink = Link::fromTextAndUrl($this->t('Добавить Контакт'), Url::fromRoute('address_book.add'));
    $addLink = $addLink->toRenderable();
    $addLink['#attributes'] = ['class' => ['button']];
    $addLink = ['#markup' => render($addLink)];
  
    $rows = [];
  
    foreach ($contacts as $contact) {
      $author = $contact->get('field_author')->entity;
      $author_name = $author ? $author->getDisplayName() : '';
  
      $department = $contact->get('field_department')->entity;
      $department_name = $department ? $department->getName() : '';
  
      $is_personal = $contact->get('field_personal')->value;
      $has_access = $this->accessCheck(\Drupal::currentUser())->isAllowed();
  
      $rows[] = [
        'id' => $contact->id(),
        'field_full_name' => $contact->get('field_full_name')->value,
        'field_phone_number' => $contact->get('field_phone_number')->value,
        'field_job_title' => $contact->get('field_job_title')->value,
        'field_author' => $author_name,
        'field_created_date' => \Drupal::service('date.formatter')->format($contact->getCreatedTime()),
        'field_modified_date' => \Drupal::service('date.formatter')->format($contact->getChangedTime()),
        'field_department' => $department_name,
        'field_personal' => $is_personal ? $this->t('Да') : $this->t('Нет'),
        'field_address' => $contact->get('field_address')->value,
        'options' => [
          'data' => [
            '#type' => 'dropbutton',
            '#links' => [
              'edit' => [
                'title' => $this->t('Редактировать'),
                'url' => Url::fromRoute('address_book.edit', ['id' => $contact->id()]),
                'access' => $has_access && !$is_personal,
              ],
              'delete' => [
                'title' => $this->t('Удалить'),
                'url' => Url::fromRoute('address_book.delete', ['id' => $contact->id()]),
                'access' => $has_access && !$is_personal,
              ],
            ],
            '#attributes' => ['class' => ['options']],
            '#attached' => [
              'library' => ['core/drupal.dropbutton'],
            ],
          ],
        ],
        'access' => $has_access || !$is_personal,
      ];
    }
  
    // Создание таблицы
    $table = [
      '#type' => 'table',
      '#header' => $header,
      '#rows' => $rows,
      '#empty' => $this->t('Контактов пока нет.'),
    ];
  
    // Создание формы поиска
    $searchForm = \Drupal::formBuilder()->getForm('\Drupal\address_book\Form\SearchForm');
    $searchForm['#prefix'] = render($addLink);
    $searchForm['#suffix'] = '<div id="address-book-table">' . render($table) . '</div>';
  
    // Добавление строки поиска и кнопки добавления
    $output = [
      '#prefix' => '<div class="address-book-wrapper">',
      '#suffix' => '</div>',
    ];
    $output['search_form'] = $searchForm;
  
    return $output;
  }

  protected function accessCheck(AccountInterface $account) {
    // Проверка на наличие прав "administer address_book content".
    if ($account->hasPermission('administer address_book content')) {
      return AccessResult::allowed();
    }
  
    return AccessResult::neutral();
  }

  public function delete($id) {
    $storage = \Drupal::entityTypeManager()->getStorage('address_book');
    $contact = $storage->load($id);
    if ($contact) { $contact->delete(); }

    return $this->redirect('address_book.list');
  }

  public function edit($id) {
    $form = \Drupal::formBuilder()->getForm('\Drupal\address_book\Form\AddressBookFormEdit', $id);
    return $form;
  }

  public function search(Request $request) {
    $searchInput = $request->query->get('q');
    $form = \Drupal::formBuilder()->getForm('\Drupal\address_book\Form\SearchForm', $searchInput);
    return $form;
  }

}

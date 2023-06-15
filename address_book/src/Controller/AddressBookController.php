<?php

namespace Drupal\address_book\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
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
      'options' => $this->t('Опции'),
    ];
  
    // Создание кнопки "Add Contact"
    $addLink = Link::fromTextAndUrl($this->t('Добавить Контакт'), Url::fromRoute('address_book.add'));
    $addLink = $addLink->toRenderable();
    $addLink['#attributes'] = ['class' => ['button']];
    $addLink = ['#markup' => \Drupal::service('renderer')->renderRoot($addLink)];
  
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
                'title' => $this->t('Редактировать'),
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
$output['table'] = $table;

return $output;
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
    $response = new AjaxResponse();
    $response->addCommand(new OpenModalDialogCommand($this->t('Редактировать контакт'), $form, ['width' => '800']));
    return $response;
  }

  public function searchResults($search) {
    // Получить список контактов, удовлетворяющих условию поиска
    $query = \Drupal::entityQuery('address_book');
    $query->condition('field_full_name', $search, 'CONTAINS');
    $contact_ids = $query->execute();
    $contacts = \Drupal::entityTypeManager()->getStorage('address_book')->loadMultiple($contact_ids);
  
    // Создание таблицы с результатами поиска
    $header = [
      'id' => $this->t('ID'),
      'field_full_name' => $this->t('Полное имя'),
      'field_phone_number' => $this->t('Номер телефона'),
      'field_job_title' => $this->t('Должность'),
      'options' => $this->t('Опции'),
    ];
  
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
                'title' => $this->t('Редактировать'),
                'url' => Url::fromRoute('address_book.edit', ['id' => $contact->id()]),
              ],
              'delete' => [
                'title' => $this->t('Удалить'),
                'url' => Url::fromRoute('address_book.delete', ['id' => $contact->id()]),
              ],
            ],
          ],
        ],
      ];
    }

    $table = [
      '#type' => 'table',
      '#header' => $header,
      '#rows' => $rows,
    ];
  
    // Вернуть рендер элемента таблицы с результатами поиска
    return [
      '#theme' => 'table',
      '#table' => $table,
      '#empty' => $this->t('Нет результатов.'),
    ];

  }

  public function searchAjax(Request $request) {
    $searchTerm = $request->query->get('q');
    $results = $this->searchResults($searchTerm);
    
    return new JsonResponse([
      'status' => 'success',
      'table' => $results,
    ]);
  }

  public function searchFormSubmitHandler(array &$form, FormStateInterface $form_state) {
    $searchTerm = $form_state->getValue('search');
  
    // Перенаправьте на метод search с передачей поискового запроса в качестве параметра
    $url = Url::fromRoute('address_book.search', [], ['query' => ['q' => $searchTerm]]);
    $form_state->setRedirectUrl($url);
    return $form;
  }

}
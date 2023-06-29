<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;

class SearchForm extends FormBase {

  public function getFormId() {
    return 'address_book_search_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['search_input'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Поиск'),
      '#attributes' => [
        'class' => ['search-input'],
        'placeholder' => $this->t('ведите полное имя для поиска'),
      ],
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Найти'),
      '#ajax' => [
        'callback' => '::searchSubmit',
        'wrapper' => 'address-book-table',
      ],
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
   // Этот метод оставил пустым, так как мы используем отправку AJAX
  }


  public function searchSubmit(array &$form, FormStateInterface $form_state) {
    $searchInput = $form_state->getValue('search_input');
    $table = $this->buildAddressBookTable($searchInput);

    $response = new AjaxResponse();
    $response->addCommand(new HtmlCommand('#address-book-table', render($table)));
    return $response;
  }

public function buildAddressBookTable($searchInput) {
  $query = \Drupal::entityQuery('address_book');
  $query->condition('field_full_name', $searchInput, 'CONTAINS');
  $query->sort('field_full_name', 'ASC');
  $contact_ids = $query->execute();
  $contacts = \Drupal::entityTypeManager()->getStorage('address_book')->loadMultiple($contact_ids);

  $rows = [];

  foreach ($contacts as $contact) {
    $rows[] = [
      'id' => $contact->id(),
      'field_full_name' => $contact->get('field_full_name')->value,
      'field_phone_number' => $contact->get('field_phone_number')->value,
      'field_job_title' => $contact->get('field_job_title')->value,
      'field_author' => $contact->get('field_author')->entity->getDisplayName(),
      'field_created_date' => \Drupal::service('date.formatter')->format($contact->getCreatedTime()),
      'field_modified_date' => \Drupal::service('date.formatter')->format($contact->getChangedTime()),
      'field_department' => $contact->get('field_department')->entity ? $contact->get('field_department')->entity->getName() : '',
      'field_personal' => $contact->get('field_personal')->value ? $this->t('Да') : $this->t('Нет'),
      'field_address' => $contact->get('field_address')->value,
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

  $table = [
    '#type' => 'table',
    '#header' => [
      'id' => $this->t('ID'),
      'field_full_name' => $this->t('Полное имя'),
        'field_phone_number' => $this->t('Номер телефона'),
        'field_job_title' => $this->t('Должность'),
        'field_author' => $this->t('Автор'),
        'field_created_date' => $this->t('Дата создания'),
        'field_modified_date' => $this->t('Дата изменения'),
        'field_department' => $this->t('Подразделение'),
        'field_personal' => $this->t('Личный'),
        'field_address' => $this->t('Адрес'),
        'options' => $this->t('Опции'),
    ],
    '#rows' => $rows,
    '#empty' => $this->t('Совпадающие контакты не найдены.'),
  ];

  return $table;
}

}
<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class SearchForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'address_book_search_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['search_input'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Search'),
      '#attributes' => [
        'class' => ['search-input'],
        'placeholder' => $this->t('Enter full name to search'),
      ],
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Search'),
      '#ajax' => [
        'callback' => '::searchSubmit',
        'wrapper' => 'address-book-table',
      ],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // This method can be left empty since we're using AJAX submission.
  }

  /**
   * AJAX callback for search form submission.
   */
  public function searchSubmit(array &$form, FormStateInterface $form_state) {
    $searchInput = $form_state->getValue('search_input');
    $table = $this->buildAddressBookTable($searchInput);

    return $table;
  }

  /**
   * Build the address book table based on the search input.
   */
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
      ];
    }

    $table = [
      '#type' => 'table',
      '#header' => [
        'id' => $this->t('ID'),
        'field_full_name' => $this->t('Полное имя'),
        'field_phone_number' => $this->t('Номер телефона'),
        'field_job_title' => $this->t('Должность'),
      ],
      '#rows' => $rows,
      '#empty' => $this->t('No matching contacts found.'),
    ];

    return $table;
  }
}
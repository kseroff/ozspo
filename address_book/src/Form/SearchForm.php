<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Provides a search form for the address book.
 */
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
  $form['#theme'] = 'address_book_search_form';
  $form['search'] = [
    '#type' => 'search',
    '#title' => $this->t('Поиск'),
    '#attributes' => [
      'placeholder' => $this->t('Введите полное имя для поиска'),
    ],
  ];

  $form['submit'] = [
    '#type' => 'button',
    '#value' => $this->t('Найти'),
    '#attributes' => [
      'class' => ['button'],
    ],
  ];

  return $form;
}

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $searchTerm = $form_state->getValue('search');
    $url = Url::fromRoute('address_book.search_ajax')->setOption('query', ['q' => $searchTerm])->toString();
    $form_state->setRedirectUrl($url);
  }

}

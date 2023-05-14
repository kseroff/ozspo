<?php
namespace Drupal\address_book\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\Core\Url;

class AddressBookController extends ControllerBase {

  public function list() {
    // Получить список контактов
    $contacts = \Drupal::entityTypeManager()->getStorage('address_book')->loadMultiple();
    
    // Создание таблицы
    $header = [
      'id' => $this->t('ID'),
      'field_full_name' => $this->t('Full Name'),
      'field_phone_number' => $this->t('Phone Number'),
      'field_job_title' => $this->t('Job Title'),
      'edit' => $this->t('Edit'),
      'delete' => $this->t('Delete'),
    ];
    
    $rows = [];
    
    foreach ($contacts as $contact) {
      $rows[] = [
        'id' => $contact->id(),
        'field_full_name' => $contact->get('field_full_name')->value,
        'field_phone_number' => $contact->get('field_phone_number')->value,
        'field_job_title' => $contact->get('field_job_title')->value,
        'edit' => Link::fromTextAndUrl($this->t('Edit'), Url::fromRoute('address_book.edit', ['contact' => $contact->id()])),
        'delete' => Link::fromTextAndUrl($this->t('Delete'), Url::fromRoute('address_book.delete', ['contact' => $contact->id()])),
      ];
    }

    // Создал таблицу и вернул ее в качестве ответа
    $table = [
      '#type' => 'table',
      '#header' => $header,
      '#rows' => $rows,
      '#empty' => $this->t('There are no contacts yet.'),
    ];
    
    return $table;
  }

}
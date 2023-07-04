<?php

namespace Drupal\notes\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\AppendCommand;

/**
 * Controller for the notes page.
 */
class NotesController extends ControllerBase {

  /**
   * Renders the notes page.
   */
  public function notesPage() {
    $form = $this->formBuilder()->getForm('Drupal\notes\Form\NotesForm');

    $notes = \Drupal::entityTypeManager()
      ->getStorage('note')
      ->loadMultiple();

    $table_rows = [];
    foreach ($notes as $note) {
      $table_rows[] = [
        'data' => [$note->id(), $note->getTitle()],
      ];
    }

    $table = [
      '#type' => 'table',
      '#header' => [$this->t('ID'), $this->t('Note')],
      '#rows' => $table_rows,
      '#empty' => $this->t('No notes found.'),
    ];

    $output['notes_form'] = $form;
    $output['notes_table'] = [
      '#theme' => 'table',
      '#header' => $table['#header'],
      '#rows' => $table['#rows'],
      '#empty' => $table['#empty'],
      '#attributes' => [
        'id' => 'notes-list',
      ],
    ];

    $output['#attached']['library'][] = 'core/drupal.ajax';

    return $output;
  }

}

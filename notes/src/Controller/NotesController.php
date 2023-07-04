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

  public function notesPage() {
    $form = $this->formBuilder()->getForm('Drupal\notes\Form\NotesForm');

    $output['notes_form'] = $form;

    $output['#attached']['library'][] = 'core/drupal.ajax';

    return $output;
  }

}

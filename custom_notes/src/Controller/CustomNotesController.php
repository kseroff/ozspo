<?php

namespace Drupal\custom_notes\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Url;

class CustomNotesController extends ControllerBase {

    public function addNoteForm() {
        $form = \Drupal::formBuilder()->getForm('Drupal\custom_notes\Form\CustomNotesForm');
      
        return [
          '#type' => 'markup',
          '#markup' => render($form),
          '#attached' => [
            'library' => [
              'core/drupal.ajax',
              'core/drupal.dialog.ajax',
            ],
          ],
        ];
      }

}


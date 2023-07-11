<?php

namespace Drupal\notes\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\notes\Entity\Note;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Controller for the notes page.
 */
class NotesController extends ControllerBase {

  /**
   * Renders the notes page.
   */
  /**
   * Renders the notes page.
   */
  public function notesPage() {
    $form = $this->formBuilder()->getForm('Drupal\notes\Form\NotesForm');
    $output['notes_form'] = $form;
    $output['#attached']['library'][] = 'core/drupal.ajax';

    return $output;
  }

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return \Symfony\Component\HttpFoundation\Response
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function saveNote(Request $request) {
    $data = $request->request->all();
    $usernotes = Note::loadByProperties([
      'author' => \Drupal::currentUser()
        ->id(),
    ]);
    if (count($usernotes) == 0) {
      $note = Note::create(['body' => $data['data']]);
      $note->save();
    }
    else {

      $objnote = array_shift($usernotes);
      if ($objnote instanceof Note) {
        $objnote->setNewRevision(TRUE);
        $objnote->set("body", $data['data']);
        $objnote->save();
      }
    }

    $arr['response'] = TRUE;
    $out = json_encode($arr);
    return new Response($out);
  }

  public function getNote() {
    $usernotes = Note::loadByProperties([
      'author' => \Drupal::currentUser()
        ->id(),
    ]);
    $notesdata = [];
    $objnote = array_shift($usernotes);
    if ($objnote instanceof Note) {
      $bodyvalues = $objnote->get("body")->getValue();
      foreach ($bodyvalues as $key => $value) {
        $notesdata[] = $value['value'];
      }
    }
    $out = json_encode($notesdata);
    return new Response($out);
  }
}

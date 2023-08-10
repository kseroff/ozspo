<?php

namespace Drupal\resources\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\resources\Entity\Resources;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Url;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;

/**
 * Контроллер для списка ресурсов.
 */
class ResourcesController extends ControllerBase {

  public function resourcesPage() {
    $form = $this->formBuilder()->getForm('Drupal\resources\Form\ResourcesForm');
    $output['resources_form'] = $form;
    $output['#attached']['library'][] = 'resources/resources';

    return $output;
  }
  /**
   * Отображает список ресурсов.
   */
  public function getResource() {
    $config = \Drupal::configFactory()->getEditable('resources.site');
    $resourcedata = $config->get('resource.data');
    $out = json_encode($resourcedata);
    return new Response($out);
  }
  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return \Symfony\Component\HttpFoundation\Response
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function saveResource(Request $request) {
    $data = $request->request->all();
    $config = \Drupal::configFactory()->getEditable('resources.site');
    $config->get('resource');
    $config->set('resource',$data)->save();
    $arr['response'] = TRUE;
    $out = json_encode($arr);
    return new Response($out);
  }

}

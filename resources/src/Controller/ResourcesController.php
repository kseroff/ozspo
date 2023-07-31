<?php

namespace Drupal\resources\Controller;

use Drupal\Core\Controller\ControllerBase;

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
  public function resourceList() {
    $config = \Drupal::config('resources');

    // Получаем значения из конфигурации для общих ресурсов.
    $shared_title = $config->get('shared.title');
    $shared_url = $config->get('shared.url');

    // Формируем список ссылок, используя данные общего ресурса.
    $shared_link = '<a href="' . $shared_url . '">' . $shared_title . '</a>';

    // Формируем окончательный список ссылок.
    $links = $shared_link;

    // Возвращаем массив с данными для отображения ссылок.
    return [
      '#markup' => $links,
    ];
  }

}

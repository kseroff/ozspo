<?php
namespace Drupal\resources\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;


/**
 * Определяет конфигурационную сущность ресурсов.
 *
 * @ConfigEntityType(
 *   id = "resources",
 *   label = @Translation("Resources"),
 *   config_prefix = "resources",
 *   admin_permission = "administer resource configuration",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *   },
 *   config_export = {
 *     "id",
 *     "label",
 *     "url",
 *     "personal",
 *   },
 *   handlers = {
 *     "form" = {
 *       "default" = "Drupal\resources\Form\ResourcesForm",
 *     },
 *   },
 * )
 */
class Resources extends ConfigEntityBase {


  public function getTitle() {
    return $this->get('title')->value;
  }

}

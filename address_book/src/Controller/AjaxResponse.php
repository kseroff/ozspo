<?php

namespace Drupal\address_book\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Provides an AJAX response.
 */
class AjaxResponse {

  protected $commands = [];

  /**
   * Returns a JSON response with AJAX commands.
   *
   * @param mixed $data
   *   The data to be returned in the response.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The JSON response object.
   */
  public function getJsonResponse($data) {
    $response = new JsonResponse([
      'data' => $data,
      'commands' => $this->commands,
    ]);

    return $response;
  }

  /**
   * Adds an AJAX command to the response.
   *
   * @param string $command
   *   The name of the command.
   * @param array $arguments
   *   The arguments for the command.
   */
  public function addCommand($command, array $arguments = []) {
    $this->commands[] = [
      'command' => $command,
      'arguments' => $arguments,
    ];
  }

}
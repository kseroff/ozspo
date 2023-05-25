<?php

namespace Drupal\address_book\Controller;

/**
 * Represents an HTML AJAX command.
 */
class HtmlCommand implements CommandInterface {

  protected $selector;
  protected $data;

  /**
   * Constructs an HtmlCommand object.
   *
   * @param string $selector
   *   The CSS selector to target the HTML element.
   * @param string $data
   *   The HTML content to replace the targeted element.
   */
  public function __construct($selector, $data) {
    $this->selector = $selector;
    $this->data = $data;
  }

  /**
   * {@inheritdoc}
   */
  public function render() {
    return [
      'command' => 'html',
      'selector' => $this->selector,
      'data' => $this->data,
    ];
  }

}
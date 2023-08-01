<?php

namespace Drupal\address_book\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\address_book\Entity\AddressBook;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Asset\AssetCollectionRendererInterface;
use Drupal\Core\Asset\AttachedAssetsInterface;
use Drupal\Core\Asset\LibraryDiscoveryInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Asset\AssetResolverInterface;

class AddressBookForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'address_book_form';
  }

  protected $assetCollectionRenderer;
  protected $assetResolver; // Correct the variable name.

  /**
   * Constructs a new AddressBookForm.
   *
   * @param \Drupal\Core\Asset\LibraryDiscoveryInterface $library_discovery
   *   The library discovery service.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler.
   * @param \Drupal\Core\Asset\AssetCollectionRendererInterface $asset_collection_renderer
   *   The asset collection renderer service.
   * @param \Drupal\Core\Asset\AssetResolverInterface $asset_resolver
   *   The asset resolver service.
   */
  public function __construct(LibraryDiscoveryInterface $library_discovery, ModuleHandlerInterface $module_handler, AssetCollectionRendererInterface $asset_collection_renderer, AssetResolverInterface $asset_resolver) {
    $this->libraryDiscovery = $library_discovery;
    $this->moduleHandler = $module_handler;
    $this->assetCollectionRenderer = $asset_collection_renderer;
    $this->assetResolver = $asset_resolver; // Correct the variable assignment.
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('library.discovery'),
      $container->get('module_handler'),
      $container->get('asset.css.collection_renderer'),
      $container->get('asset.resolver') // Use the correct service name.
    );
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    //$entity = \Drupal::entityTypeManager()->getStorage('address_book')->create();
  
    $form['#attached']['library'][] = 'address_book/leaflet';

    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Полное имя'),
      '#required' => TRUE,
    ];
  
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Номер телефона'),
    ];
  
    $form['position'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Должность'),
      '#required' => TRUE,
    ];
  
    $form['department'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Подразделение'),
      '#target_type' => 'taxonomy_term',
      '#required' => TRUE,
      '#tags' => TRUE,
      '#default_value' => '',
    ];

      $form['location'] = [
        '#type' => 'geofield_latlon',
        '#title' => $this->t('Карта'),
        '#default_value' => ['lat' => 0, 'lon' => 0],
        '#description' => $this->t('Нажмите на карту для выбора точки'),
        '#ajax' => [
          'callback' => '::updateAddressField',
          'event' => 'geofield_widget_map_changed',
          'wrapper' => 'address-wrapper',
        ],
      ];
      
      $form['map'] = [
        '#type' => 'markup',
        '#markup' => '<div id="address-book-map" style="height: 400px;"></div>',
        '#prefix' => '<div id="address-wrapper">',
        '#suffix' => '</div>',
      ];
      
      $form['address_wrapper'] = [
        '#type' => 'container',
        '#attributes' => ['id' => 'address-wrapper'],
      ];

    $form['personal'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Личный'),
      '#default_value' => FALSE,
    ];

    $authorId = \Drupal::currentUser()->id();
    $author = \Drupal\user\Entity\User::load($authorId);
  
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Сохранить'),
    ];
  
    return $form;
  }

  public function updateAddressField(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    $location = $form_state->getValue('location');
  
    $address = $location['lat'] . ', ' . $location['lon'];
    $form['address_wrapper']['address']['#value'] = $address;
  
    $response->addCommand(new ReplaceCommand('#address', $this->renderer->renderRoot($form['address_wrapper']['address'])));
    $response->addCommand(new InvokeCommand('#address', 'val', [$address]));
  
    return $response;
  }
  

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $name = $form_state->getValue('name');
    $phone = $form_state->getValue('phone');
    $position = $form_state->getValue('position');
    $department = $form_state->getValue('department');
    $address = $form_state->getValue('address');
    $personal = $form_state->getValue('personal');
    $authorId = $form_state->getValue('author');
    $author = \Drupal\user\Entity\User::load($authorId);

    $location = $form_state->getValue('location');

    $wkt_generator = \Drupal::service('geofield.wkt_generator');
    $wkt = $wkt_generator->WktBuildPoint([$location['lon'], $location['lat']]);

    $entity = AddressBook::create([
      'field_full_name' => $name,
      'field_phone_number' => $phone,
      'field_job_title' => $position,
      'field_department' => $department,
      'field_address' => $address,
      'field_personal' => $personal,
      'field_author' => $author,
      'field_location' => $wkt,
    ]);

    $entity->save();

    $form_state->setRedirectUrl(Url::fromRoute('address_book.list'));
  }

}


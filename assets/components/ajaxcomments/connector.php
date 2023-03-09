<?php
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var AjaxComments $AjaxComments */
$AjaxComments = $modx->getService('AjaxComments', 'AjaxComments', MODX_CORE_PATH . 'components/ajaxcomments/model/');
$modx->lexicon->load('ajaxcomments:default');

// handle request
$corePath = $modx->getOption('ajaxcomments_core_path', null, $modx->getOption('core_path') . 'components/ajaxcomments/');
$path = $modx->getOption('processorsPath', $AjaxComments->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);
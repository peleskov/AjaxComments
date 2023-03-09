<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/AjaxComments/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/ajaxcomments')) {
            $cache->deleteTree(
                $dev . 'assets/components/ajaxcomments/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/ajaxcomments/', $dev . 'assets/components/ajaxcomments');
        }
        if (!is_link($dev . 'core/components/ajaxcomments')) {
            $cache->deleteTree(
                $dev . 'core/components/ajaxcomments/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/ajaxcomments/', $dev . 'core/components/ajaxcomments');
        }
    }
}

return true;
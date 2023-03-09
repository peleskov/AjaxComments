<?php

/**
 * The home manager controller for AjaxComments.
 *
 */
class AjaxCommentsHomeManagerController extends modExtraManagerController
{
    /** @var AjaxComments $AjaxComments */
    public $AjaxComments;


    /**
     *
     */
    public function initialize()
    {
        $this->AjaxComments = $this->modx->getService('AjaxComments', 'AjaxComments', MODX_CORE_PATH . 'components/ajaxcomments/model/');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['ajaxcomments:default'];
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('ajaxcomments');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->AjaxComments->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->AjaxComments->config['jsUrl'] . 'mgr/ajaxcomments.js');
        $this->addJavascript($this->AjaxComments->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->AjaxComments->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->AjaxComments->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->AjaxComments->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->AjaxComments->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->AjaxComments->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        AjaxComments.config = ' . json_encode($this->AjaxComments->config) . ';
        AjaxComments.config.connector_url = "' . $this->AjaxComments->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "ajaxcomments-page-home"});});
        </script>');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="ajaxcomments-panel-home-div"></div>';

        return '';
    }
}
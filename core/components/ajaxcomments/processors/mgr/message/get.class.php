<?php

class AjaxCommentsMessageGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'acMessage';
    public $classKey = 'acMessage';
    public $languageTopics = ['ajaxcomments:default'];
    //public $permission = 'view';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return mixed
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        return parent::process();
    }

}

return 'AjaxCommentsMessageGetProcessor';
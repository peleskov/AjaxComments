<?php

class AjaxCommentsOfficeItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'AjaxCommentsItem';
    public $classKey = 'AjaxCommentsItem';
    public $languageTopics = ['ajaxcomments'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('ajaxcomments_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('name', $this->modx->lexicon('ajaxcomments_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'AjaxCommentsOfficeItemCreateProcessor';
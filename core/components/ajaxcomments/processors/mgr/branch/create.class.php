<?php

class AjaxCommentsBranchCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'acBranch';
    public $classKey = 'acBranch';
    public $languageTopics = ['ajaxcomments'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $title = trim($this->getProperty('title'));
        $branch_key = trim($this->getProperty('branch_key'));
        $target_id = (int)$this->getProperty('target_id');
        $error_empty = $this->modx->lexicon('ajaxcomments_err_empty');
        $error_in = $this->modx->lexicon('ajaxcomments_err_in');
        $error_ae = $this->modx->lexicon('ajaxcomments_err_ae');

        if (empty($title)) {
            $this->modx->error->addField('title', $error_empty . $this->modx->lexicon('ajaxcomments_title'));
            return $error_empty . $this->modx->lexicon('ajaxcomments_title');
        }
        if (empty($branch_key)) {
            $this->modx->error->addField('branch_key', $error_empty . $this->modx->lexicon('ajaxcomments_branch_key'));
            return $error_empty . $this->modx->lexicon('ajaxcomments_branch_key');
        } elseif ($this->modx->getCount($this->classKey, ['branch_key' => $branch_key])) {
            $this->modx->error->addField('branch_key', $this->modx->lexicon('ajaxcomments_branch_key') . $error_ae);
            return $this->modx->lexicon('ajaxcomments_branch_key') . $error_ae;
        }
        if (empty($target_id)) {
            $this->modx->error->addField('target_id', $error_empty . $this->modx->lexicon('ajaxcomments_target_id'));
            return $error_empty . $this->modx->lexicon('ajaxcomments_target_id');
        } elseif ($target_id <= 0) {
            $this->modx->error->addField('target_id', $error_in . $this->modx->lexicon('ajaxcomments_target_id'));
            return $error_in . $this->modx->lexicon('ajaxcomments_target_id');
        }


        return parent::beforeSet();
    }

}

return 'AjaxCommentsBranchCreateProcessor';
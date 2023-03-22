<?php

class AjaxCommentsBranchRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'acBranch';
    public $classKey = 'acBranch';
    public $languageTopics = ['ajaxcomments'];
    //public $permission = 'remove';


    /**
     * @return array|string
     */
    public function process()
    {
        $error_empty = $this->modx->lexicon('ajaxcomments_err_empty');

        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($error_empty . 'ID');
        }

        foreach ($ids as $id) {
            /** @var acBranch $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('ajaxcomments_err_branch_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'AjaxCommentsBranchRemoveProcessor';
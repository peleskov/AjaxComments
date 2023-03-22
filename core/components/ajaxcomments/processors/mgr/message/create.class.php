<?php

class AjaxCommentsMessageCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'acMessage';
    public $classKey = 'acMessage';
    public $objectTypeBrn = 'acBranch';
    public $classKeyBrn = 'acBranch';
    public $languageTopics = ['ajaxcomments'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $created = $this->getProperty('created');
        $branch = (int)$this->getProperty('branch');
        $author_name = trim($this->getProperty('author_name'));
        $author_email = trim($this->getProperty('author_email'));
        $rating = (int)$this->getProperty('rating');
        $error_empty = $this->modx->lexicon('ajaxcomments_err_empty');

        if (empty($created)) {
            $this->modx->error->addField('created', $error_empty . $this->modx->lexicon('ajaxcomments_date'));
            return $error_empty . $this->modx->lexicon('ajaxcomments_date');
        }
        if (empty($author_name)) {
            $this->modx->error->addField('author_name', $error_empty . $this->modx->lexicon('ajaxcomments_author_name'));
            return $error_empty . $this->modx->lexicon('ajaxcomments_author_name');
        }
        if (empty($author_email)) {
            $this->modx->error->addField('author_email', $error_empty . $this->modx->lexicon('ajaxcomments_author_email'));
            return $error_empty . $this->modx->lexicon('ajaxcomments_author_email');
        }
        if (empty($rating)) {
            $this->modx->error->addField('rating', $error_empty . $this->modx->lexicon('ajaxcomments_rating'));
            return $error_empty . $this->modx->lexicon('ajaxcomments_rating');
        } elseif ($rating < 0 || $rating > $this->modx->getOption('ajaxcomments_rating_max')) {
            $this->modx->error->addField('rating', $this->modx->lexicon('ajaxcomments_err_in') . $this->modx->lexicon('ajaxcomments_rating') . '.');
            return $this->modx->lexicon('ajaxcomments_err_in') . $this->modx->lexicon('ajaxcomments_rating') . '.';
        }

        if (empty($branch)) {
            $this->modx->error->addField('branch', $error_empty . $this->modx->lexicon('ajaxcomments_branch'));
            return $error_empty . $this->modx->lexicon('ajaxcomments_branch');
        } elseif ($this->modx->getCount($this->classKeyBrn, ['id' => $branch]) < 1) {
            $this->modx->error->addField('branch', $this->modx->lexicon('ajaxcomments_err_branch_nf'));
            return $this->modx->lexicon('ajaxcomments_err_branch_nf');
        }

        return parent::beforeSet();
    }

}

return 'AjaxCommentsMessageCreateProcessor';
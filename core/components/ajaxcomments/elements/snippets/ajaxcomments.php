<?php
$fqn = $modx->getOption('pdoFetch.class', null, 'pdotools.pdofetch', true);
$path = $modx->getOption('pdofetch_class_path', null, MODX_CORE_PATH . 'components/pdotools/model/', true);
if ($pdoClass = $modx->loadClass($fqn, $path, false, true)) {
    $pdoFetch = new $pdoClass($modx, $scriptProperties);
} else {
    return false;
}
$pdoFetch->addTime('pdoTools loaded');

$AjaxComments = $modx->getService('AjaxComments', 'AjaxComments', MODX_CORE_PATH . 'components/ajaxcomments/model/', $scriptProperties);
if (!$AjaxComments) {
    return 'Could not load AjaxComments class!';
}

$modx->lexicon->load('ajaxcomments:default');

// AJAX запросы обработаем отдельно
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    switch ($action) {
        case 'comment/create':
            $successMsg = $modx->getOption('successMsg', $scriptProperties, '');
            $successModalID = $modx->getOption('successModalID', $scriptProperties, '');
            $errorMsg = $modx->getOption('errorMsg', $scriptProperties, '');
            $errorModalID = $modx->getOption('errorModalID', $scriptProperties, '');
            $redirectID = $modx->getOption('redirectID', $scriptProperties, 0);
            $branch_key = $modx->getOption('branch_key', $scriptProperties, '');
            $branch_title = $modx->getOption('branch_title', $scriptProperties, '');
            $target_id = $modx->getOption('target_id', $scriptProperties, '');
            $autopublish = $modx->getOption('autopublish', $scriptProperties, 0);

            $errors = [];
            $params = [];
            foreach ($_POST as $key => $value) {
                // валидация обязательных полей
                if (in_array($key, ['rating']) && empty($value)) {
                    $errors[$key] = $modx->lexicon('ajaxcomments_err_ne');
                }

                switch ($key) {
                    case 'rating':
                        $params[$key] = (int) $value;
                        break;
                    case 'extended':
                        if (is_array($value)) {
                            $params[$key] = json_encode($value, true);
                        } else {
                            $params[$key] = strip_tags($value);
                        }
                        break;
                    case 'pageId':
                        break;
                    default:
                        $params[$key] = strip_tags($value);
                }
            }
            if (!empty($errors)) {
                break;
            }
            if (!$branch = $modx->getObject('acBranch', ['branch_key' => $branch_key, 'target_id' => $target_id])) {
                $branch = $modx->newObject('acBranch');
                $branch->set('branch_key', $branch_key);
                $branch->set('target_id', $target_id);
                if (!empty($branch_title)) {
                    $branch->set('title', $branch_title);
                }
                $branch->set('active', 1);
                if (!$branch->save()) {
                    $errors['error'] = $modx->lexicon('ajaxcomments_err_ns') . $modx->lexicon('ajaxcomments_branch') . ' - ' . $branch_key;
                    break;
                }
            }

            if ($comment = $modx->newObject('acMessage')) {
                $params['created'] = time();
                $params['active'] = $autopublish == 0 ? 0 : 1;
                $params['branch'] = $branch->get('id');
                foreach ($params as $k => $v) {
                    $comment->set($k, $v);
                }
                if ($comment->save()) {
                    if ($comment->get('rating') > 0){
                        $votes = $modx->getIterator('acMessage', ['branch' => $branch->get('id'), 'rating:>' => 0]);
                        $rating_max = $modx->getOption('ajaxcomments_rating_max', null, 5);
                        $vote_summ = $vote_count = 0;
                        foreach ($votes as $vote) {
                            $vote_count += 1;
                            $vote_summ += $vote->get('rating');
                        }
                        $rating_average = $vote_summ / $vote_count;

                        $z = 1.6;
                        $w = (float) $rating_max - 1;
                        $c = (float) $vote_count;
                        $phat = ($vote_summ - $c * 1) / $w / $c;
                        $rating_wilson = (($phat + $z * $z/(2 * $c) - $z * sqrt(($phat * (1 - $phat) + $z * $z / (4 * $c))/$c))/(1 + $z * $z/$c))*$w + 1;

                        $branch->set('rating', round($rating_average, 2));
                        $branch->set('rating_wilson', round($rating_wilson,2));
                        $branch->save();
                    }
                } else {
                    $errors['error'] = $modx->lexicon('ajaxcomments_err_ns') . $modx->lexicon('ajaxcomments_message');
                }
            } else {
                $errors['error'] = $modx->lexicon('ajaxcomments_err_nc') . $modx->lexicon('ajaxcomments_message');
            }
            break;
    }

    $res = [
        'service' => 'ajaxcomments',
    ];
    if ($redirectID != 0) {
        $res['location'] = $modx->makeUrl($redirectID);
    }
    if (empty($errors)) {
        return $AjaxForm->success('', array_merge($res, [
            'result' => true,
            'message' => $successMsg,
            'modalID' => $successModalID,
        ]));
    } else {
        return $AjaxForm->error('', array_merge($res, [
            'result' => false,
            'message' => $errorMsg,
            'modalID' => $errorModalID,
            'errors' => $errors,
        ]));
    }
} else {
    $action = $modx->getOption('action', $scriptProperties, '');
    switch ($action) {
        case 'comment/get':
            $sortby = $modx->getOption('sortby', $scriptProperties, '`created`');
            $sortdir = $modx->getOption('sortdir', $scriptProperties, 'DESC');
            $outputSeparator = $modx->getOption('outputSeparator', $scriptProperties, "\n");
            $branch_key = $modx->getOption('branch_key', $scriptProperties, '');
            $target_id = $modx->getOption('target_id', $scriptProperties, '');
            $id = $modx->getOption('id', $scriptProperties, '');
            $where = $modx->getOption('where', $scriptProperties, []);
            $totalVar = $modx->getOption('totalVar', $scriptProperties, 'total');
            $limit = $modx->getOption('limit', $scriptProperties, 100);
            $offset = $modx->getOption('offset', $scriptProperties, 0);
            $avatarDefault = MODX_SITE_URL . $modx->getOption('ajaxcomments_avatar_default');
            if (!empty($id)) {
                $where['id'] = $id;
            } elseif (empty($branch_key)) {
                return $modx->lexicon('ajaxcomments_err_empty') . $modx->lexicon('ajaxcomments_branch_key');
            } elseif (empty($target_id)) {
                return $modx->lexicon('ajaxcomments_err_empty') . $modx->lexicon('ajaxcomments_target_id');
            } elseif (!$branch = $modx->getObject('acBranch', ['branch_key' => $branch_key, 'target_id' => $target_id])) {
                return;
            } else {
                $where['branch'] = $branch->get('id');
            }
            $q = $modx->newQuery('acMessage');
            $q->leftJoin('modUserProfile', 'Profile', array('`Profile`.`email` = `acMessage`.`author_email`'));
            $q->select(array(
                '`acMessage`.*',
                '`Profile`.`internalKey` AS `usr_id`',
                '`Profile`.`fullname` AS `fullname`',
                '`Profile`.`email` AS `email`',
                '`Profile`.`mobilephone` AS `mobilephone`',
                '`Profile`.`photo` AS `avatar`'
            ));
            $q->where($where);
            $total = $modx->getCount('acMessage', $q);
            $modx->setPlaceholder($totalVar, $total);
            $q->sortby($sortby, $sortdir);
            $q->limit($limit, $offset);
            $q->prepare();
            $comments = $modx->getIterator('acMessage', $q);
            $items = [];
            $idx = 0;
            foreach ($comments as $comment) {
                $idx += 1;
                $item = array_merge($comment->toArray(), ['idx' => $idx], $scriptProperties);
                if (empty($item['avatar']) && !empty($item['author_email'])) {
                    $item['avatar'] = 'https://www.gravatar.com/avatar/' . md5(strtolower($item['author_email'])) . '?s=30';
                    if (!empty($avatarDefault)) {
                        $item['avatar'] .= '&d=' . urlencode($avatarDefault);
                    }
                } else {
                    $item['avatar'] = $avatarDefault;
                }
                $items[] = empty($tpl)
                    ? '<pre>' . $pdoFetch->getChunk('', $item) . '</pre>'
                    : $pdoFetch->getChunk($tpl, $item);
            }

            $output = array_merge(array('wrapper' => implode($outputSeparator, $items)), $scriptProperties);
            $output = empty($tplOut)
                ? '<pre>' . $pdoFetch->getChunk('', $items) . '</pre>'
                : $pdoFetch->getChunk($tplOut, $output);
            return $output;
        case 'rating/get':
            $branch_key = $modx->getOption('branch_key', $scriptProperties, '');
            $target_id = $modx->getOption('target_id', $scriptProperties, '');
            if (empty($branch_key)) {
                return $modx->lexicon('ajaxcomments_err_empty') . $modx->lexicon('ajaxcomments_branch_key');
            } elseif (empty($target_id)) {
                return $modx->lexicon('ajaxcomments_err_empty') . $modx->lexicon('ajaxcomments_target_id');
            } elseif (!$branch = $modx->getObject('acBranch', ['branch_key' => $branch_key, 'target_id' => $target_id])) {
                return;
            }   
            $rating = [
                'rating' => $branch->get('rating'),
                'rating_wilson' => $branch->get('rating_wilson'),
            ];
            $output = empty($tpl)
                ? '<pre>' . $pdoFetch->getChunk('', $rating) . '</pre>'
                : $pdoFetch->getChunk($tpl, $rating);
            return $output;
    }
    return;
}

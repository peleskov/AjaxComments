{set $target_id = $id}
{set $branch_key = 'comment_comments_'~$branch~'_'~$target_id}
<div class="card comment mb-3">
    <div class="card-header d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center ">
            <div class="rounded-pill overflow-hidden mr-2">
                <img src="{$avatar}" width="30" height="30" alt="">
            </div>
            <span class="text-info">{$author_name}</span>
        </div>
        <div class="small text-muted">{$created}</div>
    </div>
    <div class="card-body small py-1">
        <h3>{$subject}</h3>
        <p>{$text}</p>
    </div>
    <div class="card-footer pt-1 bg-transparent border-0">
        <a class="small card-link float-right" data-toggle="collapse" href="#collapseCommentForm_{$branch_key}_{$idx}" role="button"
            aria-expanded="false" aria-controls="collapseCommentForm_{$branch_key}_{$idx}">Ответить</a>
        <div class="clearfix"></div>
        <div class="collapse pt-3" id="collapseCommentForm_{$branch_key}_{$idx}">
            {'!AjaxForm'|snippet : [
            'snippet' => 'AjaxComments',
            'form' => 'AjaxComments.message.form.answer',
            'action' => 'comment/create',
            'autopublish' => 1,
            'successMsg' => 'Комментарий успешно сохранен!',
            'successModalID' => '',
            'errorMsg' => 'Что то пошло не так, попробуйте еще раз!',
            'errorModalID' => 'errorModalComment',
            'redirectID' => $_modx->resource.id,
            'branch_title' => 'Comments for good '~$_modx->resource.pagetitle,
            'branch_key' => $branch_key,
            'target_id' => $target_id,
            ]}
        </div>
    </div>
</div>
{'!AjaxComments'|snippet:[
'action' => 'comment/get',
'limit' => 0,
'branch_key' => $branch_key,
'target_id' => $target_id,
'tplOut' => '@INLINE <div class="comments-list pl-4">{$wrapper}</div>'
'tpl' => 'AjaxComments.coments.row',
]? :''}
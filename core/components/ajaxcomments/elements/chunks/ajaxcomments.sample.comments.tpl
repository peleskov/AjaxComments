{set $target_id = $_modx->resource.id}
{set $branch_key = 'good_comments__'~$target_id}
<div class="container mb-5">
    <h2>Пример блока комментариев и отзывов для товара:</h2>
    {'!AjaxComments'|snippet:[
    'action' => 'rating/get',
    'branch_key' => $branch_key,
    'target_id' => $target_id,
    'tpl' => 'AjaxComments.rating',
    ]}
    

    {'!AjaxForm'|snippet : [
    'snippet' => 'AjaxComments',
    'form' => 'AjaxComments.message.form',
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
<div class="container mb-5">
    {'!AjaxComments'|snippet:[
    'action' => 'comment/get',
    'limit' => 0,
    'branch_key' => $branch_key,
    'target_id' => $target_id,
    'tplOut' => 'AjaxComments.coments.wrapper'
    'tpl' => 'AjaxComments.coments.row',
    ]}
</div>
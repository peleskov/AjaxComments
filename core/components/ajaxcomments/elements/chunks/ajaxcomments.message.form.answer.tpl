{if $branch_key == ''}
    <span class="text-danger">{$_modx->lexicon('ajaxcomments_err_empty')}: {$_modx->lexicon('ajaxcomments_branch_key')}!</span>
{elseif $target_id == ''}
    <span class="text-danger">{$_modx->lexicon('ajaxcomments_err_empty')}: {$_modx->lexicon('ajaxcomments_target_id')}!</span>
{else}
<form class="ac_form">
    <div class="row">
        <div class="col-12 col-lg-6">
            <div class="form-group d-flex flex-column-reverse">
                <input type="text" name="author_name" class="form-control" id="ac_AuthorName_{$branch_key}" value="{$author_name}" required/>
                <label class="label" for="ac_AuthorName_{$branch_key}">Имя:</label>
            </div>
        </div>
        <div class="col-12 col-lg-6">
            <div class="form-group d-flex flex-column-reverse">
                <input type="email" name="author_email" class="form-control" id="ac_Email_{$branch_key}" value="{$author_email}"  required/>
                <label class="label" for="ac_Email_{$branch_key}">Email:</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="form-group d-flex flex-column-reverse">
                <input type="text" name="subject" class="form-control" id="ac_Subject_{$branch_key}" value="{$subject}"  required/>
                <label class="label" for="ac_Subject_{$branch_key}">Заголовок:</label>
            </div>
        </div>
    </div>
    <div class="form-group d-flex flex-column-reverse">
        <textarea type="text" name="text" class="form-control" rows="5" id="ac_Text_{$branch_key}"  required>{$text}</textarea>
        <label class="label" for="ac_Text_{$branch_key}">Комментарий:</label>
    </div>
    <button class="btn btn-primary" type="submit">Отправить</button>
</form>
{/if}
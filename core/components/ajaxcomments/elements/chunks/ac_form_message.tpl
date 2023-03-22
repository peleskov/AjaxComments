<form enctype="multipart/form-data">
    <input type="hidden" name="branch" value="">

    <div class="form-group">
        <label for="ac_Author">Имя:</label>
        <input type="text" name="author" class="form-control" id="ac_Author" value="{$author}" />
    </div>

    <div class="form-group">
        <label for="ac_Email">{'ec_fe_message_user_email' | lexicon}</label>
        <input type="text" name="email" class="form-control" id="ec-user_email-{$fid}" value="{$user_email}" />
        <span class="ec-error help-block" id="ec-user_email-error-{$fid}"></span>
    </div>

    <div class="form-group">
        <label for="ec-user_contacts-{$fid}" class="control-label">{'ec_fe_message_user_contacts' | lexicon}</label>
        <input type="text" name="user_contacts" class="form-control" id="ec-user_contacts-{$fid}" value="{$user_contacts}" />
        <span class="ec-error help-block" id="ec-user_contacts-error-{$fid}"></span>
    </div>

    <div class="form-group">
        <label for="ec-subject-{$fid}" class="control-label">{'ec_fe_message_subject' | lexicon}</label>
        <input type="text" name="subject" class="form-control" id="ec-subject-{$fid}" value="{$subject}" />
        <span class="ec-error help-block" id="ec-subject-error-{$fid}"></span>
    </div>

    <div class="form-group">
        <label for="ec-rating-{$fid}" class="control-label">{'ec_fe_message_rating' | lexicon}</label>
        <input type="hidden" name="rating" id="ec-rating-{$fid}" value="{$rating}" />
        <div class="ec-rating ec-clearfix" data-storage-id="ec-rating-{$fid}">
            <div class="ec-rating-stars">
                <span data-rating="1" data-description="{'ec_fe_message_rating_1' | lexicon}"></span>
                <span data-rating="2" data-description="{'ec_fe_message_rating_2' | lexicon}"></span>
                <span data-rating="3" data-description="{'ec_fe_message_rating_3' | lexicon}"></span>
                <span data-rating="4" data-description="{'ec_fe_message_rating_4' | lexicon}"></span>
                <span data-rating="5" data-description="{'ec_fe_message_rating_5' | lexicon}"></span>
            </div>
            <div class="ec-rating-description">{'ec_fe_message_rating_0' | lexicon}</div>
        </div>
        <span class="ec-error help-block" id="ec-rating-error-{$fid}"></span>
    </div>

    <div class="form-group">
        <label for="ec-text-{$fid}" class="control-label">{'ec_fe_message_text' | lexicon}</label>
        <textarea type="text" name="text" class="form-control" rows="5" id="ec-text-{$fid}">{$text}</textarea>
        <span class="ec-error help-block" id="ec-text-error-{$fid}"></span>
    </div>

    {if $files}
    <div class="form-group">
        <label for="ec-files-[[+fid]]" class="control-label">{'ec_fe_message_files' | lexicon}</label>
        <input type="file" name="files[]" id="ec-files-[[+fid]]" multiple="multiple" >
        <span class="ec-error help-block" id="ec-files-error-[[+fid]]"></span>
    </div>
    {/if}

    {$recaptcha}

    <div class="form-actions">
        <input type="submit" class="btn btn-primary" name="send" value="{'ec_fe_send' | lexicon}" />
    </div>
</form>

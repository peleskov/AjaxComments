<div class="row mb-5">
    <div class="col-6">
        <p>Рейтинг:</p>
        <div class="current_rating">
            <div style="width: {(($rating*100)/$_modx->config.ajaxcomments_rating_max)|number:2:'.':''}%;"></div>
        </div>
    </div>
    <div class="col-6">
        <p>Рейтинг Wilson:</p>
        <div class="current_rating">
            <div style="width: {(($rating_wilson*100)/$_modx->config.ajaxcomments_rating_max)|number:2:'.':''}%;"></div>
        </div>
    </div>
</div>
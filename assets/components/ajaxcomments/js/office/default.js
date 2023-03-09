Ext.onReady(function () {
    AjaxComments.config.connector_url = OfficeConfig.actionUrl;

    var grid = new AjaxComments.panel.Home();
    grid.render('office-ajaxcomments-wrapper');

    var preloader = document.getElementById('office-preloader');
    if (preloader) {
        preloader.parentNode.removeChild(preloader);
    }
});
AjaxComments.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'ajaxcomments-panel-home',
            renderTo: 'ajaxcomments-panel-home-div'
        }]
    });
    AjaxComments.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(AjaxComments.page.Home, MODx.Component);
Ext.reg('ajaxcomments-page-home', AjaxComments.page.Home);
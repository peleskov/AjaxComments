var AjaxComments = function (config) {
    config = config || {};
    AjaxComments.superclass.constructor.call(this, config);
};
Ext.extend(AjaxComments, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('ajaxcomments', AjaxComments);

AjaxComments = new AjaxComments();
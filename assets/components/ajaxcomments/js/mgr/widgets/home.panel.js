AjaxComments.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'ajaxcomments-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('ajaxcomments') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('ajaxcomments_items'),
                layout: 'anchor',
                items: [{
                    html: _('ajaxcomments_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'ajaxcomments-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    AjaxComments.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(AjaxComments.panel.Home, MODx.Panel);
Ext.reg('ajaxcomments-panel-home', AjaxComments.panel.Home);

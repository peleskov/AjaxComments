AjaxComments.window.CreateBranch = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'ajaxcomments-branch-window-create';
    }
    Ext.applyIf(config, {
        title: _('ajaxcomments_create'),
        width: 550,
        autoHeight: true,
        url: AjaxComments.config.connector_url,
        action: 'mgr/branch/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    AjaxComments.window.CreateBranch.superclass.constructor.call(this, config);
};
Ext.extend(AjaxComments.window.CreateBranch, MODx.Window, {

    getFields: function (config) {
        return [{
            layout: 'column',
            border: false,
            anchor: '100%',
            items: [{
                layout: 'form',
                border: false,
                columnWidth: .80,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('ajaxcomments_title'),
                    name: 'title',
                    id: config.id + '-title',
                    anchor: '99%',
                    allowBlank: false,
                }]
            }, {
                layout: 'form',
                border: false,
                columnWidth: .20,
                items: [{
                    xtype: 'xcheckbox',
                    fieldLabel: _('ajaxcomments_active'),
                    name: 'active',
                    id: config.id + '-active',
                    anchor: '99%',
                    checked: true,
                }]
            }]
        }, {
            layout: 'column',
            border: false,
            anchor: '100%',
            items: [{
                layout: 'form',
                border: false,
                columnWidth: .50,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('ajaxcomments_branch_key'),
                    name: 'branch_key',
                    id: config.id + '-branch_key',
                    anchor: '99%',
                    allowBlank: false,
                }]
            }, {
                layout: 'form',
                border: false,
                columnWidth: .50,
                items: [{
                    xtype: 'numberfield',
                    fieldLabel: _('ajaxcomments_target_id'),
                    name: 'target_id',
                    id: config.id + '-target_id',
                    anchor: '99%',
                    allowBlank: false,
                }]
            }]
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('ajaxcomments-branch-window-create', AjaxComments.window.CreateBranch);


AjaxComments.window.UpdateBranch = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'ajaxcomments-branch-window-update';
    }
    Ext.applyIf(config, {
        title: _('ajaxcomments_update'),
        width: 550,
        autoHeight: true,
        url: AjaxComments.config.connector_url,
        action: 'mgr/branch/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    AjaxComments.window.UpdateBranch.superclass.constructor.call(this, config);
};
Ext.extend(AjaxComments.window.UpdateBranch, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            layout: 'column',
            border: false,
            anchor: '100%',
            items: [{
                layout: 'form',
                border: false,
                columnWidth: .80,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('ajaxcomments_title'),
                    name: 'title',
                    id: config.id + '-title',
                    anchor: '99%',
                    allowBlank: false,
                }]
            }, {
                layout: 'form',
                border: false,
                columnWidth: .20,
                items: [{
                    xtype: 'xcheckbox',
                    fieldLabel: _('ajaxcomments_active'),
                    name: 'active',
                    id: config.id + '-active',
                    anchor: '99%',
                    checked: true,
                }]
            }]
        }, {
            layout: 'column',
            border: false,
            anchor: '100%',
            items: [{
                layout: 'form',
                border: false,
                columnWidth: .50,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: _('ajaxcomments_branch_key'),
                    name: 'branch_key',
                    id: config.id + '-branch_key',
                    anchor: '99%',
                    allowBlank: false,
                }]
            }, {
                layout: 'form',
                border: false,
                columnWidth: .50,
                items: [{
                    xtype: 'numberfield',
                    fieldLabel: _('ajaxcomments_target_id'),
                    name: 'target_id',
                    id: config.id + '-target_id',
                    anchor: '99%',
                    allowBlank: false,
                }]
            }]
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('ajaxcomments-branch-window-update', AjaxComments.window.UpdateBranch);
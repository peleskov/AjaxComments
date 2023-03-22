AjaxComments.window.CreateMessage = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'ajaxcomments-message-window-create';
    }
    Ext.applyIf(config, {
        title: _('ajaxcomments_create'),
        width: 550,
        autoHeight: true,
        url: AjaxComments.config.connector_url,
        action: 'mgr/message/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    AjaxComments.window.CreateMessage.superclass.constructor.call(this, config);
};
Ext.extend(AjaxComments.window.CreateMessage, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'modx-tabs',
            defaults: { border: false, autoHeight: true },
            deferredRender: false,
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('ajaxcomments_settings'),
                layout: 'anchor',
                items: [{
                    layout: 'form',
                    cls: 'modx-panel',
                    items: [{
                        layout: 'column',
                        border: false,
                        anchor: '100%',
                        items: [{
                            layout: 'form',
                            border: false,
                            columnWidth: .60,
                            items: [{
                                xtype: 'xdatetime',
                                fieldLabel: _('ajaxcomments_date'),
                                name: 'created',
                                id: config.id + '-created',
                                anchor: '99%',
                                allowBlank: false,
                                dateFormat: MODx.config.manager_date_format,
                                timeFormat: MODx.config.manager_time_format,
                                startDay: parseInt(MODx.config.manager_week_start),
                                value: new Date(),

                            }]
                        }, {
                            layout: 'form',
                            border: false,
                            columnWidth: .20,
                            items: [{
                                xtype: 'numberfield',
                                fieldLabel: _('ajaxcomments_branch') + ' (id)',
                                name: 'branch',
                                id: config.id + '-branch',
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
                                fieldLabel: _('ajaxcomments_author_name'),
                                name: 'author_name',
                                id: config.id + '-author_name',
                                anchor: '99%',
                                allowBlank: false,
                            }]
                        }, {
                            layout: 'form',
                            border: false,
                            columnWidth: .50,
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: _('ajaxcomments_author_email'),
                                name: 'author_email',
                                id: config.id + '-author_email',
                                anchor: '99%',
                                allowBlank: false,
                            }]
                        }]
                    }]
                }]
            }, {
                title: _('ajaxcomments_message'),
                layout: 'anchor',
                items: [{
                    layout: 'column',
                    border: false,
                    anchor: '100%',
                    items: [{
                        layout: 'form',
                        border: false,
                        columnWidth: .80,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: _('ajaxcomments_subject'),
                            name: 'subject',
                            id: config.id + '-subject',
                            anchor: '99%',
                            allowBlank: true,
                        }]
                    }, {
                        layout: 'form',
                        border: false,
                        columnWidth: .20,
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: _('ajaxcomments_rating'),
                            name: 'rating',
                            id: config.id + '-rating',
                            anchor: '99%',
                            allowBlank: true,
                            value: 0,
                        }]
                    }]
                }, {
                    layout: 'form',
                    border: false,
                    items: [{
                        xtype: 'textarea',
                        fieldLabel: _('ajaxcomments_text'),
                        name: 'text',
                        id: config.id + '-text',
                        anchor: '99%',
                        allowBlank: true,
                        height: 120,
                    }]
                }]
            }]
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('ajaxcomments-message-window-create', AjaxComments.window.CreateMessage);


AjaxComments.window.UpdateMessage = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'ajaxcomments-message-window-update';
    }
    Ext.applyIf(config, {
        title: _('ajaxcomments_update'),
        width: 550,
        autoHeight: true,
        url: AjaxComments.config.connector_url,
        action: 'mgr/message/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    AjaxComments.window.UpdateMessage.superclass.constructor.call(this, config);
};
Ext.extend(AjaxComments.window.UpdateMessage, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'modx-tabs',
            defaults: { border: false, autoHeight: true },
            deferredRender: false,
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('ajaxcomments_settings'),
                layout: 'anchor',
                items: [{
                    layout: 'form',
                    cls: 'modx-panel',
                    items: [{
                        layout: 'column',
                        border: false,
                        anchor: '100%',
                        items: [{
                            layout: 'form',
                            border: false,
                            columnWidth: .60,
                            items: [{
                                xtype: 'xdatetime',
                                fieldLabel: _('ajaxcomments_date'),
                                name: 'created',
                                id: config.id + '-created',
                                anchor: '99%',
                                allowBlank: false,
                                dateFormat: MODx.config.manager_date_format,
                                timeFormat: MODx.config.manager_time_format,
                                startDay: parseInt(MODx.config.manager_week_start),
                                value: new Date(),

                            }]
                        }, {
                            layout: 'form',
                            border: false,
                            columnWidth: .20,
                            items: [{
                                xtype: 'numberfield',
                                fieldLabel: _('ajaxcomments_branch') + ' (id)',
                                name: 'branch',
                                id: config.id + '-branch',
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
                                fieldLabel: _('ajaxcomments_author_name'),
                                name: 'author_name',
                                id: config.id + '-author_name',
                                anchor: '99%',
                                allowBlank: false,
                            }]
                        }, {
                            layout: 'form',
                            border: false,
                            columnWidth: .50,
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: _('ajaxcomments_author_email'),
                                name: 'author_email',
                                id: config.id + '-author_email',
                                anchor: '99%',
                                allowBlank: false,
                            }]
                        }]
                    }]
                }]
            }, {
                title: _('ajaxcomments_message'),
                layout: 'anchor',
                items: [{
                    layout: 'column',
                    border: false,
                    anchor: '100%',
                    items: [{
                        layout: 'form',
                        border: false,
                        columnWidth: .80,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: _('ajaxcomments_subject'),
                            name: 'subject',
                            id: config.id + '-subject',
                            anchor: '99%',
                            allowBlank: true,
                        }]
                    }, {
                        layout: 'form',
                        border: false,
                        columnWidth: .20,
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: _('ajaxcomments_rating'),
                            name: 'rating',
                            id: config.id + '-rating',
                            anchor: '99%',
                            allowBlank: true,
                            value: 0,
                        }]
                    }]
                }, {
                    layout: 'form',
                    border: false,
                    items: [{
                        xtype: 'textarea',
                        fieldLabel: _('ajaxcomments_text'),
                        name: 'text',
                        id: config.id + '-text',
                        anchor: '99%',
                        allowBlank: true,
                        height: 120,
                    }]
                }]
            }]
        }];
    },


    loadDropZones: function () {
    }

});
Ext.reg('ajaxcomments-message-window-update', AjaxComments.window.UpdateMessage);
AjaxComments.grid.Messages = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'ajaxcomments-grid-messages';
    }
    Ext.applyIf(config, {
        url: AjaxComments.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/message/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateItem(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec) {
                return !rec.data.active
                    ? 'ajaxcomments-grid-row-disabled'
                    : '';
            }
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
    });
    AjaxComments.grid.Messages.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(AjaxComments.grid.Messages, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = AjaxComments.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    createItem: function (btn, e) {
        var w = MODx.load({
            xtype: 'ajaxcomments-message-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },

    updateItem: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/message/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'ajaxcomments-message-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },

    removeItem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('ajaxcomments_remove')
                : _('ajaxcomments_remove'),
            text: ids.length > 1
                ? _('ajaxcomments_remove_confirm')
                : _('ajaxcomments_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/message/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    disableItem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/message/disable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    enableItem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/message/enable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    getFields: function () {
        return ['id', 'branch', 'author_name', 'author_email', 'subject', 'text', 'rating', 'created', 'active', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('ajaxcomments_id'),
            dataIndex: 'id',
            sortable: true,
            width: 30
        }, {
            header: _('ajaxcomments_date'),
            dataIndex: 'created',
            sortable: false,
            width: 50,
        }, {
            header: _('ajaxcomments_branch') + ' id',
            dataIndex: 'branch',
            sortable: true,
            width: 30,
        }, {
            header: _('ajaxcomments_author_name'),
            dataIndex: 'author_name',
            sortable: false,
            width: 50,
        }, {
            header: _('ajaxcomments_author_email'),
            dataIndex: 'author_email',
            sortable: false,
            width: 50,
        }, {
            header: _('ajaxcomments_subject'),
            dataIndex: 'subject',
            sortable: false,
            width: 100,
        }, {
            header: _('ajaxcomments_text'),
            dataIndex: 'text',
            sortable: false,
            width: 250,
        }, {
            header: _('ajaxcomments_rating'),
            dataIndex: 'rating',
            sortable: false,
            width: 70,
        }, {
            header: _('ajaxcomments_active'),
            dataIndex: 'active',
            renderer: AjaxComments.utils.renderBoolean,
            sortable: true,
            width: 30,
        }, {
            header: _('ajaxcomments_grid_actions'),
            dataIndex: 'actions',
            renderer: AjaxComments.utils.renderActions,
            sortable: false,
            width: 50,
            id: 'actions'
        }];
    },

    getTopBar: function () {
        return [{
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('ajaxcomments_create'),
            handler: this.createItem,
            scope: this
        }, '->', {
            xtype: 'ajaxcomments-field-search',
            width: 250,
            listeners: {
                search: {
                    fn: function (field) {
                        this._doSearch(field);
                    }, scope: this
                },
                clear: {
                    fn: function (field) {
                        field.setValue('');
                        this._clearSearch();
                    }, scope: this
                },
            }
        }];
    },

    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },

    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    },
});
Ext.reg('ajaxcomments-grid-messages', AjaxComments.grid.Messages);

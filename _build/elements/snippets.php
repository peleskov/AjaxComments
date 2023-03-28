<?php

return [
    'AjaxComments' => [
        'file' => 'ajaxcomments',
        'description' => 'AjaxComments snippet',
        'properties' => [
            'tpl' => [
                'type' => 'textfield',
                'value' => 'tpl.ajaxcomments.row',
            ],
            'sortby' => [
                'type' => 'textfield',
                'value' => 'created',
            ],
            'sortdir' => [
                'type' => 'list',
                'options' => [
                    ['text' => 'ASC', 'value' => 'ASC'],
                    ['text' => 'DESC', 'value' => 'DESC'],
                ],
                'value' => 'DESC',
            ],
            'limit' => [
                'type' => 'numberfield',
                'value' => 10,
            ],
            'outputSeparator' => [
                'type' => 'textfield',
                'value' => "\n",
            ],
        ],
    ],
];
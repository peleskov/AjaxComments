<?php
$xpdo_meta_map['acBranch']= array (
  'package' => 'ajaxcomments',
  'version' => '1.1',
  'table' => 'ac_branches',
  'extends' => 'xPDOSimpleObject',
  'tableMeta' => 
  array (
    'engine' => 'InnoDB',
  ),
  'fields' => 
  array (
    'branch_key' => '',
    'target_id' => 0,
    'title' => '',
    'active' => 0,
    'extended' => NULL,
  ),
  'fieldMeta' => 
  array (
    'branch_key' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '150',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'target_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '11',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
    'title' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'active' => 
    array (
      'dbtype' => 'int',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
    'extended' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'json',
      'null' => true,
    ),
  ),
  'indexes' => 
  array (
    'branch_key' => 
    array (
      'alias' => 'branch_key',
      'primary' => false,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'branch_key' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'target_id' => 
    array (
      'alias' => 'target_id',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'target_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
);

// アプリ

// モジュール読み込み
var appWindow = require('appWindow');

// グローバル変数
var tabGroup = null;

// タブ作成
tabGroup = appWindow.createTabGroup();

// タブオープン
tabGroup.open();

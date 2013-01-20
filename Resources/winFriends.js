// 犬とも

exports.createWindow = function(){
	var win = Ti.UI.createWindow(style.friendsWin);

// Navbarの色を変えつつ...
//var win = Titanium.UI.currentWindow;
win.barColor = '#385292';

// 検索バーも配置しておきます
var searchBar = Titanium.UI.createSearchBar({
    barColor:'#385292', 
    showCancel:false
});

// 格納データとともに宣言
var tableView;
var rowData = [];

// ヘッダ部
var headerRow = Ti.UI.createTableViewRow();
headerRow.backgroundColor = '#576996';
headerRow.selectedBackgroundColor = '#385292';
headerRow.height = 40;
var clickLabel = Titanium.UI.createLabel({
        text:'Click different parts of the row',
        color:'#fff',
        textAlign:'center',
        font:{fontSize:14},
        width:'auto',
        height:'auto'
});
headerRow.className = 'header';
headerRow.add(clickLabel);
rowData.push(headerRow);

// レイアウト行
for (var c = 1; c < 50; c++){
    // datarowクラスとしてTableViewRowを作成
    var row = Ti.UI.createTableViewRow();
    row.selectedBackgroundColor = '#fff';
    row.height  =100;
    row.className = 'datarow';

    // 画像を配置する
    var photo = Ti.UI.createView({
        backgroundImage:'photo1.jpg',
        top:5,
        left:10,
        width:50,
        height:50
    });
    photo.rowNum = c;
    photo.addEventListener('click', function(e){
        // 上でセットしたrowNumにあたるe.source.rowNumでデータを特定する
    });
    row.add(photo);

    // ラベルを配置する
    var user = Ti.UI.createLabel({
        color:'#576996',
        font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
        left:70,
        top:2,
        height:30,
        width:200,
        text:'Fred Smith '+c
    });
    user.rowNum = c;
    user.addEventListener('click', function(e){
        // 上でセットしたrowNumにあたるe.source.rowNumでデータを特定する
    });
    row.add(user);
    // ラベル２個目
    var comment = Ti.UI.createLabel({
        color:'#222',
        font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
        left:70,
        top:21,
        height:50,
        width:200,
        text:'Got some fresh fruit, conducted some business, took a nap'
    });
    row.add(comment);
    // Viewも配置できる
    var calendar = Ti.UI.createView({
        backgroundImage:'photo1.jpgg',
        bottom:2,
        left:70,
        width:32,
        height:32
    });
    calendar.rowNum = c;
    calendar.addEventListener('click', function(e){
        // 上でセットしたrowNumにあたるe.source.rowNumでデータを特定する
    });
    row.add(calendar);
    // ボタンを配置する
    var button = Ti.UI.createView({
                backgroundImage:'photo1.jpg',
                top:35,
                right:5,
                width:36,
                height:34
    });
    button.rowNum = c;
    button.addEventListener('click', function(e){
        // 上でセットしたrowNumにあたるe.source.rowNumでデータを特定する
    });
    row.add(button);
    // ラベルは省略   
    var date = Ti.UI.createLabel({
        // (...)
        text:'posted on 3/11'
    });
    row.add(date);

    // 以上の内容の行を追加する
    rowData.push(row);
}

tableView = Titanium.UI.createTableView({
    data:    rowData,
    search: searchBar
});

win.add(tableView);

	return win;
}

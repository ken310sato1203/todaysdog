// スタンプ

exports.createWindow = function(_type, _userData, _stampData){
	Ti.API.debug('[func]winStamp.createWindow:');
	Ti.API.debug('_type:' + _type);

	var loginUser = model.getLoginUser();
	var user = loginUser.id;

	// 今日の日付の取得
	var now = util.getDateElement(new Date());
	var year = now.year;
	var month = now.month;
	var day = now.day;
	var hour = now.hour;

	if (_stampData != null) {
		user = _stampData.user;
		year = _stampData.year;
		month = _stampData.month;
		day = _stampData.day;
		hour = _stampData.hour;
	}

	// スタンプの選択インデックス
	var selectedIndex = [];

// ---------------------------------------------------------------------
	// Viewの取得
	var getStampScrollView = function() {
		Ti.API.debug('[func]getStampScrollView:');

		var targetView = Ti.UI.createScrollView(style.stampScrollView);
		var stampListView = Ti.UI.createView(style.stampListView);
		targetView.add(stampListView);
		
		var stampSelectList = model.getStampSelectList();
		for (var i=0; i<stampSelectList.length; i++) {
			for (var j=0; j<stampSelectList[i].stampList.length; j++) {
				selectedIndex.push({selected:false, stamp:stampSelectList[i].stampList[j]});
			}
		}	
		var selectedCount = 0;
	
		// 余白
		var stampView = Ti.UI.createView(style.stampView);
		stampListView.add(stampView);
	
		var stampIndex = 0;
		var countMax = 8;
		var alertFlag = false;
		
		for (var i=0; i<stampSelectList.length; i++) {
			var stampView = Ti.UI.createView(style.stampView);
			stampView.type = stampSelectList[i].type;
			stampListView.add(stampView);
			var stampText = Ti.UI.createLabel(style.stampTextLabel);
			stampText.text = stampSelectList[i].title;
			stampView.add(stampText);
	
			for (var j=0; j<stampSelectList[i].stampList.length; j++) {
				var stamp = stampSelectList[i].stampList[j];
				var stampImage = Ti.UI.createImageView(style.stampImage);
				stampImage.index = stampIndex;
				stampIndex++;
				stampImage.image = 'images/icon/' + stamp + '.png';		
				stampView.add(stampImage);
				
				// スタンプをクリック
				stampImage.addEventListener('click',function(e){
					Ti.API.debug('[event]stampImage.click:');
					
					var parentView = e.source.getParent();
					if (parentView.type == "one") {
						var childList = parentView.getChildren();
						var selectedChild = null;
						for (var k=0; k<childList.length; k++) {
							if (childList[k].objectName == "stampImage") {
								if (selectedIndex[childList[k].index].selected) {
									selectedChild = childList[k];
								}
							}
						}
						if (selectedChild == null) {
							if (selectedCount == countMax) {
								alertFlag = true;
							} else {
								e.source.opacity = 1.0;
								selectedIndex[e.source.index].selected = true;
								selectedCount++;
							}
						} else {
							selectedChild.opacity = 0.3;
							selectedIndex[selectedChild.index].selected = false;
							if (selectedChild.index == e.source.index) {
								selectedCount--;
							} else {
								e.source.opacity = 1.0;
								selectedIndex[e.source.index].selected = true;
							}
						}
	
					} else {
						if (selectedIndex[e.source.index].selected) {
							e.source.opacity = 0.3;
							selectedIndex[e.source.index].selected = false;
							selectedCount--;
						} else {
							if (selectedCount == countMax) {
								alertFlag = true;
							} else {
								e.source.opacity = 1.0;
								selectedIndex[e.source.index].selected = true;
								selectedCount++;
							}
						}
					}
	
					if (selectedCount > 0) {
						nextButton.touchEnabled = true;
					} else {
						nextButton.touchEnabled = false;
					}
	
					if (alertFlag) {
						var alertDialog = Titanium.UI.createAlertDialog({
							title: '一度に投稿できるスタンプ数は８個です',
							buttonNames: ['OK'],
						});
						alertDialog.show();
				
						alertDialog.addEventListener('click',function(alert){
							alertFlag = false;
						});
					}
	
				});
			}
		}

		return targetView;
	};

// ---------------------------------------------------------------------
	var stampWin = Ti.UI.createWindow(style.stampWin);
	// タイトルの表示
	var monthTitle = Ti.UI.createLabel(style.stampTitleLabel);	
	stampWin.titleControl = monthTitle;
	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	stampWin.leftNavButton = backButton;
	// 次へボタンの表示
	var nextButton = Titanium.UI.createButton(style.stampButton);
	nextButton.touchEnabled = false;
	stampWin.rightNavButton = nextButton;

	var stampScrollView = getStampScrollView();
	stampWin.add(stampScrollView);
	
// ---------------------------------------------------------------------
	// 右スワイプで前の画面に戻る
	stampWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]stampWin.swipe:');
		if (e.direction == 'right') {
			stampWin.close({animated:true});
		}
	});

	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		stampWin.close({animated:true});
	});

	// 次へボタンをクリック
	nextButton.addEventListener('click', function(e){
		Ti.API.debug('[event]nextButton.click:');
			var stampDataList = [];
			for (var i=0; i<selectedIndex.length; i++) {
				if (selectedIndex[i].selected) {
					var stampData = {
						no: null,
						event: null,
						user: user,
						stamp: selectedIndex[i].stamp,
						textList: [''],
						year: year,
						month: month,
						day: day,
						hour: hour,
						all: null,
						report: null,
						date: null,
					};
					stampDataList.push(stampData);
				}
			}
	
			var postWin = win.createStampPostWindow(_type, _userData, stampDataList);	
			postWin.prevWin = stampWin;
			win.openTabWindow(postWin, {animated:true});
	});

	// 更新用イベント
	stampWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]stampWin.refresh:');
		// ビューの再作成
		stampWin.remove(stampScrollView);
		stampScrollView = getStampScrollView();
		stampWin.add(stampScrollView);
	});

	return stampWin;
};


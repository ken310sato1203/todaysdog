// スタンプ

exports.createWindow = function(_userData, _stampData){
	Ti.API.debug('[func]winStamp.createWindow:');

	var user = null;
	var year = null;
	var month = null;
	var day = null;
	var hour = null;

	if (_stampData == null) {
		user = model.getLoginId();
		var now = new Date();
		year = now.getFullYear();
		month = now.getMonth() + 1;
		day = now.getDate();
		hour = now.getHours();

	} else {
		user = _stampData.user;
		year = _stampData.year;
		month = _stampData.month;
		day = _stampData.day;
		hour = _stampData.hour;
	}

// ---------------------------------------------------------------------
	// Viewの取得
	var getStampScrollView = function() {
		Ti.API.debug('[func]getStampScrollView:');

		var targetView = Ti.UI.createScrollView(style.stampScrollView);
	
		var operationView = Ti.UI.createView(style.stampOperationView);
		targetView.add(operationView);		
	
		var cameraView = Ti.UI.createView(style.stampCameraView);
		operationView.add(cameraView);
		var cameraImage = Ti.UI.createImageView(style.stampCameraImage);
		cameraView.add(cameraImage);
	
		var diaryView = Ti.UI.createView(style.stampDiaryView);
		operationView.add(diaryView);
		var diaryImage = Ti.UI.createImageView(style.stampDiaryImage);
		diaryView.add(diaryImage);
	
		// diaryViewをクリック
		diaryView.addEventListener('click',function(e){
			Ti.API.debug('[event]diaryView.click:');

			var stampDataList = [];
			for (var i=0; i<selectedIndex.length; i++) {
				if (selectedIndex[i].selected) {
					var stampData = {
						no: null,
						user: user,
						stamp: selectedIndex[i].stamp,
						text: null,
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
	
			var postWin = win.createStampPostWindow(_userData, stampDataList);	
			postWin.prevWin = stampWin;
			win.openTabWindow(postWin);
		});
	
		var stampListView = Ti.UI.createView(style.stampListView);
		targetView.add(stampListView);
		
		var stampSelectList = model.getStampSelectList();
		var selectedIndex = [];
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
		var countMax = 7;
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
				stampImage.image = 'images/icon/diary_' + stamp + '.png';		
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
							selectedChild.opacity = 0.2;
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
							e.source.opacity = 0.2;
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
						diaryView.enabled = true;
					} else {
						diaryView.enabled = false;
					}
	
					if (alertFlag) {
						var alertDialog = Titanium.UI.createAlertDialog({
							title: '一度に投稿できるスタンプ数は７個です',
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

	var stampScrollView = getStampScrollView();
	stampWin.add(stampScrollView);
	
// ---------------------------------------------------------------------
	// 右スワイプで前の画面に戻る
	stampWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]stampWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(stampWin);
		}
	});

	// 更新用イベント
	stampWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]stampWin.refresh:');
		// ビューの再作成
		stampWin.remove(stampScrollView);
		stampScrollView = getStampScrollView();
		stampWin.add(stampScrollView);

		if (stampWin.prevWin != null) {
			stampWin.prevWin.fireEvent('refresh', {stampData:e.stampData});
			// 複数の画面を同時にアニメーションさせるとエラーになるのでアニメーションさせない
			stampWin.close({animated:false});
		}
	});

	return stampWin;
}


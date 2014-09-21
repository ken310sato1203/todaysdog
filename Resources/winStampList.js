// 今日のスタンプ一覧

exports.createWindow = function(_userData, _diaryData){
	Ti.API.debug('[func]winTime.createWindow:');

	// 多重クリック防止
	var clickEnable = true;

	// groupViewの取得
	var getGroupView = function(_rowStamp) {
		Ti.API.debug('[func]getGroupView:');

		var targetView = Ti.UI.createView(style.stampListStampView);
//		targetView.stampData = _rowStamp;

		var stampImage = Ti.UI.createImageView(style.timeStampImage);
		stampImage.image = 'images/icon/' + _rowStamp.stamp + '.png';
		targetView.add(stampImage);

		return targetView;
	};

	// stampListTableViewの取得
	var getTimeTableView = function() {
		Ti.API.debug('[func]getTimeTableView:');
		var targetView = Ti.UI.createTableView(style.stampListTableView);
		var rowList = [];

		if (_diaryData.stampList.length > 0) {
			var stampSelectList = model.getStampSelectList();
			for (var i=0; i<stampSelectList.length; i++) {
				var row = Ti.UI.createTableViewRow(style.stampListTableRow);
				var stampGroupView = Ti.UI.createView(style.stampListStampGroupView);
				row.add(stampGroupView);
				var groupLabel = Ti.UI.createLabel(style.stampListStampGroupLabel);
				groupLabel.text = stampSelectList[i].title;
				stampGroupView.add(groupLabel);
				var groupListView = Ti.UI.createView(style.stampListStampListView);
				stampGroupView.add(groupListView);

				var targetFlag = false;
				for (var j=0; j<_diaryData.stampList.length; j++) {
					if (stampSelectList[i].stampList.indexOf(_diaryData.stampList[j].stamp) != -1) {
						var groupView = getGroupView(_diaryData.stampList[j]);
						groupListView.add(groupView);
						targetFlag = true;
					}
				}
				if (targetFlag) {
					rowList.push(row);
					targetFlag = false;
				}
			}
		}
		targetView.setData(rowList);
		return targetView;
	};

	// ビューの更新
	var updateTableView = function(updateData) {
		Ti.API.debug('[func]updateTableView:');

		// スタンプデータの取得 登録時は追加分も含む
		var stampList = model.getLocalStampList({
			userId: _userData.id,
			year: _diaryData.year,
			month: _diaryData.month,
			day: _diaryData.day
		});

		if (updateData != null) {
			var insertTarget = [];
			for (var i=0; i<updateData.stampList.length; i++) {
				insertTarget.push(updateData.stampList[i].event);
			}
			for (var i=0; i<stampList.length; i++) {
				if (insertTarget.indexOf(stampList[i].event) != -1) {
					stampList[i].insertFlag = true;
				}
			}
		}
		_diaryData.stampList = stampList;

		// ビューの再作成
		if(stampListTableView) {
			stampListWin.remove(stampListTableView);
		}
		stampListTableView = getTimeTableView();
		stampListTableView.visible = true;			
		stampListWin.add(stampListTableView);

		// タイトルの表示
		dayTitle.text =  _diaryData.month + '月' + _diaryData.day + '日(' + _diaryData.weekday.text + ')';

	};


// ---------------------------------------------------------------------
	var stampListWin = Ti.UI.createWindow(style.stampListWin);
	stampListWin.diaryData = _diaryData;
	// タイトルの表示
	var titleView = Ti.UI.createView(style.stampListTitleView);	
	stampListWin.titleControl = titleView;
	var dayTitle = Ti.UI.createLabel(style.stampListTitleLabel);
	titleView.add(dayTitle);

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonCloseButton);
	stampListWin.leftNavButton = backButton;

	// ビューの作成
	var stampListTableView = null;
	updateTableView();

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		// NavigationWindowを使用しているため、navWinを閉じる。
		stampListWin.nav.close();
	});

	return stampListWin;
};


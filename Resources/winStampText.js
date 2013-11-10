// スタンプ投稿テキスト入力

exports.createWindow = function(_userData, _stampData){
	Ti.API.debug('[func]winStampText.createWindow:');

	var textWin = Ti.UI.createWindow(style.stampTextWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.stampTextTitleLabel);	
	textWin.titleControl = titleLabel;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	textWin.leftNavButton = backButton;

	var textScrollView = Ti.UI.createScrollView(style.stampTextScrollView);
	textWin.add(textScrollView);
	
	var textView = Titanium.UI.createView(style.stampTextView);
	textScrollView.add(textView);

	var textArea = Ti.UI.createTextArea(style.stampTextArea);
	textArea.value = _stampData.textList[0];
	textView.add(textArea);

	var historyTableView = Ti.UI.createTableView(style.stampHistoryTableView);
	var historyList = [];

	// スタンプの履歴データ取得
	var localHistoryList = model.getLocalStampHistoryList({
		userId: _userData.id,
		stamp: _stampData.stamp
	});
	var defaultHistoryList = model.getStampHistoryList(_stampData.stamp);
	if (localHistoryList == null) {
		historyList = defaultHistoryList;				
	} else {
		historyList = localHistoryList.concat(defaultHistoryList);
	}
	historyList = util.unique(historyList).slice(0,5);
				
	var historyRowList = [];
	if (historyList != null) {
		for (var i=0; i<historyList.length; i++) {
			var historyRow = Titanium.UI.createTableViewRow(style.stampHistoryTableRow);
			historyRowList.push(historyRow);
			var historyLabel = Ti.UI.createLabel(style.stampHistoryLabel);
			historyLabel.text = historyList[i];
			historyRow.add(historyLabel);
		}
	}
	historyTableView.data = historyRowList;
	textScrollView.add(historyTableView);


/*
	// スタンプの履歴データ取得
	model.getCloudStampHistoryList({
		userId: _userData.id,
		stamp: _stampData.stamp
	}, function(e) {
		Ti.API.debug('[func]getCloudStampHistoryList.callback:');
		if (e.success) {
			var cloudHistoryList = e.stampHistory.historyList;
			var defaultHistoryList = model.getStampHistoryList(_stampData.stamp);
			historyList = cloudHistoryList.concat(defaultHistoryList);
			historyList = util.unique(historyList).slice(0,5);
						
			var historyRowList = [];
			if (historyList != null) {
				for (var i=0; i<historyList.length; i++) {
					var historyRow = Titanium.UI.createTableViewRow(style.stampHistoryTableRow);
					historyRowList.push(historyRow);
					var historyLabel = Ti.UI.createLabel(style.stampHistoryLabel);
					historyLabel.text = historyList[i];
					historyRow.add(historyLabel);
				}
			}
			historyTableView.data = historyRowList;
			textScrollView.add(historyTableView);
			

		} else {
			util.errorDialog(e);
		}
	});
*/

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		if (textWin.prevWin != null) {
			var stampText = textArea.value.replace(/\n+$/g,'').replace(/\s+$/g,'');
			if (stampText == '') {
				historyList = [stampText];
			} else {
				historyList.unshift(stampText);
				historyList = util.unique(historyList).slice(0,5);
			}
			_stampData.textList = historyList;

			textWin.prevWin.fireEvent('refresh', {stampData:_stampData});
		}
		textWin.close({animated:true});
	});	

	textArea.addEventListener('focus',function(e){
		if (e.source.value == e.source.hintText) {
			e.source.value = "";
			e.source.color = "black";
		}
	});
	textArea.addEventListener('blur',function(e){
		if (e.source.value == "") {
			e.source.value = e.source.hintText;
			e.source.color = "gray";
		}
	});
	// 入力ボックスでリターンでフォーカスを外す
	textArea.addEventListener('return',function(e){
		Ti.API.debug('[event]textArea.return:');
		textArea.blur();
		backButton.fireEvent('click');
	});

	// 履歴クリックでチェックし入力テキストにコピー
	historyTableView.addEventListener('click',function(e){
		Ti.API.debug('[event]historyTableView.click:');
		var tableRow = historyTableView.data[0].rows;
		if (tableRow != null) {
			for (var i=0; i<tableRow.length; i++) {
				tableRow[i].hasCheck = false;
			}
		}
		e.row.hasCheck = true;
		textArea.value = e.source.text;
		backButton.fireEvent('click');
	});

	// 画面クリックでコメントフィールドのフォーカスを外す
	textWin.addEventListener('click',function(e){
		Ti.API.debug('[event]textWin.click:');
		textArea.blur();
	});

	return textWin;
};

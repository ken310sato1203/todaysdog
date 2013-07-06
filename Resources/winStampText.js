// スタンプ投稿テキスト入力

exports.createWindow = function(_userData, _stampData){
	Ti.API.debug('[func]winStampText.createWindow:');

	var textWin = Ti.UI.createWindow(style.stampTextWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.stampTextTitleLabel);	
	textWin.titleControl = titleLabel;

	// 完了ボタンの表示
	var doneButton = Titanium.UI.createButton(style.stampTextDoneButton);
	textWin.rightNavButton = doneButton;
	
	var textView = Titanium.UI.createView(style.stampTextView);
	textWin.add(textView);

	var textArea = Ti.UI.createTextArea(style.stampTextArea);
	textArea.value = _stampData.text;
	textView.add(textArea);

	var historyList = model.getStampHistoryList(_stampData.stamp);
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

	var historyTableView = Ti.UI.createTableView(style.stampHistoryTableView);
	historyTableView.data = historyRowList;
	textWin.add(historyTableView);

// ---------------------------------------------------------------------

	// 完了ボタンをクリック
	doneButton.addEventListener('click', function(e){
		Ti.API.debug('[event]doneButton.click:');
		if (textWin.prevWin != null) {
			_stampData.text = textArea.value;
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
		textArea.value = historyList[e.index];
	});

	// 入力ボックスでリターンでフォーカスを外す
	textArea.addEventListener('return',function(e){
		Ti.API.debug('[event]textWin.return:');
		textArea.blur();
	});
	// 画面クリックでコメントフィールドのフォーカスを外す
	textWin.addEventListener('click',function(e){
		Ti.API.debug('[event]textWin.click:');
		textArea.blur();
	});

	return textWin;
}

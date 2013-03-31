// 時間スケジュール

exports.createWindow = function(_diaryData){
	Ti.API.debug('[func]winTime.createWindow:');

	var year = _diaryData.year;
	var month = _diaryData.month;
	var day = _diaryData.day;

	var timeWin = Ti.UI.createWindow(style.diaryWin);
	// タイトルの表示
	var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var monthTitle = Ti.UI.createLabel(style.diaryTitleLabel);	
	monthTitle.text =  day + ' ' + monthName[month] + ' ' + year;
	timeWin.titleControl = monthTitle;

	var timeView = Ti.UI.createTableView(style.diaryTableView);
	timeWin.add(timeView);

	var timeRow = [];
	var timeRange = ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
	for (var i=0; i<timeRange.length; i++) {
		var row = Ti.UI.createTableViewRow(style.diaryTableRow);
		var timeLabel = Ti.UI.createLabel(style.diaryDayLabel);
		timeLabel.text = timeRange[i];
		row.add(timeLabel);		
		timeRow.push(row);
	}
	timeView.setData(timeRow);


	return timeWin;
}


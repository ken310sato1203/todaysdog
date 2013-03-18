// 日記

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winDiary.createWindow:');

	var diaryWin = Ti.UI.createWindow(style.diaryWin);
	var tableView = Ti.UI.createTableView({
		top: '1dp',
		left:0,
//		zIndex:2,
		width:320,
		backgroundColor: '#dedede',
//		separatorColor: '#dedede',
		separatorStyle : Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
	});
	diaryWin.add(tableView);

	// 今日の日付
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth();
	var nowDay = now.getDate();
	var year = nowYear;
	var month = nowMonth;

	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.diaryTitleLabel);	
	titleLabel.text = year+ '年' + month +'月';
	diaryWin.titleControl = titleLabel;

	// カレンダーデータの取得
	var getCalendarRowData = function(year, month) {
		Ti.API.debug('[func]getDiaryRowData:');
		var leap = year % 4 ? 0 : year % 100 ? 1 : year % 400 ? 0 : 1;
		var months = [31, 28 + leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var dayNames = ['sun','mon','tue','wed','thu','fri','sat'];
		var rows = [];
		for (var day = 1; day <= months[month-1]; day++){
			var dayOfWeek = (new Date(year, month, day, 0, 0, 0)).getDay();
			var row = {
				dayNames:dayNames[dayOfWeek],
				day:day
			};
			rows.push(row);
		}
		return rows;
	}

	// カレンダービューを取得
	var getCalendarTableViewRow = function(calendarList) {
		Ti.API.debug('[func]getDiaryTableViewRow:');
		var len = calendarList.length;
		var rows= [];
		for(var i=0;i<len;i++){
			var row = Ti.UI.createTableViewRow({
				height: Ti.UI.SIZE,
			});

			var view = Ti.UI.createView({
				top: '0dp',
				bottom: '1dp',
				width: '100%',
				height: Ti.UI.SIZE,
				backgroundColor : 'white',
			});

			if(calendarList[i].day===4){
				var iconRed = Ti.UI.createImageView({
					width:30,
					height:30,
					left:35,
					top:0,
					image:'/ui/parts/roundRed.png'
				});
				var iconGreen = Ti.UI.createImageView({
					width:30,
					height:30,
					left:70,
					top:0,
					image:'/ui/parts/roundGreen.png'
				});
				view.add(iconRed);
				view.add(iconGreen);
			}
			var dayLabel = Ti.UI.createLabel({
				top:0,
				left: '2dp',
				width:30,
				height:30,
				textAlign: 'center',
				font:{
					fontSize:16
				},
				text:calendarList[i].day
			});
			var dayNamesLabel = Ti.UI.createLabel({
				top: '15dp',
				left: '2dp',
				width:30,
				height:30,
				textAlign: 'center',
				font:{
					fontSize:14
				},
				text:calendarList[i].dayNames
			});
			view.add(dayLabel);
			view.add(dayNamesLabel);
			row.add(view);
			rows.push(row);
		}
		return rows;
	}

	// カレンダーの表示
	var rows = getCalendarRowData(year,month);
	var calendarRow = getCalendarTableViewRow(rows);
	tableView.setData(calendarRow);
		
	// 左右スワイプで前月・翌月のカレンダーを表示
	diaryWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]diaryWin.swipe:');
			if (e.direction == 'right') {
			diaryWin.remove(tableView);
			if(month===1){
				year--;
				month=12;
			}else{
				month--;
			}
		
			titleLabel.text = year+ '年' + month +'月';
			rows = getCalendarRowData(year,month);
			calendarRow = getCalendarTableViewRow(rows);
		
			tableView.setData(calendarRow);
			diaryWin.add(tableView);

		} else if (e.direction == 'left') {
			diaryWin.remove(tableView);
			if(month===12){
				year++;
				month=1;
			}else{
				month++;
			}
		
			titleLabel.text = year+ '年' + month +'月';
			rows = getCalendarRowData(year,month);
			calendarRow = getCalendarTableViewRow(rows);
			tableView.setData(calendarRow);
		
			diaryWin.add(tableView);
		}
	});

	return diaryWin;
}

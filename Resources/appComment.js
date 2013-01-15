// コメント

//var moment = require('moment.min');

exports.createWindow = function(style, model, util){
	var win = Ti.UI.createWindow(style.profileWin);

//	var profileScrollView = Ti.UI.createScrollView(style.profileScrollView);
	var profileScrollView = Ti.UI.createTableView(style.profileTableView);
		
	var iconView = Ti.UI.createView(style.profileIconView);
	profileScrollView.add(iconView);
			
	win.add(profileScrollView);
	
	return win;
}

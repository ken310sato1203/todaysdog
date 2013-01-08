// プロフィール

exports.createWindow = function(style, model, util){
	var win = Ti.UI.createWindow(style.profileWin);
	var profileView = Ti.UI.createView(style.profileView);
	win.add(profileView);

	return win;
}

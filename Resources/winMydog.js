// うちのわんこ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winMydog.createWindow:');

	var mydogWin = Ti.UI.createWindow(style.mydogWin);

	return mydogWin;
}

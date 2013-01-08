// コメント

//var moment = require('moment.min');

exports.createWindow = function(style, model, util){
/*
	Ti.API.debug('[func]appComment.createWindow:');
	var win = Ti.UI.createWindow(style.commentWin);

	var commentView = Ti.UI.createView(style.commentView);
	win.add(commentView);
	var commentField = Ti.UI.createTextField(style.commentField);	
	commentView.add(commentField);
	var commentButton = Ti.UI.createButton(style.commentButton);
	commentView.add(commentButton);	

	commentButton.addEventListener('click',function(e){
		Ti.API.debug('[event]commentButton.click:');
		var articleData = model.getCurrentArticleData();
		var no = articleData.no;
		var user = model.getUserId();
		var date = util.getFormattedDate();
		var text = commentField.getValue();
		
		var commentData = {no:no, user:user, date:date, text:text};
		model.addCommentData(commentData);
		win.close({animated:true});
	});

	return win;
*/
}

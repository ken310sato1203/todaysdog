// フォト

var profileWin = require('appProfile');

exports.createWindow = function(style, model, util){
	Ti.API.debug('[func]appPhoto.createWindow:');

	// ライクリストの表示件数
	var likeCount = 10;
	// コメントリストの表示件数
	var commentCount = 10;
	// 記事データの取得
	var articleData = model.getTargetArticleData();

	var win = Ti.UI.createWindow(style.photoWin);
	var photoTableView = Ti.UI.createTableView(style.photoTableView);
	win.add(photoTableView);

	// タイトルの表示
	var titleView = Ti.UI.createView(style.photoTitleView);
	var titleIconImage = Ti.UI.createImageView(style.photoTitleIconImage);
	titleIconImage.image = 'images/icon/' + articleData.user + '.jpg';
	var titleNameLabel = Ti.UI.createLabel(style.photoTitleNameLabel);
	titleNameLabel.text = articleData.user + '\n@' + articleData.loc;
	titleView.add(titleIconImage);
	titleView.add(titleNameLabel);
	win.titleControl = titleView;

	// 記事の表示
	var articleView = Ti.UI.createView(style.photoArticleView);
	var articleTableRow = Ti.UI.createTableViewRow(style.photoArticleTableRow);
	articleTableRow.add(articleView);
	photoTableView.appendRow(articleTableRow);					
	var photoImage = Ti.UI.createImageView(style.photoPhotoImage);
	photoImage.image = 'images/photo/' + articleData.no + '.jpg';
	var textLabel = Ti.UI.createLabel(style.photoTextLabel);
	textLabel.text = articleData.date.substring(0,10) + '\n' + articleData.text;			
	articleView.add(photoImage);
	articleView.add(textLabel);

	// ライクボタンの表示
	var likeButton = Ti.UI.createButton(style.photoLikeButton);
	if (model.checkLikeData(articleData.no, model.getUserId())) {
		likeButton.enabled = false;
		likeButton.backgroundColor = '#dedede';
	}
	var likeButtonIconImage = Ti.UI.createImageView(style.photoLikeButtonIconImage);
	likeButton.add(likeButtonIconImage);
	var likeButtonLabel = Ti.UI.createLabel(style.photoLikeButtonLabel);
	likeButton.add(likeButtonLabel);
	articleView.add(likeButton);

	// ライクリストの表示
	var likeTableRow = Ti.UI.createTableViewRow(style.photoLikeTableRow);
	photoTableView.appendRow(likeTableRow);

	// ライクリストの更新
	var updateLike = function() {
		Ti.API.debug('[func]updateLike:');
		var likeData = model.getLikeData(articleData.no, likeCount);
		Ti.API.debug('likeData:' + likeData);
		if (likeData.length > 0) {
			Ti.API.debug('likeData.length:' + likeData.length);
			likeTableRow.height = Ti.UI.SIZE;		
			var likeListView = Ti.UI.createView(style.photoLikeListView);
			likeTableRow.add(likeListView);
			var likeListIconImage = Ti.UI.createImageView(style.photoLikeListIconImage);
			likeListView.add(likeListIconImage);
			var likeListLabel = Ti.UI.createLabel(style.photoLikeListLabel);
			likeListView.add(likeListLabel);
			for (var i=0; i<likeData.length; i++) {
				likeListLabel.text += likeData[i].user + ', ';
			}
		}
	}
	// 初回読み込み時に、ライクリストの更新
	updateLike();
		
	// コメントリストの表示
	var commentTableRow = Ti.UI.createTableViewRow(style.photoCommentTableRow);
	photoTableView.appendRow(commentTableRow);

	// コメントリストの更新
	var updateComment = function() {
		Ti.API.debug('[func]updateComment:');
		var commentData = model.getCommentData(articleData.no, commentCount);
		Ti.API.debug('commentData:' + commentData);
		if (commentData.length > 0) {
			commentTableRow.height = Ti.UI.SIZE;		
			var commentListView = Ti.UI.createView(style.photoCommentListView);
			commentTableRow.add(commentListView);
			for (var i=0; i<commentData.length; i++) {
				var commentView = Ti.UI.createView(style.photoCommentView);
				commentListView.add(commentView);
				var commentIconImage = Ti.UI.createImageView(style.photoCommentIconImage);
				commentView.add(commentIconImage);
				var commentLabel = Ti.UI.createLabel(style.photoCommentLabel);
				commentView.add(commentLabel);
				commentLabel.text = commentData[i].user + ' ' + commentData[i].text + ' ' + commentData[i].date;
			}
		}
	}
	// 初回読み込み時に、コメントリストの更新
	updateComment();

	// コメントフィールドの表示
	var commentFieldTableRow = Ti.UI.createTableViewRow(style.photoCommentFieldTableRow);
	photoTableView.appendRow(commentFieldTableRow);
	var commentView = Ti.UI.createView(style.photoCommentView);
	commentFieldTableRow.add(commentView);
	var commentIconImage = Ti.UI.createImageView(style.photoCommentIconImage);
	commentView.add(commentIconImage);
	var commentField = Ti.UI.createTextField(style.photoCommentField);
	commentView.add(commentField);

	// フォトにタップでフォト拡大画面を表示
	photoImage.addEventListener('click',function(e){
		Ti.API.debug('[event]photoImage.click:');
		var photoFullWin = Titanium.UI.createWindow(style.photoPhotoFullWin);
		var photoFullImage = Ti.UI.createImageView(style.photoPhotoFullImage);
		photoFullImage.image = 'images/photo/' + articleData.no + '.jpg';
		photoFullWin.add(photoFullImage);

		photoFullWin.open({
			modal: true,
		    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
		    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
		    navBarHidden: true
		});

		// フォト拡大が面にタップで戻る
		photoFullImage.addEventListener('click',function(e){
			Ti.API.debug('[event]photoFullImage.click:');
			photoFullWin.close();
		});
	});

	// ライクボタンのクリックでライクリストに追加
	likeButton.addEventListener('click',function(e){
		Ti.API.debug('[event]likeButton.click:');
		var articleData = model.getTargetArticleData();
		var no = articleData.no;
		var user = model.getUserId();
		var date = util.getFormattedDate();
		
		var likeData = {no:no, user:user, date:date};
		model.addLikeData(likeData);
		likeButton.enabled = false;
		likeButton.backgroundColor = '#dedede';
		updateLike();
	});

	// コメントフィールドでキーボード確定でコメントリストに追加
	commentField.addEventListener('return',function(e){
		Ti.API.debug('[event]commentField.return:');
		var articleData = model.getTargetArticleData();
		var no = articleData.no;
		var user = model.getUserId();
		var date = util.getFormattedDate();
		var text = commentField.getValue();
		
		var commentData = {no:no, user:user, date:date, text:text};
		model.addCommentData(commentData);
		updateComment();
		commentField.value = "";
	});

	// 画面クリックでコメントフィールドのフォーカスを外す
	photoTableView.addEventListener('click',function(e){
		Ti.API.debug('[event]photoTableView.click:');
		commentField.blur();
	});

	// タイトルアイコンのクリックでプロフィールを表示
	titleIconImage.addEventListener('click',function(e){
		Ti.API.debug('[event]titleIconImage.click:');
		var win = profileWin.createWindow(style, model, util);
		// グローバル変数tabGroupを参照してWindowオープン
		tabGroup.tabs[0].open(win,{animated:true});
	});

	return win;
}

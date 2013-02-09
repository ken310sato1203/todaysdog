// フォト

exports.createWindow = function(_articleData){
	Ti.API.debug('[func]winPhoto.createWindow:');

	// ライクリストの表示件数
	var likeCount = 10;
	// コメントリストの表示件数
	var commentCount = 10;

	var photoWin = Ti.UI.createWindow(style.photoWin);

	// タイトルの表示
	var titleView = Ti.UI.createView(style.photoTitleView);
	var titleIconImage = Ti.UI.createImageView(style.photoTitleIconImage);
	titleIconImage.image = 'images/icon/' + _articleData.user + '.jpg';

	var titleNameLabel = Ti.UI.createLabel(style.photoTitleNameLabel);
	titleNameLabel.text = _articleData.user + '\n@' + _articleData.loc;
	titleView.add(titleIconImage);
	titleView.add(titleNameLabel);
	photoWin.titleControl = titleView;

	var photoTableView = Ti.UI.createTableView(style.photoTableView);
	photoWin.add(photoTableView);

	// 記事の表示
	var articleView = Ti.UI.createView(style.photoArticleView);
	var articleTableRow = Ti.UI.createTableViewRow(style.photoArticleTableRow);
	articleTableRow.add(articleView);
	photoTableView.appendRow(articleTableRow);					
	var photoImage = Ti.UI.createImageView(style.photoPhotoImage);
	photoImage.image = 'images/photo/' + _articleData.no + '.jpg';
	var textLabel = Ti.UI.createLabel(style.photoTextLabel);
	textLabel.text = _articleData.date.substring(0,10) + '\n' + _articleData.text;			
	articleView.add(photoImage);
	articleView.add(textLabel);

	// ライクボタンの表示
	var likeButton = Ti.UI.createButton(style.photoLikeButton);
	if (model.checkLikeList(_articleData.no, model.getLoginId())) {
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
		var likeList = model.getLikeList(_articleData.no, likeCount);
		Ti.API.debug('likeList:' + likeList);
		if (likeList.length > 0) {
			likeTableRow.height = Ti.UI.SIZE;		
			var likeListView = Ti.UI.createView(style.photoLikeListView);
			likeTableRow.add(likeListView);
			var likeListIconImage = Ti.UI.createImageView(style.photoLikeListIconImage);
			likeListView.add(likeListIconImage);
			var likeListLabel = Ti.UI.createLabel(style.photoLikeListLabel);
			likeListView.add(likeListLabel);
			for (var i=0; i<likeList.length; i++) {
				likeListLabel.text += likeList[i].user + ', ';
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
		var commentList = model.getCommentList(_articleData.no, commentCount);
		Ti.API.debug('commentList:' + commentList);
		if (commentList.length > 0) {
			commentTableRow.height = Ti.UI.SIZE;		
			var commentListView = Ti.UI.createView(style.photoCommentListView);
			commentTableRow.add(commentListView);
			for (var i=0; i<commentList.length; i++) {
				var commentView = Ti.UI.createView(style.photoCommentView);
				commentListView.add(commentView);
				var commentIconImage = Ti.UI.createImageView(style.photoCommentIconImage);
				commentView.add(commentIconImage);
				var commentLabel = Ti.UI.createLabel(style.photoCommentLabel);
				commentView.add(commentLabel);
				commentLabel.text = commentList[i].user + ' ' + commentList[i].text + ' ' + commentList[i].date;
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
		photoFullImage.image = 'images/photo/' + _articleData.no + '.jpg';
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
		var no = _articleData.no;
		var user = model.getLoginId();
		var date = util.getFormattedNowDateTime();
		
		var likeData = {no:no, user:user, date:date};
		model.addLikeList(likeData);
		likeButton.enabled = false;
		likeButton.backgroundColor = '#dedede';
		updateLike();
		// プロフィールのライク数を更新
		var loginData = model.getUser(loginId);
		loginData.like++;
	});

	// コメントフィールドでキーボード確定でコメントリストに追加
	commentField.addEventListener('return',function(e){
		Ti.API.debug('[event]commentField.return:');
		var no = _articleData.no;
		var user = model.getLoginId();
		var date = util.getFormattedNowDateTime();
		var text = commentField.getValue();
		
		var commentData = {no:no, user:user, date:date, text:text};
		model.addCommentList(commentData);
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
		var userData = model.getUser(_articleData.user);
		var profileWin = win.createProfileWindow(userData);

		// グローバル変数tabGroupを参照してWindowオープン
		tabGroup.activeTab.open(profileWin,{animated:true});
	});

	// 右スワイプで前の画面に戻る
	photoWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(photoWin);
		}
	});

	return photoWin;
}

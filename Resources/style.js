// スタイル

exports.style = {
// tab -------------------------------------------------------
	todayTab:function(win){
		return {
			window: win,
			icon: 'images/icon/light_globe.png',
			title: 'today',
		};
	},
	friendsTab:function(win){
		return {
			window: win,
			icon: 'images/icon/light_chat.png',
			title: 'friends',
		};
	},
	mydogTab:function(win){
		return {
			window: win,
			icon: 'images/icon/light_camera.png',
			title: 'mydog',
		};
	},
	scheduleTab:function(win){
		return {
			window: win,
			icon: 'images/icon/light_heart.png',
			title: 'news',
		};
	},
	profileTab:function(win){
		return {
			window: win,
			icon: 'images/icon/light_pegman.png',
			title: 'profile',
		};
	},

// winPhoto -------------------------------------------------------
	photoWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: 'フォト',
	},

	photoTableView:{ 
		bottom: '10dp',
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
		data: [],
	},
	photoArticleTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},

	photoTitleView:{
		layout: 'absolute',
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},
	photoTitleIconImage:{
		left: '0dp',
		width: '28dp',
		height: '28dp',
		backgroundColor: 'black',
	},
	photoTitleNameLabel:{
		left: '33dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue', fontWeight:'bold'},
		color: 'white',
//		shadowOffset: {x:0,y:-1},
//		shadowColor: '#696969', 
	},

	photoArticleView:{
		layout: 'vertical',
		top: '10dp',
	    bottom: '5dp',
		width: '224dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	photoPhotoImage:{
		top: '10dp',
		width: '200dp',
		height: '200dp',
		backgroundColor: 'black',
		// カスタムプロパティ
		articleData: null,
	},
	photoTextLabel:{
		top: '10dp',
	    bottom: '5dp',
		width: '200dp',
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	photoButtonView:{
		layout: 'absolute',
		top: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},

	photoLikeButton:{
		top: '0dp',
		right: '85dp',
	    bottom: '10dp',
		width: '70dp',
		height: '22dp',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		// iOSではbackgroundSelectedColorが対応していない
//		backgroundSelectedColor: 'blue',
		borderColor: '#dedede',
		borderWidth: 1.5,
		borderRadius: 5,
		// カスタムプロパティ
		clickFlag: false,
	},
	photoLikeButtonIconImage:{
		left: '5dp',
		width: '18dp',
		height: '18dp',
		image: 'images/icon/like.gif',
	},
	photoLikeButtonLabel:{
		right: '5dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'わんポチ',
	},

	photoCommentButton:{
		top: '0dp',
		right: '10dp',
	    bottom: '10dp',
		width: '70dp',
		height: '22dp',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		// iOSではbackgroundSelectedColorが対応していない
//		backgroundSelectedColor: 'blue',
		borderColor: '#dedede',
		borderWidth: 1.5,
		borderRadius: 5,
	},
	photoCommentButtonIconImage:{
		left: '5dp',
		width: '15dp',
		height: '15dp',
		image: 'images/icon/light_comment.png',
	},
	photoCommentButtonLabel:{
		right: '5dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'わんコメ',
	},
	
	photoLikeCountTableRow:{ 
		// ライクがない場合に間を詰めるため高さを1dpに指定（0dpだと指定されないので1dp）
		height: '1dp',
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	photoLikeCountView:{
		layout: 'horizontal',
		top: '3dp',
		width: '226dp',
		height: Ti.UI.SIZE,
	},
	photoLikeCountIconImage:{
		top: '0dp',
		left: '0dp',
		width: '18dp',
		height: '18dp',
		image: 'images/icon/like.gif',
	},
	photoLikeCountLabel:{
		top: '5dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: null,
	},

	photoLikeTableRow:{
		// ライクがない場合に間を詰めるため高さを1dpに指定（0dpだと指定されないので1dp）
		height: '1dp',
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	photoLikeListView:{
		layout: 'horizontal',
		top: '2dp',
		width: '226dp',
		height: Ti.UI.SIZE,
	},
	photoLikeView:{
		top: '0dp',
		left: '1dp',
		width: '44dp',
		height: '44dp',
		backgroundColor: 'white',
	},
	photoLikeUserIconImage:{
		top: '4dp',
		bottom: '4dp',
		width: '36dp',
		height: '36dp',
	},
	photoLikeIconImage:{
		width: '18dp',
		height: '18dp',
		image: 'images/icon/like.gif',
	},

	photoCommentCountTableRow:{ 
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	photoCommentCountView:{
		layout: 'horizontal',
		top: '5dp',
		width: '226dp',
		height: Ti.UI.SIZE,
	},
	photoCommentCountIconImage:{
		top: '0dp',
		left: '0dp',
		width: '18dp',
		height: '18dp',
		image: 'images/icon/light_comment.png',
	},
	photoCommentCountLabel:{
		top: '5dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	photoCommentTableRow:{ 
		top: '5dp',
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	photoCommentListView:{
		layout: 'vertical',
		top: '3dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	photoCommentView:{
		top: '0dp',
	    bottom: '1dp',
		width: '224dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	photoCommentUserIconImage:{
		top: '4dp',
		bottom: '4dp',
		left: '4dp',
		width: '36dp',
		height: '36dp',
	},
	photoCommentLabel:{
		top: '4dp',
		left: '46dp',
		right: '5dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: null,
	},

	photoCommentFieldTableRow:{ 
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	photoCommentField:{
		top: '0dp',
		left: '20dp',
	    bottom: '10dp',
		width: '240dp',
		height: '22dp',
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor:'#bbb',
		borderRadius: 0,
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		hintText: 'comment',
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType:Ti.UI.RETURNKEY_SEND,
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	},

	photoPhotoFullWin:{
		backgroundColor: 'black',
	},
	photoPhotoFullImage:{
		top: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: 'black',
	},

// winProfile -------------------------------------------------------
	profileWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: 'プロフィール',
	},

	profileScrollView:{
		contentWidth:'auto',
		contentHeight:'auto',
		top:0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true,
		backgroundColor: '#dedede',
	},

	profileTableView:{ 
		top: '10dp',
		width: '284dp',
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		scrollable: false,
		data: [],
	},
	profileCountTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},

	profileTitleView:{
		layout: 'absolute',
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},

	profileTitleLabel:{
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'プロフィール', 
	},

	profileFollowButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		// ヘッダのボタンのテキストの色が反映できない
//		color: '#000',
		title: 'フォローする',
	},
	profileUnfollowButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		title: 'フォロー中',
	},
	profileSaveButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		title: '保存する',
	},

	profileActivityIndicator:{
		backgroundColor: 'black',
		opacity: 0.7,
		width: '100%',
		height: '100%',
		style: Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
		font: {fontSize:14, fontWeight:'bold'},
		color: 'white',
		message: 'Loading...',
	},
				
	profileCountView:{
		layout: 'absolute',
		top: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	profileIconView:{
		layout: 'vertical',
		top: '0dp',
		left: '0dp',
		width: '56dp',
		height: '56dp',
		backgroundColor: 'white',
	},
	profileIconImage:{
		top: '4dp',
		left: '4dp',
		width: '48dp',
		height: '48dp',
		backgroundColor: 'black',
	},

	profileCountPhotoView:{
		layout: 'vertical',
		top: '0dp',
		left: '57dp',
		width: '56dp',
		height: '56dp',
		backgroundColor: 'white',
	},
	profileCountPhotoLabel:{
		top: '10dp',
		textAlign: 'center',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileCountPhotoUnitLabel:{
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'フォト',
	},

	profileCountLikeView:{
		layout: 'vertical',
		top: '0dp',
		left: '114dp',
		width: '56dp',
		height: '56dp',
		backgroundColor: 'white',
	},
	profileCountLikeLabel:{
		top: '10dp',
		textAlign: 'center',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileCountLikeUnitLabel:{
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'わんポチ',
	},

	profileCountFollowerView:{
		layout: 'vertical',
		top: '0dp',
		left: '171dp',
		width: '56dp',
		height: '56dp',
		backgroundColor: 'white',
	},
	profileCountFollowerLabel:{
		top: '10dp',
		textAlign: 'center',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileCountFollowerUnitLabel:{
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'フォロワ',
	},

	profileCountFollowView:{
		layout: 'vertical',
		top: '0dp',
		left: '228dp',
		width: '56dp',
		height: '56dp',
		backgroundColor: 'white',
	},
	profileCountFollowLabel:{
		top: '10dp',
		textAlign: 'center',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileCountFollowUnitLabel:{
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'フォロー',
	},

	profileListTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
//		selectedBackgroundColor: 'white',
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	profileListItemView:{
		layout: 'absolute',
		top: '0dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},


	profileListItemLabel:{
		left: '15dp',
		height: '35dp',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileListValueLabel:{
		right: '15dp',
		height: '35dp',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		color: '#3D4460',
	},
	profileListValueField:{
		right: '15dp',
		textAlign:'right',
		width: '166dp',
		height: '35dp',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		hintText: 'なまえを入力してください',
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
//      returnKeyType:Ti.UI.RETURNKEY_SEND,
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_NONE,
        touchEnabled: false,
//      enabled: false,
	},

	profileListPickerView:{
		bottom: '-259dp',
		height: '259dp',
	},
	profileListPickerToolbar:{
		top: '0dp',
		items: null,
	},
	profileListCancelButton:{
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
		title: 'Cancel',
	},
	profileListSpacerButton:{
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
	},
	profileListDoneButton:{
		style:Ti.UI.iPhone.SystemButtonStyle.DONE,
		title: 'Done',
	},
	profileListPicker:{
		top: '43dp',
		selectionIndicator: true,
	},
	profileListDatePicker:{
		top: '43dp',
		selectionIndicator: true,
		type:Ti.UI.PICKER_TYPE_DATE,
		minDate:new Date(1980,1,1),
		maxDate:new Date(2020,12,31),
		value: null,
	},

// winPhotoList -------------------------------------------------------
	photoListWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
	},

	photoListTitleView:{
		layout: 'absolute',
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},

	photoListUpdateButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		title: '更新する',
	},

	photoListTodayTitleLabel:{
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: '今日のわんこ', 
	},

	photoListFirendsTitleLabel:{
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'わんとも', 
	},

	photoListPhotoTitleLabel:{
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'フォト', 
	},

	photoListLikeTitleLabel:{
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'わんポチ', 
	},

	photoListTableView:{ 
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
		data: [],
	},
	photoListArticleTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	photoListNextTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},

	photoListArticleListView:{
		layout: 'horizontal',
		top: '0dp',
		width: '320dp',
		height: Ti.UI.SIZE,
	},
	photoListArticleView:{
		layout: 'vertical',
		top: '5dp',
		left: '5dp',
		width: '100dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	photoListPhotoImage:{
		top: '5dp',
		width: '90dp',
		height: '90dp',
		backgroundColor: 'black',
		// カスタムプロパティ
		articleData: null,
	},
	photoListTextLabel:{
		top: '2dp',
	    bottom: '2dp',
		width: '90dp',
		height: '15dp',
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	photoListFriendsArticleListView:{
		layout: 'horizontal',
		top: '0dp',
		width: '280dp',
		height: Ti.UI.SIZE,
	},
	photoListFriendsArticleView:{
		layout: 'vertical',
		top: '5dp',
		left: '10dp',
		width: '125dp',
		height: '176dp',
		backgroundColor: 'white',
	},
	photoListFriendsPhotoImage:{
		top: '6dp',
		width: '113dp',
		height: '113dp',
		backgroundColor: 'black',
		// カスタムプロパティ
		articleData: null,
	},
	photoListFriendsNameLabel:{
		top: '3dp',
		width: '105dp',
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	photoListFriendsTextLabel:{
		top: '0dp',
		width: '105dp',
		height: '18dp',
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	photoListFriendsCountView:{
		layout: 'horizontal',
		top: '0dp',
	    bottom: '5dp',
		width: '105dp',
		height: Ti.UI.SIZE,
	},
	photoListFriendsLikeIconImage:{
		top: '0dp',
	    bottom: '2dp',
		left: '0dp',
		width: '18dp',
		height: '18dp',
		image: 'images/icon/like.gif',
	},
	photoListFriendsLikeLabel:{
		left: '6dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	photoListFriendsCommentIconImage:{
		top: '2dp',
		left: '12dp',
		width: '15dp',
		height: '15dp',
		image: 'images/icon/light_comment.png',
	},
	photoListFriendsCommentLabel:{
		left: '8dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	photoListNextView:{
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: '40dp',
		backgroundColor: '#dedede',
	},
	photoListNextButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	photoListNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'データがありません'
	},
	photoListTableHeader:{
		width: '320dp',
		height: '60dp',
//		backgroundColor: '#dedede',
	},	    
	photoListHeaderBorder:{
	    bottom: '0dp',
		height: '0dp',
	},	    
	photoListUpdateArrowImage:{
	    image:'images/whiteArrow.png',
	    left: '20dp',
	    bottom: '10dp',
	    width: '23dp',
	    height: '60dp',
	},
	photoListPullLabel:{
	    left: '55dp', 
	    bottom: '30dp',
	    width: '200dp',
	    color:'white',
	    font: {fontSize:13, fontWeight:'bold'},
	    text: 'Pull down to refresh...',
	    textAlign: 'center',
	},
	photoListLastUpdatedLabel:{
	    left: '55dp',
	    bottom: '15dp',
	    width: '200dp',
	    color: 'white',
	    font: {fontSize:12},
	    textAlign: 'center',
	},
	photoListUpdateIndicator:{
	    left: '20dp',
	    bottom: '13dp',
	    width: '30dp',
	    height: '30dp',
	    image:'images/whiteArrow.png',
	    left: '20dp',
	    bottom: '10dp',
	    width: '23dp',
	    height: '60dp',
	},	

// winUserList -------------------------------------------------------
	userListWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
	},

	userListTitleView:{
		layout: 'absolute',
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},

	userListFollowerTitleLabel:{
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'フォロワー', 
	},

	userListFollowTitleLabel:{
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'フォロー', 
	},

	userListTableView:{ 
		top: '10dp',
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
		data: [],
	},
	userListUserTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	userListNextTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	userListUserListView:{
		layout: 'vertical',
		top: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	userListUserView:{
		top: '0dp',
		bottom: '1dp',
		width: '284dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	userListIconImage:{
		top: '4dp',
		bottom: '4dp',
		left: '4dp',
		width: '48dp',
		height: '48dp',
		backgroundColor: 'black',
		// カスタムプロパティ
		userData: null,
	},
	userListTextLabel:{
		left: '60dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	userListNextView:{
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: '40dp',
		backgroundColor: '#dedede',
	},
	userListNextButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	userListNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'データがありません'
	},

	userFollowButton:{
		right: '10dp',
		width: '80dp',
		height: '22dp',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		borderColor: '#dedede',
		borderWidth: 1.5,
		borderRadius: 5,
		// カスタムプロパティ
		user: null,
		clickFlag: false,
	},
	userFollowButtonLabel:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'フォローする',
	},

// winCommentList -------------------------------------------------------
	commentListWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
	},

	commentListTitleView:{
		layout: 'absolute',
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},

	commentListTitleLabel:{
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'コメント', 
	},

	commentListTableView:{ 
		top: '10dp',
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
		data: [],
	},
	commentListUserTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	commentListNextTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	commentListUserListView:{
		layout: 'vertical',
		top: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	commentListUserView:{
		top: '0dp',
		bottom: '1dp',
		width: '284dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
		// カスタムプロパティ
		objectName: 'commentListUserView',
		commentData: null,
		deleteButton: null,
	},
	commentListIconImage:{
		top: '4dp',
		bottom: '4dp',
		left: '10dp',
		width: '48dp',
		height: '48dp',
		backgroundColor: 'black',
		// カスタムプロパティ
		objectName: 'commentListIconImage',
		commentData: null,
	},
	commentListTextLabel:{
		left: '65dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		// カスタムプロパティ
		objectName: 'commentListTextLabel',
	},
/*
	commentListDeleteButton:{
		right: '15dp',		
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
//		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '削除',
		visible: false,
	},
*/
	commentListDeleteButton:{
		right: '15dp',
		width: '40dp',
		height: '22dp',
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
		// iOSではbackgroundSelectedColorが対応していない
//		backgroundSelectedColor: 'blue',
		backgroundColor: '#CD5C5C',
		borderColor: '#000',
		borderWidth: 0.5,
		borderRadius: 5,
		font: {fontSize:10, fontFamily:'Helvetica Neue',fontWeight:'bold'},
		color: 'white',
		title: '削除',
		visible: false,
	},
	commentListDeleteButtonLabel:{
		right: '5dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: '削除',
	},

	commentListNextView:{
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: '40dp',
		backgroundColor: '#dedede',
	},
	commentListNextButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	commentListNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'データがありません',
	},


// winFriends -------------------------------------------------------
	friendsWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: '犬とも',
	},

// winMydog -------------------------------------------------------
	mydogWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
	},
	mydogTitleLabel:{
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'うちのわんこ', 
	},

	mydogCalendarButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		title: 'カレンダー',
	},

	mydogTableView:{ 
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
		data: [],
	},
	mydogArticleTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	mydogArticleSlideView:{
		layout: 'horizontal',
		top: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	mydogArticleView:{
		layout: 'vertical',
		top: '10dp',
	    bottom: '5dp',
		width: '224dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	mydogPhotoImage:{
		top: '10dp',
		width: '200dp',
		height: '200dp',
		backgroundColor: 'black',
		// カスタムプロパティ
		articleData: null,
	},
	mydogTextLabel:{
		top: '10dp',
	    bottom: '5dp',
		width: '200dp',
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:10, fontFamily:'Helvetica Neue'},
		color: '#000',
	},


// winCalendar -------------------------------------------------------
	calendarWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
	},
	calendarTitleLabel:{
		width: '200dp',
		textAlign: 'center',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
	},

	calendarHeaderView:{
		layout : 'horizontal',
		top : '0dp',
		width : '322dp',
		height : '20dp',
		backgroundColor : '#F5F5F5',
	},
	calendarHeaderLabel:{
		top : '0dp',
		left : '0dp',
		width : '46dp',
		height : '20dp',
		text : null,
		textAlign : 'center',
		font : {fontSize:12, fontWeight:'bold'},
		color : '#3a4756'
	},

	calendarDayView:{
		width : '46dp',
		height : '58dp',
		backgroundColor : null,
		borderColor : '#FFDCDCDF',
		// カスタムプロパティ
		objectName : 'calendarDayView',
		dayImage: null,
		dayLabel: null,
		year : null,
		month : null,
		day : null,
		current : null,
	},
	calendarDayImage:{
		top : '3dp',
		width : '40dp',
		height : '40dp',
		backgroundColor: 'black',
		image : null,
		// カスタムプロパティ
		objectName : 'calendarDayImage',
	},
	calendarDayLabel:{
		bottom : '1dp',
		left : '4dp',
		font : {fontSize:11, fontWeight:'bold'},
		color : null,
		text : null,
		// カスタムプロパティ
		objectName : 'calendarDayLabel',
	},

	calendarCalView:{
		layout : 'horizontal',
		top : '21dp',
		width : '322dp',
		height : 'auto',
	},


// winSchedule -------------------------------------------------------
	scheduleWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
	},

};


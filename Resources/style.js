// スタイル

exports.style = {

// common -------------------------------------------------------	
	commonSize:{
		// 計算で遣う数値なので'dp'はつけない
		screenWidth: Ti.Platform.displayCaps.platformWidth,
	},

	commonActivityIndicator:{
		backgroundColor: 'black',
		opacity: 0.7,
		width: '100%',
		height: '100%',
		style: Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
		font: {fontSize:14, fontWeight:'bold'},
		color: 'white',
		message: 'Loading...',
	},

	commonTableHeader:{
		width: Ti.Platform.displayCaps.platformWidth + 'dp',
		height: '60dp',
//		backgroundColor: '#dedede',
	},	    
	commonHeaderBorder:{
	    bottom: '0dp',
		height: '0dp',
	},	    
	commonUpdateArrowImage:{
	    image:'images/whiteArrow.png',
	    left: '20dp',
	    bottom: '10dp',
	    width: '23dp',
	    height: '60dp',
	},
	commonPullLabel:{
	    left: '55dp', 
	    bottom: '30dp',
	    width: '200dp',
	    color:'white',
	    font: {fontSize:13, fontWeight:'bold'},
	    text: 'Pull down to refresh...',
	    textAlign: 'center',
	},
	commonLastUpdatedLabel:{
	    left: '55dp',
	    bottom: '15dp',
	    width: '200dp',
	    color: 'white',
	    font: {fontSize:12},
	    textAlign: 'center',
	},
	commonUpdateIndicator:{
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
	
// tab -------------------------------------------------------
	tabGroupHidden:{
		// カスタムプロパティ
	},
	tabHidden:{
		// カスタムプロパティ
	},
	tabGroupView:{
		layout: 'horizontal',
		// ステータスバー(20)＋タイトルバー(44)が座標の開始位置なので、その分とタブバーの高さを引く
//		top: (Ti.Platform.displayCaps.platformHeight - 108) + 'dp',
		bottom: '0dp',
		left: '0dp',
		width: '100%',
		height: '44dp',
		backgroundColor: '#e74c3c',
//		backgroundColor: '#d86853',
//		backgroundColor: '#48a59b',
//		backgroundColor: '#676769',
//		backgroundColor: '#ed9764',
//		backgroundColor: '#423737',
//		backgroundColor: '#6ea1c9',
//		backgroundColor: '#c67267',
//		backgroundColor: '#63768a',
//		backgroundColor: '#61594e',
	},
	tabView:{
//		layout: 'vertical',
		top: '0dp',
		left: '0dp',
		width: '80dp',
		height: '44dp',
	},
	tabImage:{
//		top: '3dp',
		width: '28dp',
		height: '28dp',
		bubbleParent: true,
		// カスタムプロパティ
		tabIndex: null,
	},
	tabLabel:{
		top: '1dp',
		width: '60dp',
		height: '10dp',
		textAlign: 'center',
		font: {fontSize:10, fontFamily:'Helvetica Neue', fontWeight:'bold'},
		color: 'white',
	},

// winPhoto -------------------------------------------------------
	photoWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
		title: 'フォト',
		// カスタムプロパティ
		prevWin : null,
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

	photoTableView:{ 
//		bottom: '10dp',
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		data: [],
	},
	photoArticleTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
	},

	photoArticleView:{
		layout: 'vertical',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	photoPhotoView:{
		width: Ti.Platform.displayCaps.platformWidth + 'dp',
		height: (Ti.Platform.displayCaps.platformWidth * 3 / 4) + 'dp',
		backgroundColor: 'white',
	},
	photoPhotoImage:{
		top: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: 'black',
		// カスタムプロパティ
		articleData: null,
	},
	photoArticleTextView:{
		layout: 'horizontal',
		top: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	photoTextView:{
		layout: 'vertical',
		top: '5dp',
		bottom: '5dp',
		left: '10dp',
		right: '10dp',
		// photoLikeStampImage(10+55)と余白（10+10）を除いたサイズ
		width: (Ti.Platform.displayCaps.platformWidth - 85) + 'dp',
		height: Ti.UI.SIZE,
	},
	photoNameLabel:{
		top: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	photoTextLabel:{
		top: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	photoTimeLabel:{
		top: '5dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#696969',
	},
	photoLikeStampImage:{
//		top: '5dp',
		bottom: '5dp',
		right: '10dp',
		width: '55dp',
		height: '55dp',
		image: 'images/icon/b_like.png',
		// カスタムプロパティ
		clickFlag: false,
	},

	photoButtonView:{
		layout: 'absolute',
		top: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},

	photoLikeButton:{
		layout: 'horizontal',
		top: '0dp',
		right: '90dp',
	    bottom: '10dp',
		width: Ti.UI.SIZE,
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
		left: '1dp',
		right: '5dp',
		width: Ti.UI.SIZE,
		height: '22dp',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'わんポチ',
	},

	photoCommentButton:{
		layout: 'horizontal',
		top: '0dp',
		right: '10dp',
	    bottom: '10dp',
		width: Ti.UI.SIZE,
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
		left: '1dp',
		right: '5dp',
		width: Ti.UI.SIZE,
		height: '22dp',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		tabBarHidden: true,
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
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		// ヘッダのボタンのテキストの色が反映できない
//		color: '#000',
		title: 'フォローする',
	},
	profileUnfollowButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		title: 'フォロー中',
	},
	profileSaveButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		title: '保存する',
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'フォロー',
	},

	profileListTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
//		selectedBackgroundColor: 'white',
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		// カスタムプロパティ
		objectName: null,
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
	profileListValueField:{
		right: '15dp',
		textAlign:'right',
		width: '166dp',
		height: '35dp',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		hintText: '入力してください',
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType:Ti.UI.RETURNKEY_DONE,
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
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		width: Ti.Platform.displayCaps.platformWidth + 'dp',
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
		top: '3dp',
	    bottom: '3dp',
		width: '90dp',
		height: '15dp',
		textAlign: 'left',
		font: {fontSize:11, fontFamily:'Helvetica Neue'},
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
//		height: '176dp',
		height: Ti.UI.SIZE,
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
		font: {fontSize:11, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	photoListFriendsTextLabel:{
		top: '0dp',
		width: '105dp',
		height: '18dp',
		textAlign: 'left',
		font: {fontSize:11, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	photoListFriendsCountView:{
		layout: 'horizontal',
		top: '0dp',
	    bottom: '3dp',
		width: '105dp',
		height: Ti.UI.SIZE,
	},
	photoListFriendsLikeIconImage:{
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
		font: {fontSize:11, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	photoListFriendsCommentIconImage:{
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
		font: {fontSize:11, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	photoListNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'データがありません'
	},

// winUserList -------------------------------------------------------
	userListWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
		// カスタムプロパティ
		prevWin : null,
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
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		data: [],
	},
	userListUserTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
	},
	userListNextTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	userListNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'フォローする',
	},

// winCommentList -------------------------------------------------------
	commentListWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
		// カスタムプロパティ
		prevWin : null,
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
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		data: [],
	},
	commentListUserTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
	},
	commentListNextTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
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
		left: '4dp',
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue',fontWeight:'bold'},
		color: 'white',
		title: '削除',
		visible: false,
	},
	commentListDeleteButtonLabel:{
		right: '5dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	commentListNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'データがありません',
	},


// winMydog -------------------------------------------------------
	mydogWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
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
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		title: 'カレンダー',
	},

	mydogCameraButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		title: 'カメラ',
		systemButton:Titanium.UI.iPhone.SystemButton.CAMERA,
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
	    bottom: '8dp',
		width: '200dp',
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
	},


// winCalendar -------------------------------------------------------
	calendarWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
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
		width : Ti.Platform.displayCaps.platformWidth + 'dp',
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
		font : {fontSize:11, fontWeight:'bold'},
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
		articleData : null,
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
		width : Ti.Platform.displayCaps.platformWidth + 'dp',
		height : 'auto',
	},

// winCamera -------------------------------------------------------
	cameraWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
	},
	cameraTitleLabel:{
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'カメラ', 
	},

	cameraPostButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		title: '投稿',
	},

	cameraArticleView:{
		layout : 'horizontal',
		top : '10dp',
		left: '10dp',
		width : '302dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	cameraArticleImage:{
		top : '5dp',
		left: '5dp',
		bottom : '5dp',
		width : '70dp',
		height : '70dp',
		backgroundColor: 'black',
		image : null,
	},
	cameraArticleTextArea:{
		top : '5dp',
		left: '0dp',
		bottom : '5dp',
		width: '226dp',
		height : '70dp',
		backgroundColor: 'white',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: 'gray',
		// hintTextはiOSで対応されていないので、focus/blur時に処理
		hintText: 'comment',
		value: 'comment',
		suppressReturn: false,
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
//        returnKeyType:Ti.UI.RETURNKEY_SEND,
	},

// winDiary -------------------------------------------------------
	diaryWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
		// カスタムプロパティ
		nextWin: null,
	},
	diaryTitleView:{
		top: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},

	diaryTitleLabel:{
		width: Ti.UI.SIZE,
		left: '10dp',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
	},

	diaryTitleTabbedBar:{
		width: '130dp',
		height: '30dp',
		backgroundColor: '#b6b6b6',
		style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    labels: ['Month', 'Day'],
	    index: 1,
	},

	diaryTableView:{
		top: '1dp',
		left: '0dp',
		width: Ti.Platform.displayCaps.platformWidth + 'dp',
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
		separatorStyle : Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		data: [],
	},
	diaryTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		// カスタムプロパティ
		diaryData: null,
	},

	diaryDayView:{
		top: '0dp',
		bottom: '1dp',
		width: '100%',
		height: '44dp',
		backgroundColor : 'white',
	},
	diaryDayLabel:{
		top: '5dp',
		left: '8dp',
		width: '30dp',
		height: Ti.UI.SIZE,
		textAlign: 'center',
		font : {fontSize:17, fontWeight:'bold'},
		color: '#3a4756',
	},
	diaryWeekdayLabel:{
		top: '25dp',
		left: '8dp',
		width: '30dp',
		height: Ti.UI.SIZE,
		textAlign: 'center',
		font : {fontSize:11, fontWeight:'bold'},
	},
	diaryTodayView:{
		top: '0dp',
		left: '0dp',
		width: '7dp',
		height: '100%',
		backgroundColor : '#87CEFA',
	},
	diaryStampView:{
		layout : 'horizontal',
		left: '45dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	diaryStampImage:{
		width : '32dp',
		height : '32dp',
		image : null,
	},
	diaryPhotoImage:{
		top: '6dp',
		right: '8dp',
		width : '32dp',
		height : '32dp',
		image : 'images/icon/diary_camera.png',
		// カスタムプロパティ
		articleData: null,
		objectName : 'diaryPhotoImage',
	},

// winTime -------------------------------------------------------
	timeWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
		// カスタムプロパティ
		prevWin : null,
		openFlag : false,
	},
	timeTitleView:{
		top: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},

	timeTitleLabel:{
		width: Ti.UI.SIZE,
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
	},

	timeTitleTabbedBar:{
		width: '130dp',
		height: '30dp',
		backgroundColor: '#b6b6b6',
		style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    labels: ['Month', 'Day'],
	    index: 1,
	},

	timeListButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		title: 'リスト',
		// カスタムプロパティ
		listFlag : false,
	},
	timeTableView:{
		top: '1dp',
		left: '0dp',
		width: Ti.Platform.displayCaps.platformWidth + 'dp',
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
		separatorStyle : Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		data: [],
	},
	timeTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		// カスタムプロパティ
		timeData: null,
	},

	timeHourView:{
		top: '0dp',
		bottom: '1dp',
		width: '100%',
		height: Ti.UI.SIZE,
		backgroundColor : 'white',
	},
	timeHourLabel:{
		top: '0dp',
		left: '8dp',
		width: '34dp',
		height: '44dp',
		textAlign: 'right',
		font : {fontSize:12, fontWeight:'bold'},
		color: '#3a4756',
	},
	timeTodayView:{
		top: '0dp',
		left: '0dp',
		width: '7dp',
		height: '100%',
		backgroundColor : '#87CEFA',
	},
	timeStampListView:{
		layout: 'vertical',
		top: '0dp',
		bottom: '6dp',
		left: '47dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		// カスタムプロパティ
		objectName : 'timeStampListView',
	},
	timeStampView:{
		top: '6dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		// カスタムプロパティ
		stampData : null,
		objectName : 'timeStampView',
	},
	timeStampImage:{
		top: '0dp',
		left: '0dp',
		width : '32dp',
		height : '32dp',
		image : null,
		// カスタムプロパティ
		objectName : 'timeStampImage',
	},
	timeStampLabel:{
		left: '36dp',
		width: '195dp',
		height: Ti.UI.SIZE,
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		// カスタムプロパティ
		objectName : 'timeStampLabel',
	},
	timePlusImage:{
		top: '8dp',
		right: '8dp',
		width : '28dp',
		height : '28dp',
		image : 'images/icon/diary_plus.png',
	},

// winFriends -------------------------------------------------------
	friendsWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
		title: 'わんとも',
	},

	friendsTitleView:{
		layout: 'absolute',
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},

	friendsUpdateButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		title: '更新する',
	},

	friendsTableView:{ 
		separatorColor: 'transparent',
		data: [],
	},
	friendsArticleTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	friendsNextTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	friendsDateTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},

	friendsDateView:{
		top: '0dp',
		width: '100%',
		height: '30dp',
		backgroundColor: '#eeeeee',
	},
	friendsDateLabel:{
		left: '10dp',
//		font: {fontSize:15, fontWeight:'bold'},
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		color: '#696969',
	},

	friendsArticleListView:{
		layout: 'vertical',
		top: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	friendsArticleView:{
		layout: 'horizontal',
		top: '0dp',
		bottom: '1dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	friendsUserIconImage:{
		top: '5dp',
		bottom: '5dp',
		left: '10dp',
		width: '55dp',
		height: '55dp',
		// カスタムプロパティ
		articleData: null,
	},
	friendsTextView:{
		layout: 'vertical',
		top: '5dp',
		bottom: '5dp',
		left: '10dp',
		right: '10dp',
		// friendsUserIconImageの幅(10+55)と余白（10+10）を除いたサイズ
		width: (Ti.Platform.displayCaps.platformWidth - 85) + 'dp',
		height: Ti.UI.SIZE,
	},
	friendsNameLabel:{
		top: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	friendsTextLabel:{
		top: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	friendsTimeView:{
		top: '5dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
	},
	friendsTimeLabel:{
		bottom: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'right',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#696969',
	},

	friendsCountView:{
		layout: 'horizontal',
		top: '0dp',
		right: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	friendsLikeIconImage:{
		left: '0dp',
		width: '18dp',
		height: '18dp',
		image: 'images/icon/like.gif',
	},
	friendsLikeLabel:{
		left: '6dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:11, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	friendsCommentIconImage:{
		left: '12dp',
		width: '15dp',
		height: '15dp',
		image: 'images/icon/light_comment.png',
	},
	friendsCommentLabel:{
		left: '8dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:11, fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	friendsNextView:{
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: '40dp',
//		backgroundColor: '#dedede',
	},
	friendsNextButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
		textAlign: 'center',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	friendsNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'データがありません'
	},
	
// winToay -------------------------------------------------------
	todayWin:{
		backgroundColor: 'white',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		backButtonTitleImage: 'images/icon/titlebar.png',
		// タイトルバーを隠す
//		navBarHidden: true,
		tabBarHidden: true,
		// カスタムプロパティ
		prevWin : null,
	},
	todayTitleLabel:{
		width: '200dp',
		textAlign: 'center',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
//		text: '今日のわんこ', 
		text: (Ti.Platform.displayCaps.platformHeight - 100) + 'dp',
	},

	todayTableView:{
		top: '0dp',
		height: Ti.UI.SIZE,
		separatorColor: 'transparent',
		separatorStyle : Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		data: [],
	},
	todayTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
	},

	todayPhotoView:{
		width: Ti.Platform.displayCaps.platformWidth + 'dp',
		height: (Ti.Platform.displayCaps.platformWidth * 3 / 4) + 'dp',
		backgroundColor: '#eeeeee',
	},
	todayPhotoImage:{
		top: '0dp',
//		width: Ti.Platform.displayCaps.platformWidth + 'dp',
//		height: (Ti.Platform.displayCaps.platformWidth * 3 / 4) + 'dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		image : null,
		// カスタムプロパティ
		displayFlag: false,
	},
	todayCameraImage:{
		width: '64dp',
		height: '64dp',
		image: 'images/icon/b_camera.png',
	},
	todayDiaryView:{
		layout: 'horizontal',
		top: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		// 画面の最下部まで表示
		height: Ti.Platform.displayCaps.platformHeight - (Ti.Platform.displayCaps.platformWidth * 3 / 4) + 'dp',
		enabled: false,
		backgroundColor: 'white',
	},
	todayDayView:{
		layout: 'vertical',
		top: '0dp',
		width: '80dp',
		height: Ti.UI.SIZE,
		enabled: false,
		backgroundColor: 'white',
	},
	todayDayLabel:{
		top: '10dp',
		width: '100%',
		height: Ti.UI.SIZE,
		textAlign: 'center',
		font : {fontSize:18, fontWeight:'bold'},
		color: '#3a4756',
	},
	todayWeekdayLabel:{
		top: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
		textAlign: 'center',
		font : {fontSize:14, fontWeight:'bold'},
	},
	todayEditImage:{
		top: '3dp',
		width : '64dp',
		height : '64dp',
		image : 'images/icon/b_edit.png',
		backgroundColor: 'white',
	},
	todayTimeTableView:{
		top: '5dp',
		height: Ti.UI.SIZE,
		separatorColor: 'transparent',
		separatorStyle : Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		scrollable: false,
		data: [],
	},
	todayTimeTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		// カスタムプロパティ
		timeData: null,
	},
	todayTimeStampView:{
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
		// カスタムプロパティ
		stampData : null,
		objectName : 'todayTimeStampView',
	},
	todayTimeStampImage:{
		left: '0dp',
		width : '32dp',
		height : '32dp',
		image : null,
		// カスタムプロパティ
		objectName : 'todayTimeStampImage',
	},
	todayTimeStampLabel:{
		left: '36dp',
		right: '10dp',
//		width: '190dp',
		width: Ti.UI.SIZE,
		height: '40dp',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		// カスタムプロパティ
		objectName : 'todayTimeStampLabel',
	},
	
// winStamp -------------------------------------------------------
	stampWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		backButtonTitleImage: null,
		tabBarHidden: true,
		// カスタムプロパティ
		prevWin : null,
	},
	stampTitleLabel:{
		width: '200dp',
		textAlign: 'center',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'スタンプの選択', 
	},
	stampBackButton:{
		width: '28dp',
		height: '28dp',
		backgroundImage:'images/icon/arrow_left.png',
	},
	stampNextButton:{
		width: '28dp',
		height: '28dp',
//		backgroundColor: '#dedede',
		backgroundImage:'images/icon/arrow_right.png',
//		textAlign: 'center',
//		font: {fontSize:12, fontFamily:'Helvetica Neue'},
//		title: '次へ',
		enabled: false,
	},

	stampScrollView:{
		layout: 'vertical',
		contentWidth:'auto',
		contentHeight:'auto',
		top:0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true,
		backgroundColor: '#dedede',
	},

	stampListView:{
		layout: 'vertical',
		top: '10dp',
		width: '284dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	stampView:{
		layout: 'horizontal',
		top: '0dp',
		bottom: '10dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		// カスタムプロパティ
		type : null,
	},
	stampTextLabel:{
		top: '0dp',
		width : '64dp',
		height : '32dp',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		objectName: 'stampTextLabel',
	},
	stampImage:{
		top: '0dp',
		left: '20dp',
		width : '32dp',
		height : '32dp',
		image : null,
		opacity : 0.2,
		// カスタムプロパティ
		index : null,
		objectName: 'stampImage',
	},
	
// winStampPost -------------------------------------------------------
	stampPostWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
		// カスタムプロパティ
		prevWin : null,
	},
	stampPostTitleLabel:{
		width: '200dp',
		textAlign: 'center',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
	},
	stampPostButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		title: '投稿',
	},
	stampPostTableView:{
		top: '10dp',
		width: '100%',
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		data: [],
	},
	stampPostTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		// カスタムプロパティ
		objectName: null,
	},

	stampPostStampView:{
		width: '284dp',
		height: '52dp',
		backgroundColor: 'white',
		// カスタムプロパティ
		stampData : null,
	},
	stampPostImage:{
		left: '10dp',
		width : '32dp',
		height : '32dp',
		image : null,
	},
	stampPostTextLabel:{
		left: '48dp',
		width: '224dp',
		height: Ti.UI.SIZE,
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	stampPostListView:{
		width: '284dp',
		height: '52dp',
		backgroundColor: 'white',
		// カスタムプロパティ
		stampData : null,
	},
	stampPostListItemLabel:{
		left: '15dp',
		height: '35dp',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	stampPostListValueField:{
		right: '15dp',
		textAlign:'right',
		width: '166dp',
		height: '35dp',
		font: {fontSize:14, fontFamily:'Helvetica Neue'},
		hintText: '入力してください',
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType:Ti.UI.RETURNKEY_DONE,
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_NONE,
        touchEnabled: false,
//      enabled: false,
	},
	stampPostListValueSwitch:{
		right: '15dp',
		value: false,
	},
	stampPostListPickerView:{
		bottom: '-259dp',
		height: '259dp',
	},
	stampPostListPickerToolbar:{
		top: '0dp',
		items: null,
	},
	stampPostListCancelButton:{
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
		title: 'Cancel',
	},
	stampPostListSpacerButton:{
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
	},
	stampPostListDoneButton:{
		style:Ti.UI.iPhone.SystemButtonStyle.DONE,
		title: 'Done',
	},
	stampPostListDatePicker:{
		top: '43dp',
		selectionIndicator: true,
		type:Ti.UI.PICKER_TYPE_DATE,
		minDate:new Date(1980,1,1),
		maxDate:new Date(2020,12,31),
		value: null,
	},
	stampPostListHourPicker:{
		top: '43dp',
		selectionIndicator: true,
		type:Ti.UI.PICKER_TYPE_PLAIN,
		value: null,
	},

// winStampText -------------------------------------------------------
	stampTextWin:{
		backgroundColor: '#dedede',
//		barColor: '#a9a9a9',
		barImage: 'images/icon/titlebar.png',
		tabBarHidden: true,
		// カスタムプロパティ
		prevWin : null,
	},
	stampTextTitleLabel:{
		width: '200dp',
		textAlign: 'center',
		font: {fontSize:18, fontFamily:'Helvetica Neue', fontWeight:'bold'}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
	},
	stampTextDoneButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		title: '完了',
	},

	stampTextView:{
		top : '10dp',
		width : '284dp',
		height: '140dp',
		backgroundColor: 'white',
	},

	stampTextArea:{
		top : '5dp',
		left: '8dp',
		width: '268dp',
		height : '130dp',
		backgroundColor: 'white',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		// hintTextはiOSで対応されていないので、focus/blur時に処理
		hintText: 'comment',
		value: 'comment',
		suppressReturn: false,
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType:Ti.UI.RETURNKEY_DONE,
	},
	stampHistoryTableView:{ 
		top: '160dp',
		width: '284dp',
		height: Ti.UI.SIZE,
//		scrollable: false,
		data: [],
	},
	stampHistoryTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	stampHistoryView:{
		layout: 'absolute',
		top: '0dp',
		height: Ti.UI.SIZE,
	},
	stampHistoryLabel:{
		left: '15dp',
		width: '100%',
		height: '35dp',
		font: {fontSize:12, fontFamily:'Helvetica Neue'},
		color: '#000',
		// カスタムプロパティ
		objectName : 'stampHistoryLabel',
	},

};


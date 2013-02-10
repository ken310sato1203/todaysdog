// スタイル

exports.style = {
// tab -------------------------------------------------------
	todayTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.FAVORITES,
			title: 'today'
		};
	},
	friendsTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.MOST_VIEWED,
			title: 'friends'
		};
	},
	mydogTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.MOST_RECENT,
			title: 'mydog'
		};
	},
	scheduleTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.BOOKMARKS,
			title: 'schedule'
		};
	},
	profileTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.CONTACTS,
			title: 'profile'
		};
	},

// winPhoto -------------------------------------------------------
	photoWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: 'フォト',
	},

	photoTableView:{ 
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
		font: {fontSize:12,fontFamily:'Helvetica Neue',fontWeight:"bold"},
		color: 'white',
//		shadowOffset: {x:0,y:-1},
//		shadowColor: '#696969', 
	},

	photoArticleView:{
		layout: 'vertical',
		top: '10dp',
	    bottom: '5dp',
		width: '220dp',
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
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	photoLikeButton:{
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
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'わんポチ',
	},

	photoLikeListView:{
		top: '5dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
	},
	photoLikeListIconImage:{
		top: '0dp',
		left: '20dp',
		width: '18dp',
		height: '18dp',
		image: 'images/icon/like.gif',
	},
	photoLikeListLabel:{
		left: '40dp',
		right: '20dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
		text: '',
	},

	photoLikeTableRow:{ 
		width: Ti.UI.SIZE,
		height: '1dp',
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	photoCommentTableRow:{ 
		width: Ti.UI.SIZE,
		height: '1dp',
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},

	photoCommentListView:{
		layout: 'vertical',
		top: '5dp',
		left: '0dp',
		width: '100%',
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
	},
	photoCommentView:{
		top: '0dp',
		left: '0dp',
	    bottom: '5dp',
		width: '100%',
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
	},
	photoCommentIconImage:{
		top: '0dp',
		left: '20dp',
		width: '15dp',
		height: '15dp',
		image: 'images/icon/comment.gif',
	},
	photoCommentLabel:{
		left: '40dp',
		right: '20dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
		text: '',
	},
	photoCommentField:{
		top: '0dp',
		left: '40dp',
	    bottom: '10dp',
		width: '240dp',
		height: '22dp',
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor:'#bbb',
		borderRadius: 0,
		font: {fontSize:12,fontFamily:'Helvetica Neue'},
		hintText: 'comment',
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_SEND,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
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
		left: '15dp',
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
		font: {fontSize:18,fontFamily:'Helvetica Neue',fontWeight:"bold"}, 
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
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		// ヘッダのボタンのテキストの色が反映できない
//		color: '#000',
		title: 'フォローする',
	},
	profileUnfollowButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		title: 'フォロー中',
	},
	profileSaveButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		title: '保存する',
	},

	profileActivityIndicator:{
		backgroundColor: 'black',
		opacity: 0.7,
		width: '100%',
		height: '100%',
		style: Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
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
		font: {fontSize:14,fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileCountPhotoUnitLabel:{
		textAlign: 'center',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
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
		font: {fontSize:14,fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileCountLikeUnitLabel:{
		textAlign: 'center',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
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
		font: {fontSize:14,fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileCountFollowerUnitLabel:{
		textAlign: 'center',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
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
		font: {fontSize:14,fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileCountFollowUnitLabel:{
		textAlign: 'center',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'フォロー',
	},

	profileListTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
//		selectedBackgroundColor: 'white',
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
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
		font: {fontSize:14,fontFamily:'Helvetica Neue'},
		color: '#000',
	},
	profileListValueLabel:{
		right: '15dp',
		height: '35dp',
		font: {fontSize:14,fontFamily:'Helvetica Neue'},
		color: '#3D4460',
	},
	profileListValueField:{
		right: '15dp',
		textAlign:'right',
		width: '166dp',
		height: '35dp',
		font: {fontSize:14,fontFamily:'Helvetica Neue'},
		hintText: 'なまえを入力してください',
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
//      returnKeyType:Titanium.UI.RETURNKEY_SEND,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
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
		style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		title: 'Cancel',
	},
	profileListSpacerButton:{
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
	},
	profileListDoneButton:{
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE,
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

	photoListTodayTitleLabel:{
		font: {fontSize:18,fontFamily:'Helvetica Neue',fontWeight:"bold"}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: '今日のわんこ', 
	},

	photoListPhotoTitleLabel:{
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign: 'left',
		font: {fontSize:18,fontFamily:'Helvetica Neue',fontWeight:"bold"}, 
		color: 'white', 
		shadowOffset: {x:0,y:-1},
		shadowColor: '#696969', 
		text: 'フォト', 
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
		left: '0dp',
		width: Ti.UI.SIZE,
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
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
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
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	photoListNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'データがありません'
	},
	photoListTableHeader:{
		width: '320dp',
		height: '60dp',
		backgroundColor: '#dedede',
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
		title: 'うちのわんこ',
	},

// winSchedule -------------------------------------------------------
	scheduleWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
	},

};


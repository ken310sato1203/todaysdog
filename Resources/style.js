// スタイル

exports.style = {
// appWindow -------------------------------------------------------
	todayTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.FAVORITES
		};
	},
	friendsTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.MOST_VIEWED
		};
	},
	mydogTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.MOST_RECENT
		};
	},
	scheduleTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.BOOKMARKS
		};
	},
	profileTab:function(win){
		return {
			window: win,
			icon: Ti.UI.iPhone.SystemIcon.CONTACTS
		};
	},

// appToday -------------------------------------------------------
	todayWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: '今日のわんこ',
	},

	todayTableView:{ 
		data: [],
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
	},
	todayArticleTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},
	todayNextTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	},

	todayArticleListView:{
		layout: 'horizontal',
		top: '0dp',
		left: '0dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
	},
	todayArticleView:{
		layout: 'vertical',
		top: '5dp',
		left: '5dp',
		width: '100dp',
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
	},
	todayPhotoImage:{
		top: '5dp',
		width: '90dp',
		height: '90dp',
		backgroundColor: 'black',
		// カスタムプロパティ
		articleData: null,
	},
	todayTextLabel:{
		top: '2dp',
	    bottom: '2dp',
		width: '90dp',
		height: '15dp',
		textAlign: 'left',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	todayNextView:{
		top: '0dp',
		left: '0dp',
		width: '100%',
		height: '40dp',
		backgroundColor: '#dedede',
	},
	todayNextButton:{
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		textAlign: 'center',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
		title: '続きを読む',
	},
	todayNoDataLabel:{
		top: '5dp',
		width: '90dp',
		height: '15dp',
		backgroundColor: '#dedede',
		textAlign: 'left',
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
		text: 'データがありません'
	},
	todayTableHeader:{
		width: '320dp',
		height: '60dp',
		backgroundColor: '#dedede',
	},	    
	todayHeaderBorder:{
	    bottom: '0dp',
		height: '0dp',
	},	    
	todayUpdateArrowImage:{
	    image:'images/whiteArrow.png',
	    left: '20dp',
	    bottom: '10dp',
	    width: '23dp',
	    height: '60dp',
	},
	todayPullLabel:{
	    left: '55dp', 
	    bottom: '30dp',
	    width: '200dp',
	    color:'#576c89',
	    font: {fontSize:13, fontWeight:'bold'},
	    text: 'Pull down to refresh...',
	    textAlign: 'center',
	},
	todayLastUpdatedLabel:{
	    left: '55dp',
	    bottom: '15dp',
	    width: '200dp',
	    color: '#576c89',
	    font: {fontSize:12},
	    textAlign: 'center',
	},
	todayUpdateIndicator:{
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

// appPhoto -------------------------------------------------------
	photoWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: 'フォト',
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
		font: {fontSize:10,fontFamily:'Helvetica Neue'},
		color: '#000',
	},

	photoScrollView:{
		layout: 'vertical',
		top: '0dp',
	    bottom: '10dp',
		contentWidth: 'auto',
		contentHeight: 'auto',
		showVerticalScrollIndicator: true,
		showHorizontalScrollIndicator: false,		
		backgroundColor: '#dedede',
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

	photoTableView:{ 
		data: [],
		backgroundColor: '#dedede',
		separatorColor: 'transparent',
	},
	photoArticleTableRow:{ 
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		backgroundColor: '#dedede',
		touchEnabled: false,
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
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
//		verticalAlign: 'top',
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

// appFriends -------------------------------------------------------
	friendsWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: '犬とも',
	},

// appMydog -------------------------------------------------------
	mydogWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: 'うちのわんこ',
	},

// appSchedule -------------------------------------------------------
	scheduleWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
	},

// appProfile -------------------------------------------------------
	profileWin:{
		backgroundColor: '#dedede',
		barColor: '#a9a9a9',
		title: 'プロフィール',
	},

};


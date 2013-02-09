//モデル

var loginId = null;

var articleList = [];
var likeList = [];
var commentList = [];
var userList = [];
var breedList = [];
var sexList = [];
var followList = [];

loginId = "sakura";

articleList = [
	{no:"A0001", user:"sakura", loc:"Tokyo", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0002", user:"maki", loc:"Kyoto", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0003", user:"koro", loc:"Nara", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0004", user:"shiro", loc:"Shiga", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0005", user:"pochi", loc:"Fukuoka", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0006", user:"jiro", loc:"Chiba", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0007", user:"gon", loc:"Nagoya", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0008", user:"kuro", loc:"Kobe", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0009", user:"momo", loc:"Okinawa", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0010", user:"santa", loc:"Hokkaido", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0011", user:"jiro", loc:"Nagoya", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0012", user:"gon", loc:"Kobe", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0013", user:"kuro", loc:"Okinawa", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0014", user:"momo", loc:"Tokyo", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0015", user:"santa", loc:"Kyoto", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0016", user:"sakura", loc:"Kyoto", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0017", user:"maki", loc:"Nara", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0018", user:"sakura", loc:"Nara", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0019", user:"maki", loc:"Shiga", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0020", user:"koro", loc:"Fukuoka", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0021", user:"koro", loc:"Shiga", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0022", user:"shiro", loc:"Fukuoka", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
	{no:"A0023", user:"pochi", loc:"Chiba", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
];

commentList = [
	{no:"A0001", user:"kuro", date:"2013-01-01 08:14:27", text:"今年もよろしくお願いします。"},
	{no:"A0001", user:"shiro", date:"2013-01-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0002", user:"jiro", date:"2013-01-03 13:37:02", text:"ことよろ。"},
];

likeList = [
	{no:"A0001", user:"sakura", date:"2013-01-01 08:14:27"},
	{no:"A0001", user:"taro", date:"2013-01-02 09:23:45"},
	{no:"A0002", user:"ichiro", date:"2013-01-03 13:37:02"},
];

userList = [
	{user:"sakura", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"maki", photo:"86", like:"40", follow:"85", follower:"120", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"koro", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"shiro", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"pochi", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"jiro", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"gon", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"kuro", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"momo", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"santa", photo:"56", like:"30", follow:"25", follower:"60", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
];

breedList = [
	{value:"チワワ"},
	{value:"ダックスフント"},
	{value:"コーギー"},
	{value:"柴犬"},
	{value:"ゴールデンレトリーバー"},
	{value:"ミックス"},
];
sexList = [
	{value:"男の子"},
	{value:"女の子"},
];

followList = [
	{user:"sakura", follow:"maki"},
	{user:"sakura", follow:"kuro"},
	{user:"maki", follow:"sakura"},
	{user:"maki", follow:"shiro"},
	{user:"shiro", follow:"sakura"},
];

exports.model = {

	// ログインIDの登録
	setLoginId:function(_userId){
		Ti.API.debug('[func]setLoginId:');
		loginId = _userId;
	},
	// ログインIDの取得
	getLoginId:function(){
		Ti.API.debug('[func]getLoginId:');
		return loginId;
	},

	// 記事リストの登録
	setArticleList:function(_articleList){
		Ti.API.debug('[func]setArticleList:');
		articleList = _articleList;
	},
	// 記事リストの取得
	getArticleList:function(_userData, _articleIndex, _articleCount){
		Ti.API.debug('[func]getArticleList:');
		var target = [];
/*
		for (var i=0; i<articleList.length; i++) {
			articleList[i].user = 'sakura';
		}
*/
		if (_userData == null) {
			target = articleList;
		} else {
			for (var i=0; i<articleList.length; i++) {
				if (articleList[i].user == _userData.user) {
					target.push(articleList[i]);
				}
			}			
		}

		if (_articleIndex == null) {
			return target.slice(0, 10);			
		} else if (_articleIndex == 'A0009'){
			return target.slice(9, 19);
		} else if (_articleIndex == 'A0018'){
			return target.slice(19, 28);
		} else if (_articleIndex == 'A0024'){
			return null;
		}
	},
		
	// ライクリストに追加
	addLikeList:function(_likeList){
		Ti.API.debug('[func]addLikeList:');
		likeList.push(_likeList);
	},
	// ライクリストから削除
	removeLikeList:function(_articleNo, _userId){
		Ti.API.debug('[func]removeLikeList:');
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _articleNo && likeList[i].user == _userId) {
				likeList.splice(i, 1);
			}
		}
	},
	// ライクリストに追加されているかを確認
	checkLikeList:function(_articleNo, _userId){
		Ti.API.debug('[func]checkLikeList:');
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _articleNo && likeList[i].user == _userId) {
				return true;
			}
		}
		return false;
	},
	// ライクリストの取得
	getLikeList:function(_articleNo, _likeCount){
		Ti.API.debug('[func]getLikeList:');
		var target = [];
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _articleNo) {
				target.push(likeList[i]);
				if (target.length == _likeCount) {
					break;
				}
			}
		}
		return target;
	},

	// コメントリストに追加
	addCommentList:function(_commentList){
		Ti.API.debug('[func]addCommentList:');
		commentList.push(_commentList);
	},
	// コメントリストの取得
	getCommentList:function(_articleNo, _commentCount){
		Ti.API.debug('[func]getCommentList:');
		var target = [];
		for (var i=0; i<commentList.length; i++) {
			if (commentList[i].no == _articleNo) {
				target.push(commentList[i]);
				if (target.length == _commentCount) {
					break;
				}
			}
		}
		return target;
	},

	// ユーザデータの追加
	addUserList:function(_userData){
		Ti.API.debug('[func]addUserList:');
		var existFlag = false;
		for (var i=0; i<userList.length; i++) {
			if (userList[i].user == _userData.user) {
				existFlag = true;
			}
		}
		if (! existFlag) {
			userList.push(_userData);
		}
	},
	// ユーザデータの更新
	updateUserList:function(_userData){
		Ti.API.debug('[func]updateUserList:');
		for (var i=0; i<userList.length; i++) {
			if (userList[i].user == _userData.user) {
				userList[i] = _userData;
			}
		}
	},
	// ユーザデータの取得
	getUser:function(_userId){
		Ti.API.debug('[func]getUser:');
		var target = null;
		for (var i=0; i<userList.length; i++) {
			if (userList[i].user == _userId) {
				target = userList[i];
				break;
			}
		}
		return target;
	},

	// 犬種リストの取得
	setBreedList:function(_breedList){
		Ti.API.debug('[func]setBreedList:');
		breedList = _breedList;
	},
	// 犬種リストの取得
	getBreedList:function(){
		Ti.API.debug('[func]getBreedList:');
		return breedList;
	},
	// 性別リストの取得
	setSexList:function(_sexList){
		Ti.API.debug('[func]setSexList:');
		sexList = _sexList;
	},
	// 性別リストの取得
	getSexList:function(){
		Ti.API.debug('[func]getSexList:');
		return sexList;
	},

	// フォローしているユーザリストの取得
	getFollowList:function(_userId){
		Ti.API.debug('[func]getFollowList:');
		var target = [];
		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _userId) {
				target.push(getUser(followList[i].follow));
			}
		}
		return target;
	},
	// フォローしているかのチェック
	checkFollowList:function(_userId, _follow){
		Ti.API.debug('[func]checkFollowList:');
		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _userId) {
				if (followList[i].follow == _follow) {
					return true;
				}
			}
		}
		return false;
	},
	// フォローユーザの追加
	addFollowList:function(_userId, _follow){
		Ti.API.debug('[func]addFollowList:');
		var existFlag = false;
		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _userId && followList[i].follow == _follow) {
				existFlag = true;
			}
		}
		if (! existFlag) {
			followList.push({user:_userId, follow:_follow});
		}
	},
	// フォローユーザの削除
	removeFollowList:function(_userId, _follow){
		Ti.API.debug('[func]removeFollowList:');
		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _userId && followList[i].follow == _follow) {
				followList.splice(i, 1);
			}
		}
	},
	

}
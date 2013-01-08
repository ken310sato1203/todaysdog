//モデル

var userId = null;

var articleData = [];
var targetArticleData = [];
var likeData = [];
var commentData = [];

userId = "sakura";

commentData = [
	{no:"A0001", user:"kuro", date:"2013-01-01 08:14:27", text:"今年もよろしくお願いします。"},
	{no:"A0001", user:"shiro", date:"2013-01-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0002", user:"jiro", date:"2013-01-03 13:37:02", text:"ことよろ。"},
];

likeData = [
	{no:"A0001", user:"sakura", date:"2013-01-01 08:14:27"},
	{no:"A0001", user:"taro", date:"2013-01-02 09:23:45"},
	{no:"A0002", user:"ichiro", date:"2013-01-03 13:37:02"},
];

exports.model = {

	// ユーザIDの登録
	setUserId:function(_userId){
		Ti.API.debug('[func]setUserId:');
		userId = _userId;
	},
	// ユーザIDの取得
	getUserId:function(){
		Ti.API.debug('[func]getUserId:');
		return userId;
	},

	// 記事リストの登録
	setArticleData:function(_articleData){
		Ti.API.debug('[func]setArticleData:');
		articleData = _articleData;
	},
	// 記事リストの取得
	getArticleData:function(_userId, _articleIndex, _articleCount){
		Ti.API.debug('[func]getArticleData:');
		if (_articleIndex == null) {
			articleData = [
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
			];
			
		} else if (_articleIndex == 'A0009'){
			articleData = [
				{no:"A0010", user:"santa", loc:"Tokyo", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0011", user:"sakura", loc:"Kyoto", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0012", user:"maki", loc:"Nara", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0013", user:"koro", loc:"Shiga", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0014", user:"shiro", loc:"Fukuoka", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0015", user:"pochi", loc:"Chiba", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0016", user:"jiro", loc:"Nagoya", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0017", user:"gon", loc:"Kobe", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0018", user:"kuro", loc:"Okinawa", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0019", user:"momo", loc:"Tokyo", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
			];
		} else if (_articleIndex == 'A0018'){
			articleData = [
				{no:"A0019", user:"momo", loc:"Tokyo", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0020", user:"santa", loc:"Kyoto", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0021", user:"sakura", loc:"Nara", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0022", user:"maki", loc:"Shiga", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
				{no:"A0023", user:"koro", loc:"Fukuoka", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！"},
			];
		} else if (_articleIndex == 'A0024'){
			return null;
		}
		
		return articleData;
	},
	
	// 対象記事の登録
	setTargetArticleData:function(_articleData){
		Ti.API.debug('[func]setCurrentArticle:');
		targetArticleData = _articleData;
	},
	// 対象記事の取得
	getTargetArticleData:function(){
		Ti.API.debug('[func]getCurrentArticle:');
		return targetArticleData;
	},
	
	// ライクリストに追加
	addLikeData:function(_likeData){
		Ti.API.debug('[func]addLikeData:');
		likeData.push(_likeData);
	},
	// ライクリストに追加されているかを確認
	checkLikeData:function(_articleNo, _userId){
		Ti.API.debug('[func]checkLikeData:');
		for (var i=0; i<likeData.length; i++) {
			if (likeData[i].no == _articleNo && likeData[i].user == _userId) {
				return true;
			}
		}
		return false;
	},
	// ライクリストの取得
	getLikeData:function(_articleNo, _likeCount){
		Ti.API.debug('[func]getLikeData:');
		var target = [];
		for (var i=0; i<likeData.length; i++) {
			if (likeData[i].no == _articleNo) {
				target.push(likeData[i]);
				if (target.length == _likeCount) {
					break;
				}
			}
		}
		return target;
	},

	// コメントリストに追加
	addCommentData:function(_commentData){
		Ti.API.debug('[func]addCommentData:');
		commentData.push(_commentData);
	},
	// コメントリストの取得
	getCommentData:function(_articleNo, _commentCount){
		Ti.API.debug('[func]getCommentData:');
		var target = [];
		for (var i=0; i<commentData.length; i++) {
			if (commentData[i].no == _articleNo) {
				target.push(commentData[i]);
				if (target.length == _commentCount) {
					break;
				}
			}
		}
		return target;
	},

}
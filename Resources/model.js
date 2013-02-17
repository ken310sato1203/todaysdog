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
	{no:"A0001", user:"sakura", location:"Tokyo", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0002", user:"maki", location:"Kyoto", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0003", user:"koro", location:"Nara", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0004", user:"shiro", location:"Shiga", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0005", user:"pochi", location:"Fukuoka", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0006", user:"jiro", location:"Chiba", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0007", user:"gon", location:"Nagoya", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0008", user:"kuro", location:"Kobe", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0009", user:"momo", location:"Okinawa", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0010", user:"santa", location:"Hokkaido", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0011", user:"jiro", location:"Nagoya", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0012", user:"gon", location:"Kobe", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0013", user:"kuro", location:"Okinawa", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0014", user:"momo", location:"Tokyo", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0015", user:"santa", location:"Kyoto", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0016", user:"sakura", location:"Kyoto", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0017", user:"maki", location:"Nara", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0018", user:"sakura", location:"Nara", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0019", user:"maki", location:"Shiga", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0020", user:"koro", location:"Fukuoka", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0021", user:"koro", location:"Shiga", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0022", user:"shiro", location:"Fukuoka", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0023", user:"pochi", location:"Chiba", date:"2013-01-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
];

commentList = [
	{no:"A0001", user:"kuro", date:"2013-01-01 08:14:27", text:"今年もよろしくお願いします。"},
	{no:"A0001", user:"shiro", date:"2013-01-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0002", user:"jiro", date:"2013-01-03 13:37:02", text:"ことよろ。"},
];

likeList = [
	{no:"A0001", user:"sakura", date:"2013-01-01 08:14:27"},
	{no:"A0001", user:"maki", date:"2013-01-02 09:23:45"},
	{no:"A0002", user:"ichiro", date:"2013-01-03 13:37:02"},
	{no:"A0003", user:"sakura", date:"2013-01-04 12:37:02"},
	{no:"A0003", user:"taro", date:"2013-01-05 11:37:02"},
	{no:"A0004", user:"sakura", date:"2013-01-06 10:37:02"},
];

userList = [
	{user:"sakura", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう さくら", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"maki", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう まき", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"koro", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう コロ", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"shiro", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう しろ", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"pochi", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう ポチ", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"jiro", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう ジロー", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"gon", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう ゴン", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"kuro", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう クロ", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"momo", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう もも", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
	{user:"santa", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう サンタ", location:"東京", breed:"ダックスフント", sex:"女の子", birth:"2005-12-07", feature:"ほうき型しっぽ", character:"びびり"},
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
	{user:"maki", follow:"koro"},
	{user:"maki", follow:"shiro"},
	{user:"shiro", follow:"sakura"},
];

for (var i=0; i<articleList.length; i++) {
	for (var j=0; j<userList.length; j++) {
		if (articleList[i].user == userList[j].user) {
			userList[j].photo++;
		}
	}
}
for (var i=0; i<likeList.length; i++) {
	for (var j=0; j<userList.length; j++) {
		if (likeList[i].user == userList[j].user) {
			userList[j].like++;
		}
	}
	for (var j=0; j<articleList.length; j++) {
		if (likeList[i].no == articleList[j].no) {
			articleList[j].like++;
		}
	}
}

for (var i=0; i<followList.length; i++) {
	for (var j=0; j<userList.length; j++) {
		if (followList[i].user == userList[j].user) {
			userList[j].follow++;
		}
		if (followList[i].follow == userList[j].user) {
			userList[j].follower++;
		}
	}
}
for (var i=0; i<commentList.length; i++) {
	for (var j=0; j<articleList.length; j++) {
		if (commentList[i].no == articleList[j].no) {
			articleList[j].comment++;
		}
	}
}

exports.model = {

	// ログインIDの登録
	setLoginId:function(_user){
		Ti.API.debug('[func]setLoginId:');
		loginId = _user;
	},
	// ログインIDの取得
	getLoginId:function(){
		Ti.API.debug('[func]getLoginId:');
		return loginId;
	},

	// 記事の取得
	getArticle:function(_articleNo){
		Ti.API.debug('[func]getArticle:');
		for (var i=0; i<articleList.length; i++) {
			if (articleList[i].no == _articleNo) {
				return articleList[i];
			}
		}
	},

	// 記事リストの登録
	setArticleList:function(_articleList){
		Ti.API.debug('[func]setArticleList:');
		articleList = _articleList;
	},

	// 記事リストの取得
	// 前回更新時に読み込んだ記事の最終インデックスより新しい記事を取得
	getArticleList:function(_listType, _userData, _prevArticleIndex, _articleCount){
		Ti.API.debug('[func]getArticleList:');
		Ti.API.debug('_listType:' + _listType);
		var target = [];
		var pushFlag = false;
		var pushCount = 0;

		// 全ユーザのフォト一覧
		if (_listType == "all") {
			for (var i=0; i<articleList.length; i++) {
				if (_prevArticleIndex == null) {
					pushFlag = true;
				}
				if (pushFlag) {
					target.push(articleList[i]);
					pushCount++;
					if (pushCount == _articleCount) {
						return target;
					}
				}
				if (articleList[i].no == _prevArticleIndex) {
					pushFlag = true;
				}
			}

		// 指定ユーザのフォト一覧
		} else 	if (_listType == "user") {
			for (var i=0; i<articleList.length; i++) {
				if (_prevArticleIndex == null) {
					pushFlag = true;
				}
				if (pushFlag) {
					if (articleList[i].user == _userData.user) {
						target.push(articleList[i]);
						pushCount++;
						if (pushCount == _articleCount) {
							return target;
						}
					}
				}
				if (articleList[i].no == _prevArticleIndex) {
					pushFlag = true;
				}
			}

		// ライクなフォト一覧
		} else 	if (_listType == "like") {
			for (var i=0; i<articleList.length; i++) {
				if (_prevArticleIndex == null) {
					pushFlag = true;
				}
				if (pushFlag) {
					for (var j=0; j<likeList.length; j++) {
						if (articleList[i].no == likeList[j].no && likeList[j].user == _userData.user) {
							target.push(articleList[i]);
							pushCount++;
							if (pushCount == _articleCount) {
								return target;
							}
							break;
						}
					}
				}
				if (articleList[i].no == _prevArticleIndex) {
					pushFlag = true;
				}
			}

		// フォローユーザのフォト一覧
		} else 	if (_listType == "follow") {
			for (var i=0; i<articleList.length; i++) {
				if (_prevArticleIndex == null) {
					pushFlag = true;
				}
				if (pushFlag) {
					if (articleList[i].user == _userData.user) {
						target.push(articleList[i]);
						pushCount++;
					} else {
						for (var j=0; j<followList.length; j++) {
							if (followList[j].user == _userData.user) {
								if (articleList[i].user == followList[j].follow) {
									target.push(articleList[i]);
									pushCount++;
									break;
								}
							}
						}
					}
					if (pushCount == _articleCount) {
						return target;
					}
				}
				if (articleList[i].no == _prevArticleIndex) {
					pushFlag = true;
				}
			}
		}

		return target;
	},
		
	// ライクリストに追加
	addLikeList:function(_likeList){
		Ti.API.debug('[func]addLikeList:');
		likeList.push(_likeList);
		for (var i=0; i<userList.length; i++) {
			if (userList[i].user == _likeList.user) {
				userList[i].like++;
				break;
			}
		}
		for (var i=0; i<articleList.length; i++) {
			if (articleList[i].no == _likeList.no) {
				articleList[i].like++;
				break;
			}
		}
	},
	// ライクリストから削除
	removeLikeList:function(_articleNo, _user){
		Ti.API.debug('[func]removeLikeList:');
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _articleNo && likeList[i].user == _user) {
				likeList.splice(i, 1);
				break;
			}
		}
		for (var i=0; i<userList.length; i++) {
			if (userList[i].user == _user) {
				userList[i].like--;
				break;
			}
		}
		for (var i=0; i<articleList.length; i++) {
			if (articleList[i].no == _articleNo) {
				articleList[i].like--;
				break;
			}
		}
	},
	// ライクリストに追加されているかを確認
	checkLikeList:function(_articleNo, _user){
		Ti.API.debug('[func]checkLikeList:');
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _articleNo && likeList[i].user == _user) {
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
		for (var i=0; i<articleList.length; i++) {
			if (articleList[i].no == _commentList.no) {
				articleList[i].comment++;
				break;
			}
		}
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
				break;
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
				break;
			}
		}
	},
	// ユーザデータの取得
	getUser:function(_user){
		Ti.API.debug('[func]getUser:');
		var target = null;
		for (var i=0; i<userList.length; i++) {
			if (userList[i].user == _user) {
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
	getFollowList:function(_user){
		Ti.API.debug('[func]getFollowList:');
		var target = [];
		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _user) {
				for (var j=0; j<userList.length; j++) {
					if (userList[j].user == followList[i].follow) {
						target.push(userList[j]);
						break;
					}
				}
			}
		}
		return target;
	},
	// フォロワのユーザリストの取得
	getFollowerList:function(_user){
		Ti.API.debug('[func]getFollowerList:');
		var target = [];
		for (var i=0; i<followList.length; i++) {
			if (followList[i].follow == _user) {
				for (var j=0; j<userList.length; j++) {
					if (userList[j].user == followList[i].user) {
						target.push(userList[j]);
						break;
					}
				}
			}
		}
		return target;
	},
	// フォローしているかのチェック
	checkFollowList:function(_user, _follow){
		Ti.API.debug('[func]checkFollowList:');
		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _user) {
				if (followList[i].follow == _follow) {
					return true;
				}
			}
		}
		return false;
	},
	// フォローユーザの追加
	addFollowList:function(_user, _follow){
		Ti.API.debug('[func]addFollowList:');
		var existFlag = false;
		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _user && followList[i].follow == _follow) {
				existFlag = true;
				break;
			}
		}
		if (! existFlag) {
			followList.push({user:_user, follow:_follow});
			for (var i=0; i<userList.length; i++) {
				if (userList[i].user == _user) {
					userList[i].follow++;
					break;
				}
			}
			for (var i=0; i<userList.length; i++) {
				if (userList[i].user == _follow) {
					userList[i].follower++;
					break;
				}
			}		
		}
	},
	// フォローユーザの削除
	removeFollowList:function(_user, _follow){
		Ti.API.debug('[func]removeFollowList:');
		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _user && followList[i].follow == _follow) {
				followList.splice(i, 1);
				break;
			}
		}
		for (var i=0; i<userList.length; i++) {
			if (userList[i].user == _user) {
				userList[i].follow--;
				break;
			}
		}
		for (var i=0; i<userList.length; i++) {
			if (userList[i].user == _follow) {
				userList[i].follower--;
				break;
			}
		}		
	},
	

}
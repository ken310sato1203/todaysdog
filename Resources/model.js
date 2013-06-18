//モデル

var loginId = null;

var articleList = [];
var likeList = [];
var commentList = [];
var userList = [];
var breedList = [];
var sexList = [];
var followList = [];
var stampList = [];
var stampSelectList = [];
var stampHistoryList = [];

// ---------------------------------------------------------------------
loginId = "sakura";

articleList = [
	{no:"A0023", user:"sakura", location:"Chiba", date:"2013-04-09 10:26:05", text:"3明けましておめでとうございます。", like:"0", comment:"0"},
	{no:"A0022", user:"maki", location:"Fukuoka", date:"2013-04-09 08:26:05", text:"2明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0021", user:"kuro", location:"Shiga", date:"2013-04-09 07:26:05", text:"1明けましておめでとうございます。今年もよい年になりますように。", like:"0", comment:"0"},
	{no:"A0020", user:"santa", location:"Fukuoka", date:"2013-04-06 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0019", user:"gon", location:"Shiga", date:"2013-04-05 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0018", user:"jiro", location:"Nara", date:"2013-04-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0017", user:"momo", location:"Nara", date:"2013-03-27 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0016", user:"sakura", location:"Kyoto", date:"2013-03-26 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0015", user:"maki", location:"Kyoto", date:"2013-03-25 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0014", user:"momo", location:"Tokyo", date:"2013-03-24 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0013", user:"kuro", location:"Okinawa", date:"2013-03-23 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0012", user:"gon", location:"Kobe", date:"2013-03-22 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0011", user:"jiro", location:"Nagoya", date:"2013-03-21 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0010", user:"santa", location:"Hokkaido", date:"2013-03-20 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0009", user:"momo", location:"Okinawa", date:"2013-03-19 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0008", user:"kuro", location:"Kobe", date:"2013-03-17 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0007", user:"gon", location:"Nagoya", date:"2013-03-15 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0006", user:"jiro", location:"Chiba", date:"2013-03-13 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0005", user:"sakura", location:"Fukuoka", date:"2013-03-03 07:26:05", text:"3明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0004", user:"sakura", location:"Shiga", date:"2013-03-03 07:26:05", text:"2明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0003", user:"sakura", location:"Nara", date:"2013-03-03 07:26:05", text:"1明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0002", user:"maki", location:"Kyoto", date:"2013-03-02 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{no:"A0001", user:"sakura", location:"Tokyo", date:"2013-06-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
];

commentList = [
	{no:"A0021", seq:"1", user:"jiro", date:"2013-03-01 13:37:02", text:"ことよろ。"},
	{no:"A0021", seq:"2", user:"jiro", date:"2013-03-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0022", seq:"1", user:"maki", date:"2013-03-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0022", seq:"2", user:"koro", date:"2013-03-03 09:23:45", text:"今年もよろしく。"},
	{no:"A0022", seq:"3", user:"gon", date:"2013-03-05 09:23:45", text:"今年もよろしく。"},
	{no:"A0023", seq:"1", user:"shiro", date:"2013-03-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0024", seq:"1", user:"kuro", date:"2013-03-10 08:14:27", text:"今年もよろしくお願いします。あけましておめでとうございます。今年もよろしくお願いします。あけましておめでとうございます。"},
];

likeList = [
	{no:"A0021", seq:"2", user:"maki", date:"2013-03-02 09:23:45"},
	{no:"A0021", seq:"1", user:"sakura", date:"2013-03-01 08:14:27"},
	{no:"A0022", seq:"1", user:"pochi", date:"2013-03-03 13:37:02"},
	{no:"A0023", seq:"2", user:"momo", date:"2013-03-05 11:37:02"},
	{no:"A0023", seq:"1", user:"sakura", date:"2013-03-04 12:37:02"},
	{no:"A0024", seq:"1", user:"sakura", date:"2013-03-06 10:37:02"},
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
	{user:"sakura", follow:"santa"},
	{user:"sakura", follow:"gon"},
	{user:"sakura", follow:"jiro"},
	{user:"sakura", follow:"momo"},
	{user:"maki", follow:"sakura"},
	{user:"maki", follow:"koro"},
	{user:"maki", follow:"shiro"},
	{user:"shiro", follow:"sakura"},
];

stampList = [
	{no:"12", user:"sakura", stamp:"dog", text:"朝のさんぽ、いいうんち", year:2013, month:6, day:1, hour:16, repeat:"0", date:"2013-03-04 10:23:45"},
	{no:"11", user:"sakura", stamp:"sun", text:"お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。", year:2013, month:6, day:1, hour:15, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"10", user:"sakura", stamp:"dog", text:"朝のさんぽ、いいうんち。朝のさんぽ、いいうんち。朝のさんぽ、いい", year:2013, month:6, day:1, hour:-1, repeat:"0", date:"2013-03-04 10:23:45"},
	{no:"9", user:"sakura", stamp:"restaurant", text:"お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。", year:2013, month:6, day:1, hour:-1, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"8", user:"sakura", stamp:"time", text:"シャンプー予約", year:2013, month:4, day:10, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"7", user:"sakura", stamp:"sun", text:"公園でBBQ", year:2013, month:4, day:8, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"6", user:"sakura", stamp:"edit", text:"のみだに薬", year:2013, month:4, day:8, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"5", user:"sakura", stamp:"restaurant", text:"お昼ごはん、がっつり食べた", year:2013, month:4, day:7, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"4", user:"sakura", stamp:"dog", text:"朝のさんぽ、いいうんち", year:2013, month:4, day:5, hour:10, repeat:"0", date:"2013-03-04 10:23:45"},
	{no:"3", user:"sakura", stamp:"dog", text:"朝のさんぽ、いいうんち", year:2013, month:4, day:24, hour:9, repeat:"0", date:"2013-03-04 10:23:45"},
	{no:"2", user:"sakura", stamp:"restaurant", text:"お昼ごはん、がっつり食べた", year:2013, month:3, day:4, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"1", user:"sakura", stamp:"dog", text:"朝のさんぽ、いいうんち", year:2013, month:3, day:4, hour:9, repeat:"0", date:"2013-03-04 10:23:45"},
];

stampSelectList = [
	{type:"one", title:"体調",stampList:["sun","favorite","water"]},
	{type:"one", title:"ご飯",stampList:["restaurant","home","dog"]},
	{type:"one", title:"うんち",stampList:["favorite","star","water"]},
	{type:"one", title:"散歩",stampList:["dog","sun","home"]},
	{type:"all", title:"薬・病院",stampList:["favorite","edit","time"]},
	{type:"all", title:"シャンプー\nホテル",stampList:["water","home","restaurant"]},
	{type:"all", title:"おでかけ\nイベント",stampList:["time","edit","star"]},
];

stampHistoryList = [
	{stamp:"edit",textList:["おはようございます","こんにちは","おやすみなさい"]},
	{stamp:"dog",textList:["朝のお散歩","昼のお散歩","夜のお散歩"]},
	{stamp:"restaurant",textList:["朝ご飯","昼ご飯","夜ご飯"]},
	{stamp:"home",textList:["お留守番","お泊まり"]},
	{stamp:"sun",textList:["いいお天気","元気です"]},
	{stamp:"water",textList:["雨模様","ちょっと元気ないね"]},
	{stamp:"star",textList:["ごほうび"]},
	{stamp:"favorite",textList:["お薬","病院"]},
	{stamp:"time",textList:["シャンプー予約"]}
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

// ---------------------------------------------------------------------
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
	getArticleList:function(_type, _userData, _prevArticleIndex, _articleCount){
		Ti.API.debug('[func]getArticleList:');
		Ti.API.debug('_type:' + _type);
		var target = [];
		var pushCount = 0;
		var pushFlag = false;
		if (_prevArticleIndex == null) {
			pushFlag = true;
		}

		// 全ユーザのフォト一覧
		if (_type == "all") {
			for (var i=0; i<articleList.length; i++) {
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
		} else 	if (_type == "user") {
			for (var i=0; i<articleList.length; i++) {
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
		} else 	if (_type == "like") {
			for (var i=0; i<articleList.length; i++) {
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
		} else 	if (_type == "follow") {
			for (var i=0; i<articleList.length; i++) {
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

	// 指定ユーザの記事リストから指定日除いてランダムに取得
	getRandomArticle:function(_userData, _notInArticleData){
		Ti.API.debug('[func]getRandomArticle:');
		var target = [];
		if (_notInArticleData != null) {
			for (var i=0; i<articleList.length; i++) {
				if (articleList[i].user == _userData.user) {
					if (articleList[i].no != _notInArticleData.no) {
						target.push(articleList[i]);
					}
				}
			}

		} else {
			for (var i=0; i<articleList.length; i++) {
				if (articleList[i].user == _userData.user) {
					target.push(articleList[i]);
				}
			}
		}

		if (target.length > 0) {
			var randomIndex = Math.floor(Math.random() * target.length);
			var ramdomDate = util.getDate(target[randomIndex].date);
			return this.getDateArticle(_userData, ramdomDate);

		} else {
			return target;
		}
	},

	// 指定ユーザの記事リストから指定日の記事を取得
	getDateArticle:function(_userData, _calendarDate){
		Ti.API.debug('[func]getDateArticle:');
		var target = [];
		var calendarDay = _calendarDate.getDate();
		var calendarYear = _calendarDate.getFullYear();
		var calendarMonth = _calendarDate.getMonth();

		for (var i=articleList.length; i>0; i--) {
			if (articleList[i-1].user == _userData.user) {
				var articleDate = util.getDate(articleList[i-1].date);
				if (articleDate.getDate() == calendarDay) {
					if (articleDate.getFullYear() == calendarYear && articleDate.getMonth() == calendarMonth) {
						target.push(articleList[i-1]);
					}
				}
			}
		}

		return target;
	},

	// 指定ユーザの記事リストから指定月の記事を取得
	getCalendarArticle:function(_userData, _year, _month){
		Ti.API.debug('[func]getCalendarArticle:');
		var calendarTarget = [];

		var daysInMonth = 32 - new Date(_year, _month-1, 32).getDate();
		for (var i=0; i < daysInMonth; i++) {
			var target = null;
			for (var j=articleList.length; j>0; j--) {
				if (articleList[j-1].user == _userData.user) {
					var articleDate = util.getDate(articleList[j-1].date);
					var articleDay = articleDate.getDate();
					if (i == articleDay - 1) {
						var articleYear = articleDate.getFullYear();
						var articleMonth = articleDate.getMonth() + 1;
						if (_year == articleYear && _month == articleMonth) {
							// 同じ日に複数の記事があっても１つのみセット
							target = articleList[j-1];
							break;
						}
					}
				}
			}
			calendarTarget.push(target);
		}

		return calendarTarget;
	},

	// 指定ユーザのスタンプリストから指定月のデータを取得
	getStampList:function(_userData, _year, _month){
		Ti.API.debug('[func]getStampList:');
		var stampTarget = [];

		var daysInMonth = 32 - new Date(_year, _month-1, 32).getDate();
		for (var i=0; i < daysInMonth; i++) {
			for (var j=stampList.length; j>0; j--) {
				if (stampList[j-1].user == _userData.user) {
					if (i == stampList[j-1].day - 1) {
						if (_year == stampList[j-1].year && _month == stampList[j-1].month) {
							stampTarget.push(stampList[j-1]);
						}
					}
				}
			}
		}

		return stampTarget;
	},

	// 指定ユーザのスタンプリストから指定日のデータを取得
	getStampDayList:function(_userData, _year, _month, _day){
		Ti.API.debug('[func]getStampDayList:');
		var stampTarget = [];

		var daysInMonth = 32 - new Date(_year, _month-1, 32).getDate();
		for (var i=0; i < daysInMonth; i++) {
			for (var j=stampList.length; j>0; j--) {
				if (stampList[j-1].user == _userData.user) {
					if (i == stampList[j-1].day - 1) {
						if (_year == stampList[j-1].year && _month == stampList[j-1].month && _day == stampList[j-1].day) {
							stampTarget.push(stampList[j-1]);
						}
					}
				}
			}
		}

		return stampTarget;
	},

	// スタンプデータの追加
	addStampList:function(_stampData){
		Ti.API.debug('[func]addStampList:');
		_stampData.no = parseInt(stampList[0].no, 10) + 1;
		stampList.unshift(_stampData);
	},
	// スタンプデータの更新
	updateStampList:function(_stampData){
		Ti.API.debug('[func]updateStampList:');
		for (var i=0; i<stampList.length; i++) {
			if (stampList[i].no == _stampData.no) {
				stampList[i] = _stampData;
				break;
			}
		}
	},

	// 選択スタンプのリストを取得
	getStampSelectList:function(){
		Ti.API.debug('[func]getStampSelectList:');
		return stampSelectList;
	},

	// 指定スタンプの履歴データを取得
	getStampHistoryList:function(_stamp){
		Ti.API.debug('[func]getStampHistoryList:');
		for (var i=0; i<stampHistoryList.length; i++) {
			if (stampHistoryList[i].stamp == _stamp) {
				return stampHistoryList[i].textList;
			}
		}
	},

	// ライクリストに追加
	addLikeList:function(_likeList){
		Ti.API.debug('[func]addLikeList:');
		_likeList.seq = 1;
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _likeList.no) {
				_likeList.seq = parseInt(likeList[i].seq, 10) + 1;
				break;
			}
		}
		likeList.unshift(_likeList);

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
	// ライク数の取得
	getLikeCount:function(_articleNo){
		Ti.API.debug('[func]getLikeCount:');
		var count = 0;
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _articleNo) {
				count++;
			}
		}
		return count;
	},

	// コメントリストに追加
	addCommentList:function(_commentList){
		Ti.API.debug('[func]addCommentList:');
		_commentList.seq = 1;
		for (var i=0; i<commentList.length; i++) {
			if (commentList[i].no == _commentList.no) {
				_commentList.seq = parseInt(commentList[i].seq, 10) + 1;
				break;
			}
		}
		// 末尾に追加
		commentList.push(_commentList);

		for (var i=0; i<articleList.length; i++) {
			if (articleList[i].no == _commentList.no) {
				articleList[i].comment++;
				break;
			}
		}
	},
	// コメントリストの取得
	getCommentList:function(_articleNo, _prevCommentIndex, _commentCount){
		Ti.API.debug('[func]getCommentList:');
		var target = [];
		var pushCount = 0;
		var pushFlag = false;
		if (_prevCommentIndex == null) {
			pushFlag = true;
		}

		for (var i=0; i<commentList.length; i++) {
			if (commentList[i].no == _articleNo) {
				if (pushFlag) {
					target.push(commentList[i]);
					pushCount++;
					if (pushCount == _commentCount) {
						return target;
					}
				}
				if (commentList[i].seq == _prevCommentIndex) {
					pushFlag = true;
				}
			}
		}
		return target;
	},
	// コメント数の取得
	getCommentCount:function(_articleNo){
		Ti.API.debug('[func]getCommentCount:');
		var count = 0;
		for (var i=0; i<commentList.length; i++) {
			if (commentList[i].no == _articleNo) {
				count++;
			}
		}
		return count;
	},
	// コメントの削除
	removeCommentList:function(_user, _articleNo, _seq){
		Ti.API.debug('[func]removeCommentList:');
		for (var i=0; i<commentList.length; i++) {
			if (commentList[i].no == _articleNo && commentList[i].seq == _seq) {
				commentList.splice(i, 1);
				break;
			}
		}
		for (var i=0; i<articleList.length; i++) {
			if (articleList[i].no == _articleNo) {
				articleList[i].comment--;
				break;
			}
		}
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
			// 先頭に追加
			userList.unshift(_userData);
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
	getFollowList:function(_user, _prevUserIndex, _followCount){
		Ti.API.debug('[func]getFollowList:');
		var target = [];
		var pushCount = 0;
		var pushFlag = false;
		if (_prevUserIndex == null) {
			pushFlag = true;
		}

		for (var i=0; i<followList.length; i++) {
			if (followList[i].user == _user) {
				for (var j=0; j<userList.length; j++) {
					if (userList[j].user == followList[i].follow) {
						if (pushFlag) {
							target.push(userList[j]);
							pushCount++;
							if (pushCount == _followCount) {
								return target;
							}
						}
						if (followList[i].follow == _prevUserIndex) {
							pushFlag = true;
						}
					}
				}
			}
		}
		return target;
	},
	// フォロワのユーザリストの取得
	getFollowerList:function(_user, _prevUserIndex, _followerCount){
		Ti.API.debug('[func]getFollowerList:');
		var target = [];
		var pushCount = 0;
		var pushFlag = false;
		if (_prevUserIndex == null) {
			pushFlag = true;
		}

		for (var i=0; i<followList.length; i++) {
			if (followList[i].follow == _user) {
				for (var j=0; j<userList.length; j++) {
					if (userList[j].user == followList[i].user) {
						if (pushFlag) {
							target.push(userList[j]);
							pushCount++;
							if (pushCount == _followerCount) {
								return target;
							}
						}
						if (followList[i].user == _prevUserIndex) {
							pushFlag = true;
						}
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
			// 先頭に追加
			followList.unshift({user:_user, follow:_follow});
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
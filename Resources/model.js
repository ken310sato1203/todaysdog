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
//loginId = "maki.oshika.9";

articleList = [
	{id:"23", no:"A0023", userId:"maki.oshika.9", user:"maki.oshika.9", name:"さとう さくら", date:"2013-04-09 10:26:05", text:"3明けましておめでとうございます。", like:"0", comment:"0"},
	{id:"22", no:"A0022", userId:"51f7d0af51dfe2157f01843d", user:"ken_sato", name:"さとう けん", date:"2013-04-09 08:26:05", text:"2明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"21", no:"A0021", userId:"kuro", user:"kuro", name:"クロ", date:"2013-04-09 07:26:05", text:"1明けましておめでとうございます。今年もよい年になりますように。", like:"0", comment:"0"},
	{id:"20", no:"A0020", userId:"santa", user:"santa", name:"サンタ", date:"2013-04-06 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"19", no:"A0019", userId:"gon", user:"gon", name:"ゴン", date:"2013-04-06 06:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"18", no:"A0018", userId:"jiro", user:"jiro", name:"ジロー", date:"2013-04-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"17", no:"A0017", userId:"momo", user:"momo", name:"モモ", date:"2013-03-27 12:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"16", no:"A0016", userId:"maki.oshika.9", user:"maki.oshika.9", name:"さとう さくら", date:"2013-03-27 10:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"15", no:"A0015", userId:"51f7d0af51dfe2157f01843d", user:"ken_sato", name:"さとう けん", date:"2013-03-27 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"14", no:"A0014", userId:"momo", user:"momo", name:"モモ", date:"2013-03-24 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"13", no:"A0013", userId:"kuro", user:"kuro", name:"クロ", date:"2013-03-23 15:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"12", no:"A0012", userId:"gon", user:"gon", name:"ゴン", date:"2013-03-23 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"11", no:"A0011", userId:"jiro", user:"jiro", name:"ジロー", date:"2013-03-21 20:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"10", no:"A0010", userId:"santa", user:"santa", name:"サンタ", date:"2013-03-21 09:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"9", no:"A0009", userId:"momo", user:"momo", name:"モモ", date:"2013-03-21 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"8", no:"A0008", userId:"kuro",user:"kuro",  name:"クロ", date:"2013-03-17 11:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"7", no:"A0007", userId:"gon", user:"gon", name:"ゴン", date:"2013-03-17 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"6", no:"A0006", userId:"jiro", user:"jiro", name:"ジロー", date:"2013-03-13 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"5", no:"A0005", userId:"maki.oshika.9", user:"maki.oshika.9", name:"さとう さくら", date:"2013-03-03 09:26:05", text:"3明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"4", no:"A0004", userId:"maki.oshika.9", user:"maki.oshika.9", name:"さとう さくら", date:"2013-03-03 08:26:05", text:"2明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"3", no:"A0003", userId:"maki.oshika.9", user:"maki.oshika.9", name:"さとう さくら", date:"2013-03-03 07:26:05", text:"1明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"2", no:"A0002", userId:"51f7d0af51dfe2157f01843d", user:"ken_sato", name:"さとう けん", date:"2013-03-02 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
	{id:"1", no:"A0001", userId:"maki.oshika.9", user:"maki.oshika.9", name:"さとう さくら", date:"2013-03-01 07:26:05", text:"明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", like:"0", comment:"0"},
];

commentList = [
	{no:"A0021", seq:"1", userId:"jiro", name:"ジロー", date:"2013-03-01 13:37:02", text:"ことよろ。"},
	{no:"A0021", seq:"2", userId:"jiro", name:"ジロー", date:"2013-03-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0022", seq:"1", userId:"51f7d0af51dfe2157f01843d", name:"さとう さくら", date:"2013-03-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0022", seq:"2", userId:"koro", name:"クロ", date:"2013-03-03 09:23:45", text:"今年もよろしく。"},
	{no:"A0022", seq:"3", userId:"gon", name:"ゴン", date:"2013-03-05 09:23:45", text:"今年もよろしく。"},
	{no:"A0023", seq:"1", userId:"shiro", name:"シロ", date:"2013-03-02 09:23:45", text:"今年もよろしく。"},
	{no:"A0024", seq:"1", userId:"kuro", name:"クロ", date:"2013-03-10 08:14:27", text:"今年もよろしくお願いします。あけましておめでとうございます。今年もよろしくお願いします。あけましておめでとうございます。"},
];

likeList = [
	{no:"A0020", seq:"2", userId:"51f7d0af51dfe2157f01843d", date:"2013-03-02 09:23:45"},
	{no:"A0020", seq:"1", userId:"maki.oshika.9", date:"2013-03-01 08:14:27"},
	{no:"A0021", seq:"1", userId:"pochi", date:"2013-03-03 13:37:02"},
	{no:"A0022", seq:"2", userId:"momo", date:"2013-03-05 11:37:02"},
	{no:"A0022", seq:"1", userId:"maki.oshika.9", date:"2013-03-04 12:37:02"},
	{no:"A0023", seq:"1", userId:"maki.oshika.9", date:"2013-03-06 10:37:02"},
];

userList = [
	{id:"maki.oshika.9", user:"maki.oshika.9", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう さくら", breed:"ダックスフント", sex:"♀", birth:"2005-12-07", memo:"東京在住、ビール党。東京在住、ビール党。東京在住、ビール党。東京在住、ビール党。東京在住、ビール党。", icon:"images/icon/i_maki.oshika.9.png", cover:""},
//	{id:"51f7d0af51dfe2157f01843d", user:"ken_sato", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう けん", breed:"ダックスフント", sex:"♂", birth:"2005-12-07", memo:"東京在住、びびり。東京在住、びびり。東京在住、びびり。東京在住、びびり。東京在住、びびり。", icon:"", cover:""},
	{id:"koro", user:"koro", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう コロ", breed:"ダックスフント", sex:"♂", birth:"2005-12-07", memo:"びびり", icon:"", cover:""},
	{id:"shiro", user:"shiro", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう しろ", breed:"ダックスフント", sex:"♀", birth:"2005-12-07", memo:"びびり", icon:"", cover:""},
	{id:"pochi", user:"pochi", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう ポチ", breed:"ダックスフント", sex:"♂", birth:"2005-12-07", memo:"びびり", icon:"", cover:""},
	{id:"jiro", user:"jiro", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう ジロー", breed:"ダックスフント", sex:"♂", birth:"2005-12-07", memo:"びびり", icon:"", cover:""},
	{id:"gon", user:"gon", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう ゴン", breed:"ダックスフント", sex:"♂", birth:"2005-12-07", memo:"びびり", icon:"", cover:""},
	{id:"kuro", user:"kuro", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう クロ", breed:"ダックスフント", sex:"♂", birth:"2005-12-07", memo:"びびり", icon:"", cover:""},
	{id:"momo", user:"momo", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう もも", breed:"ダックスフント", sex:"♀", birth:"2005-12-07", memo:"びびり", icon:"", cover:""},
	{id:"santa", user:"santa", photo:"0", like:"0", follow:"0", follower:"0", name:"さとう サンタ", breed:"ダックスフント", sex:"♂", birth:"2005-12-07", memo:"びびり", icon:"", cover:""},
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
	{userId:"maki.oshika.9", follow:"51f7d0af51dfe2157f01843d"},
	{userId:"maki.oshika.9", follow:"kuro"},
	{userId:"maki.oshika.9", follow:"santa"},
	{userId:"maki.oshika.9", follow:"gon"},
	{userId:"maki.oshika.9", follow:"jiro"},
	{userId:"maki.oshika.9", follow:"momo"},
	{userId:"51f7d0af51dfe2157f01843d", follow:"maki.oshika.9"},
	{userId:"51f7d0af51dfe2157f01843d", follow:"koro"},
	{userId:"51f7d0af51dfe2157f01843d", follow:"shiro"},
	{userId:"shiro", follow:"maki.oshika.9"},
];

stampList = [
	{no:"12", userId:"maki.oshika.9", stamp:"stamp_walking1", text:"朝のさんぽ、いいうんち", year:2013, month:6, day:1, hour:16, repeat:"0", date:"2013-03-04 10:23:45"},
	{no:"11", userId:"maki.oshika.9", stamp:"stamp_restaurant1", text:"お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。", year:2013, month:6, day:1, hour:15, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"10", userId:"maki.oshika.9", stamp:"stamp_walking1", text:"朝のさんぽ、いいうんち。朝のさんぽ、いいうんち。朝のさんぽ、いい", year:2013, month:6, day:1, hour:-1, repeat:"0", date:"2013-03-04 10:23:45"},
	{no:"9", userId:"maki.oshika.9", stamp:"stamp_restaurant1", text:"お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。お昼ごはん、がっつり食べた。", year:2013, month:6, day:1, hour:-1, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"8", userId:"maki.oshika.9", stamp:"stamp_warning", text:"シャンプー予約", year:2013, month:4, day:10, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"7", userId:"maki.oshika.9", stamp:"stamp_star", text:"公園でBBQ", year:2013, month:4, day:8, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"6", userId:"maki.oshika.9", stamp:"stamp_injection", text:"のみだに薬", year:2013, month:4, day:8, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"5", userId:"maki.oshika.9", stamp:"stamp_restaurant1", text:"お昼ごはん、がっつり食べた", year:2013, month:4, day:7, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"4", userId:"maki.oshika.9", stamp:"stamp_walking1", text:"朝のさんぽ、いいうんち", year:2013, month:4, day:5, hour:10, repeat:"0", date:"2013-03-04 10:23:45"},
	{no:"3", userId:"maki.oshika.9", stamp:"stamp_walking1", text:"朝のさんぽ、いいうんち", year:2013, month:4, day:24, hour:9, repeat:"0", date:"2013-03-04 10:23:45"},
	{no:"2", userId:"maki.oshika.9", stamp:"stamp_restaurant1", text:"お昼ごはん、がっつり食べた", year:2013, month:3, day:4, hour:13, repeat:"0", date:"2013-03-04 15:23:45"},
	{no:"1", userId:"maki.oshika.9", stamp:"stamp_walking1", text:"朝のさんぽ、いいうんち", year:2013, month:3, day:4, hour:9, repeat:"0", date:"2013-03-04 10:23:45"},
];

stampSelectList = [
	{type:"one", title:"お天気",stampList:["stamp_sun","stamp_cloud","stamp_rain"]},
	{type:"one", title:"体調",stampList:["stamp_barking1","stamp_barking2","stamp_barking3"]},
	{type:"one", title:"ご飯",stampList:["stamp_restaurant1","stamp_restaurant2","stamp_restaurant3"]},
	{type:"one", title:"うんち",stampList:["stamp_favorite1","stamp_favorite2","stamp_favorite3"]},
	{type:"one", title:"散歩",stampList:["stamp_walking1","stamp_walking2","stamp_walking3"]},
	{type:"all", title:"薬・病院",stampList:["stamp_medicine","stamp_injection","stamp_plus"]},
	{type:"all", title:"シャンプー\nホテル",stampList:["stamp_warning","stamp_home","stamp_cart"]},
	{type:"all", title:"おでかけ\nイベント",stampList:["stamp_star","stamp_trip","stamp_calendar"]},
];

stampHistoryList = [
	{stamp:"stamp_sun",textList:["本日は晴れなり","いいお天気"]},
	{stamp:"stamp_cloud",textList:["本日は曇りなり","過ごしやすい天気"]},
	{stamp:"stamp_rain",textList:["本日は雨なり","雨で散歩いけないね"]},
	{stamp:"stamp_barking1",textList:["テンション高！","元気です！"]},
	{stamp:"stamp_barking2",textList:["いつもどおり","まぁまぁかな"]},
	{stamp:"stamp_barking3",textList:["おつかれ","元気ないね"]},
	{stamp:"stamp_restaurant1",textList:["朝ご飯完食！","昼ご飯完食！","夜ご飯完食！"]},
	{stamp:"stamp_restaurant2",textList:["朝ご飯ちょい","昼ご飯ちょい","夜ご飯ちょい"]},
	{stamp:"stamp_restaurant3",textList:["朝ご飯食べず","昼ご飯食べず","夜ご飯食べず"]},
	{stamp:"stamp_favorite1",textList:["がっつり出ました！","いい固さ！"]},
	{stamp:"stamp_favorite2",textList:["ちょいやわからめ","量は少ないけど固め"]},
	{stamp:"stamp_favorite3",textList:["やわらかめ","お腹こわしてるね"]},
	{stamp:"stamp_walking1",textList:["朝のお散歩元気！","昼のお散歩元気！","夜のお散歩元気！"]},
	{stamp:"stamp_walking2",textList:["朝のお散歩普通","昼のお散歩普通","夜のお散歩普通"]},
	{stamp:"stamp_walking3",textList:["朝のお散歩即帰り","昼のお散歩即帰り","夜のお散歩即帰り"]},
	{stamp:"stamp_medicine",textList:["フィラリア","のみだに"]},
	{stamp:"stamp_injection",textList:["注射"]},
	{stamp:"stamp_plus",textList:["病院"]},
	{stamp:"stamp_warning",textList:["シャンプー"]},
	{stamp:"stamp_home",textList:["お泊まり"]},
	{stamp:"stamp_cart",textList:["買い物"]},
	{stamp:"stamp_star",textList:["イベント"]},
	{stamp:"stamp_trip",textList:["旅行"]},
	{stamp:"stamp_calendar",textList:["記念日"]},
];


for (var i=0; i<articleList.length; i++) {
	for (var j=0; j<userList.length; j++) {
		if (articleList[i].userId == userList[j].id) {
			userList[j].photo++;
		}
	}
}
for (var i=0; i<likeList.length; i++) {
	for (var j=0; j<userList.length; j++) {
		if (likeList[i].userId == userList[j].id) {
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
		if (followList[i].userId == userList[j].id) {
			userList[j].follow++;
		}
		if (followList[i].follow == userList[j]	) {
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

	// ログイン
	loginCloudUser:function(_type, _token, callback){
		Ti.API.debug('[func]loginCloudUser:');

		Cloud.SocialIntegrations.externalAccountLogin({
			type: _type, 
			token: _token
		}, function (e) {
			if (e.success) {
				Ti.API.debug('success:');
				var user = e.users[0];
				var userData = {
					id: user.id,
					user: user.first_name + '_' + user.last_name,
					photo: 0,
					like: 0,
					follow: 0,
					follower: 0, 
					name: user.custom_fields.name,
					breed: user.custom_fields.breed,
					sex: user.custom_fields.sex,
					birth: user.custom_fields.birth, 
					memo: user.custom_fields.memo,
					icon: user.photo ? user.photo.urls.square_75 : null,
//						icon: 'http://graph.facebook.com/' + custom_fields.external_accounts[0].external_id + '/picture?type=normal',
//						icon: 'http://graph.facebook.com/maki.oshika.9/picture?type=normal',
					cover: '',
				};
				if (user.custom_fields) {
					userData.name = user.custom_fields.name ? user.custom_fields.name : '';
					userData.breed = user.custom_fields.breed ? user.custom_fields.breed : '';
					userData.sex = user.custom_fields.sex ? user.custom_fields.sex : '';
					userData.birth = user.custom_fields.birth ? user.custom_fields.birth : '';
					userData.memo = user.custom_fields.memo ? user.custom_fields.memo : '';
				}
				e.userData = userData;
			}
			callback(e);
		});
	},

	// ローカルに画像を保存
	saveLocalImage:function(_imageBlob, _dirPath, _fileName){
		Ti.API.debug('[func]saveLocalImage:');
		var photoDir  = Ti.Filesystem.getFile(_dirPath);
		if (! photoDir.exists()) {
			photoDir.createDirectory();
		}
		var photoFile  = Ti.Filesystem.getFile(photoDir.nativePath + _fileName + '.png');
		photoFile.write(_imageBlob);
	},

	// 記事の投稿
	postCloudArticle:function(_articleData, _imageBlob, callback){
		Ti.API.debug('[func]postCloudArticle:');
		
		var articleDate = util.getDate(_articleData.date);		
		Cloud.Posts.create({
			content: _articleData.text,
			photo: _imageBlob,
			custom_fields: {
				postDate: util.getCloudFormattedDateTime(articleDate)
			}
		}, function (e) {
			callback(e);
		});
	},

	// 友人の取得
	getCloudFriends:function(_id, callback){
		Ti.API.debug('[func]getCloudFriends:');

		Cloud.Friends.search({
			user_id: _id
		}, function (e) {
			var userList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.users.length; i++) {
					var user = e.users[i];
					var userData = {
						id: user.id,
						user: user.first_name + '_' + user.last_name,
						photo: 0,
						like: 0,
						follow: 0,
						follower: 0, 
						name: user.custom_fields.name,
						breed: user.custom_fields.breed,
						sex: user.custom_fields.sex,
						birth: user.custom_fields.birth, 
						memo: user.custom_fields.memo,
						icon: user.photo ? user.photo.urls.square_75 : null,
						cover: '',
					};
					userList.push(userData);
				}				
			}
			e.userList = userList; 
			callback(e);
		});
	},

	// 記事の取得
	getCloudArticle:function(params, callback){
		Ti.API.debug('[func]getCloudArticle:');

		// ACSではUTC標準時間で登録されるため、日本時間との時差を加算
		var offset = (new Date()).getTimezoneOffset() / 60 * -1;
		var startDate = params.startDate;
		var endDate = params.endDate;
		startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), offset);
		endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1, offset);

		Cloud.Posts.query({
			where: {
				user_id: { "$in": params.userIdList },
				'postDate': {
					"$gte": startDate,
					"$lt": endDate
				}
			},
			order: '-created_at',
			page : 1,
			per_page : 5000
		}, function (e) {
			var articleList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.posts.length; i++) {
					var post = e.posts[i];
					var postDate = util.getDate(post.custom_fields.postDate);
					var articleData = {
						id: post.id,
						userId: post.user.id,
						text: post.content,
						date: util.getFormattedDateTime(postDate),
						photo: post.photo.urls.original,
						like: 0,
						comment: 0,
						icon: post.user.photo.urls.square_75
					};
					articleList.push(articleData);
				}				
			}
			e.articleList = articleList; 
			callback(e);
		});
	},

	// ログインIDの登録
	setLoginId:function(_id){
		Ti.API.debug('[func]setLoginId:');
		loginId = _id;
	},
	// ログインIDの取得
	getLoginId:function(){
		Ti.API.debug('[func]getLoginId:');
		return loginId;
	},

	// 記事の追加
	addArticleList:function(_articleData){
		Ti.API.debug('[func]addArticleList:');
		_articleData.id = parseInt(articleList[0].id, 10) + 1;
		articleList.unshift(_articleData);
		for (var i=0; i<userList.length; i++) {
			if (userList[i].id == _articleData.userId) {
				userList[i].photo++;
				break;
			}
		}
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
					if (articleList[i].userId == _userData.id) {
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
						if (articleList[i].no == likeList[j].no && likeList[j].userId == _userData.id) {
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
					if (articleList[i].userId == _userData.id) {
						target.push(articleList[i]);
						pushCount++;
					} else {
						for (var j=0; j<followList.length; j++) {
							if (followList[j].userId == _userData.id) {
								if (articleList[i].userId == followList[j].follow) {
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
				if (articleList[i].userId == _userData.id) {
					if (articleList[i].no != _notInArticleData.no) {
						target.push(articleList[i]);
					}
				}
			}

		} else {
			for (var i=0; i<articleList.length; i++) {
				if (articleList[i].userId == _userData.id) {
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
			if (articleList[i-1].userId == _userData.id) {
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
				if (articleList[j-1].userId == _userData.id) {
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
		var stampList = [];

		var daysInMonth = 32 - new Date(_year, _month-1, 32).getDate();
		for (var i=0; i < daysInMonth; i++) {
			for (var j=stampList.length; j>0; j--) {
				if (stampList[j-1].userId == _userData.id) {
					if (i == stampList[j-1].day - 1) {
						if (_year == stampList[j-1].year && _month == stampList[j-1].month) {
							stampList.push(stampList[j-1]);
						}
					}
				}
			}
		}

		return stampList;
	},

	// 指定ユーザのスタンプリストから指定月のデータを取得
	getCloudStampList:function(params, callback){
		Ti.API.debug('[func]getCloudStampList:');
		
		// ACSではUTC標準時間で登録されるため、日本時間との時差を加算
		var offset = (new Date()).getTimezoneOffset() / 60 * -1;
		var startDate = null;
		var endDate = null;
		if (params.day == null) {
			startDate = new Date(params.year, params.month-1, 1, offset);
			endDate = new Date(params.year, params.month, 1, offset);
		} else {
			startDate = new Date(params.year, params.month-1, params.day, offset);
			endDate = new Date(params.year, params.month-1, params.day+1, offset);
		}

		Cloud.Events.query({
			where: {
				user_id: params.userId,
				start_time : {
					"$gte": startDate,
					"$lt": endDate
				}
			},
			order: 'start_time',
			page : 1,
			per_page : 5000
		}, function (e) {
			var stampList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.events.length; i++) {
					var event = e.events[i];
					Ti.API.debug('id: ' + event.id +
					' /name: ' + event.name + 
					' /start time: ' + event.start_time);

					var startDate = util.getDate(event.start_time);
					var hour = startDate.getHours();
					if (event.custom_fields.allday) {
						hour = -1;
					}

					var cloudStampList = event.custom_fields.stampList;
					for (var j = 0; j < cloudStampList.length; j++) {
						var stampData = {
							userId: event.user_id,
							stamp: cloudStampList[j].stamp,
							text: cloudStampList[j].text,
							year: startDate.getFullYear(),
							month: startDate.getMonth() + 1,
							day: startDate.getDate(),
							hour: hour
						};
						stampList.push(stampData);
					}
				}
			}
			e.stampList = stampList;
			callback(e);
		});
	},

	// 指定ユーザのスタンプリストから指定日のデータを取得
	getStampDayList:function(_userData, _year, _month, _day){
		Ti.API.debug('[func]getStampDayList:');
		var stampList = [];

		var daysInMonth = 32 - new Date(_year, _month-1, 32).getDate();
		for (var i=0; i < daysInMonth; i++) {
			for (var j=stampList.length; j>0; j--) {
				if (stampList[j-1].userId == _userData.id) {
					if (i == stampList[j-1].day - 1) {
						if (_year == stampList[j-1].year && _month == stampList[j-1].month && _day == stampList[j-1].day) {
							stampList.push(stampList[j-1]);
						}
					}
				}
			}
		}

		return stampList;
	},

	// スタンプデータの追加
	addStampList:function(_stampData){
		Ti.API.debug('[func]addStampList:');
		_stampData.no = parseInt(stampList[0].no, 10) + 1;
		stampList.unshift(_stampData);
	},
	
	// スタンプデータの追加
	addCloudStampList:function(_stampDataList, callback){
		Ti.API.debug('[func]addCloudStampList:');

		var stampDate = new Date(
			_stampDataList[0].year, 
			_stampDataList[0].month-1, 
			_stampDataList[0].day, 
			_stampDataList[0].hour);
		var allday = false;
		if (_stampDataList[0].hour == -1) {
			allday = true;
			_stampDataList[0].hour = 0;
		}

		var stampList = [];
		for (var i=0; i<_stampDataList.length; i++) {
			stampList.push({
				stamp: _stampDataList[i].stamp,
				text: _stampDataList[i].text});
		}

		Cloud.Events.create({
			name: 'diary',
			start_time: util.getCloudFormattedDateTime(stampDate),
			custom_fields: {
				allday: allday,
				stampList: stampList
			}
		}, function (e) {
			callback(e);
		});

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
			if (userList[i].id == _likeList.userId) {
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
	removeLikeList:function(_articleNo, _id){
		Ti.API.debug('[func]removeLikeList:');
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _articleNo && likeList[i].userId == _id) {
				likeList.splice(i, 1);
				break;
			}
		}
		for (var i=0; i<userList.length; i++) {
			if (userList[i].id == _id) {
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
	checkLikeList:function(_articleNo, _id){
		Ti.API.debug('[func]checkLikeList:');
		for (var i=0; i<likeList.length; i++) {
			if (likeList[i].no == _articleNo && likeList[i].userId == _id) {
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
	removeCommentList:function(_id, _articleNo, _seq){
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
			if (userList[i].id == _userData.id) {
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
			if (userList[i].id == _userData.id) {
				userList[i] = _userData;
				break;
			}
		}
	},

	// ユーザデータの更新
	updateCloudUser:function(_userData, callback){
		Ti.API.debug('[func]updateCloudUser:');
		Cloud.Users.update({
			custom_fields: {
				name: _userData.name,
				breed: _userData.breed,
				sex: _userData.sex,
				birth: _userData.birth,
				memo: _userData.memo
			}
		}, function (e) {
			callback(e);
		});
		
	},

	// ユーザデータの取得
	getUser:function(_id){
		Ti.API.debug('[func]getUser:');
		var target = null;
		for (var i=0; i<userList.length; i++) {
			if (userList[i].id == _id) {
				target = userList[i];
				break;
			}
		}
		return target;
	},

	// アイコンの登録
	updateCloudUserIcon:function(_iconBlob, callback){
		Ti.API.debug('[func]updateCloudUserIcon:');
		Cloud.Users.update({
			photo: _iconBlob,
		}, function (e) {
			callback(e);
/*
			if (e.success) {
				// 更新後の情報を取得
				Cloud.Users.showMe(function (e) {
					callback(e);
				});
			} else {
				callback(e);
			}
*/
		});
	},

	// アイコンの取得
	getCloudUserIcon:function(_userData, callback){
		Ti.API.debug('[func]getCloudUserIcon:');
		Cloud.Users.query({
			id: _userData.id,
		}, function (e) {
			if (e.success) {
				Cloud.Photos.query({
					id : e.users[0].photo.id
				}, function (e) {
					callback(e);
				});					
			}
			callback(e);
		});
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
	getFollowList:function(_id, _prevUserIndex, _followCount){
		Ti.API.debug('[func]getFollowList:');
		var target = [];
		var pushCount = 0;
		var pushFlag = false;
		if (_prevUserIndex == null) {
			pushFlag = true;
		}

		for (var i=0; i<followList.length; i++) {
			if (followList[i].userId == _id) {
				for (var j=0; j<userList.length; j++) {
					if (userList[j].id == followList[i].follow) {
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
	getFollowerList:function(_id, _prevUserIndex, _followerCount){
		Ti.API.debug('[func]getFollowerList:');
		var target = [];
		var pushCount = 0;
		var pushFlag = false;
		if (_prevUserIndex == null) {
			pushFlag = true;
		}

		for (var i=0; i<followList.length; i++) {
			if (followList[i].follow == _id) {
				for (var j=0; j<userList.length; j++) {
					if (userList[j].id == followList[i].userId) {
						if (pushFlag) {
							target.push(userList[j]);
							pushCount++;
							if (pushCount == _followerCount) {
								return target;
							}
						}
						if (followList[i].userId == _prevUserIndex) {
							pushFlag = true;
						}
					}
				}
			}
		}
		return target;
	},
	// フォローしているかのチェック
	checkFollowList:function(_id, _follow){
		Ti.API.debug('[func]checkFollowList:');
		for (var i=0; i<followList.length; i++) {
			if (followList[i].userId == _id) {
				if (followList[i].follow == _follow) {
					return true;
				}
			}
		}
		return false;
	},
	// フォローユーザの追加
	addFollowList:function(_id, _follow){
		Ti.API.debug('[func]addFollowList:');
		var existFlag = false;
		for (var i=0; i<followList.length; i++) {
			if (followList[i].userId == _id && followList[i].follow == _follow) {
				existFlag = true;
				break;
			}
		}
		if (! existFlag) {
			// 先頭に追加
			followList.unshift({user:_id, follow:_follow});
			for (var i=0; i<userList.length; i++) {
				if (userList[i].id == _id) {
					userList[i].follow++;
					break;
				}
			}
			for (var i=0; i<userList.length; i++) {
				if (userList[i].id == _follow) {
					userList[i].follower++;
					break;
				}
			}		
		}
	},
	// フォローユーザの削除
	removeFollowList:function(_id, _follow){
		Ti.API.debug('[func]removeFollowList:');
		for (var i=0; i<followList.length; i++) {
			if (followList[i].userId == _id && followList[i].follow == _follow) {
				followList.splice(i, 1);
				break;
			}
		}
		for (var i=0; i<userList.length; i++) {
			if (userList[i].id == _id) {
				userList[i].follow--;
				break;
			}
		}
		for (var i=0; i<userList.length; i++) {
			if (userList[i].id == _follow) {
				userList[i].follower--;
				break;
			}
		}		
	},
	
};

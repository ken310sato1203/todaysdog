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

/*
likeList = [
	{no:"A0020", seq:"2", userId:"51f7d0af51dfe2157f01843d", date:"2013-03-02 09:23:45"},
	{no:"A0020", seq:"1", userId:"maki.oshika.9", date:"2013-03-01 08:14:27"},
	{no:"A0021", seq:"1", userId:"pochi", date:"2013-03-03 13:37:02"},
	{no:"A0022", seq:"2", userId:"momo", date:"2013-03-05 11:37:02"},
	{no:"A0022", seq:"1", userId:"maki.oshika.9", date:"2013-03-04 12:37:02"},
	{no:"A0023", seq:"1", userId:"maki.oshika.9", date:"2013-03-06 10:37:02"},
];
*/
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
	{type:"all", title:"シャンプー\nホテル",stampList:["stamp_wash","stamp_cut","stamp_home"]},
	{type:"all", title:"おでかけ\nイベント",stampList:["stamp_alarm","stamp_trip","stamp_star"]},
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
	{stamp:"stamp_wash",textList:["シャンプー"]},
	{stamp:"stamp_cut",textList:["カット"]},
	{stamp:"stamp_home",textList:["お泊まり"]},
	{stamp:"stamp_alarm",textList:["イベント"]},
	{stamp:"stamp_trip",textList:["旅行"]},
	{stamp:"stamp_star",textList:["記念日"]},
];


for (var i=0; i<articleList.length; i++) {
	for (var j=0; j<userList.length; j++) {
		if (articleList[i].userId == userList[j].id) {
			userList[j].photo++;
		}
	}
}
/*
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
*/
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
					user: user.first_name + ' ' + user.last_name,
					photo: 0,
					like: 0,
					follow: 0,
					follower: 0, 
					name: '',
					breed: '',
					sex: '',
					birth: '', 
					memo: '',
					post: null,
					like: null,
					icon: null,
//					icon: 'http://graph.facebook.com/' + custom_fields.external_accounts[0].external_id + '/picture?type=normal',
//					icon: 'http://graph.facebook.com/maki.oshika.9/picture?type=normal',
				};
				if (user.custom_fields) {
					if (user.custom_fields.name != null)  { userData.name = user.custom_fields.name; }
					if (user.custom_fields.breed != null) { userData.breed = user.custom_fields.breed; }
					if (user.custom_fields.sex != null)   { userData.sex = user.custom_fields.sex; }
					if (user.custom_fields.birth != null) { userData.birth = user.custom_fields.birth; }
					if (user.custom_fields.memo != null)  { userData.memo = user.custom_fields.memo; }
					if (user.custom_fields.post != null)  { userData.post = user.custom_fields.post; }
					if (user.custom_fields.like != null)  { userData.like = user.custom_fields.like; }
				}
				if (user.photo) {
					userData.icon = user.photo.urls.square_75;
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

	// フォトコレクションの作成
	createCloudPhotoCollection:function(params, callback){
		Ti.API.debug('[func]createCloudPhotoCollection:');
		Cloud.PhotoCollections.create({
			name: params.name,
		}, function (e) {
			callback(e);
		});
	},

	// フォトコレクションの取得
	getCloudPhotoCollection:function(params, callback){
		Ti.API.debug('[func]getCloudPhotoCollection:');
		Cloud.PhotoCollections.search({
			user_id: params.userId,
		}, function (e) {
			callback(e);
		});
	},
	// ライクコレクションの取得
	getCloudLikeCollection:function(params, callback){
		Ti.API.debug('[func]getCloudLikeCollection:');
		// LikeがAPIでサポートされてないのでPhotoCollectionsを使わずReviewsから取得
		Cloud.Reviews.query({
			where: {
				user_id: params.userId,
				rating: 1
			},
		}, function (e) {
			callback(e);
		});
	},

	// フォトの取得
	getCloudPhoto:function(params, callback){
		Ti.API.debug('[func]getCloudPhoto:');

		Cloud.PhotoCollections.showPhotos({
			collection_id: params.collection,
			order: '-created_at',
			page : params.page,
			per_page : params.count
		}, function (e) {
			callback(e);
		});
	},

	// 記事の投稿
	postCloudArticle:function(params, callback){
		Ti.API.debug('[func]postCloudArticle:');		
		var articleDate = util.getDate(params.date);

		Cloud.Photos.create({
			photo: params.photo,
			collection_name: 'post'
		}, function (e) {
			if (e.success) {
				Ti.API.debug('success:');
				Cloud.Posts.create({
					content: params.text,
					photo_id: e.photos[0].id,
					custom_fields: {
						postDate: util.getCloudFormattedDateTime(articleDate)
					}
				}, function (e) {
					callback(e);
				});
			} else {
				callback(e);				
			}
		});
	},

	// 友人の追加
	addCloudFriends:function(_id, callback){
		Ti.API.debug('[func]addCloudFriends:');
		// 承認なしの追加の場合、ACS管理画面でone-wayに設定し、下記approval_requiredは文字列でfalseを指定
		Cloud.Friends.add({
			user_ids: _id,
			approval_required: 'false',
		}, function (e) {
			callback(e);
		});
	},
	// 友人の削除
	removeCloudFriends:function(_id, callback){
		Ti.API.debug('[func]removeCloudFriends:');
		Cloud.Friends.remove({
			user_ids: _id
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
						user: user.first_name + ' ' + user.last_name,
						photo: 0,
						like: 0,
						follow: 0,
						follower: 0, 
						name: '',
						breed: '',
						sex: '',
						birth: '', 
						memo: '',
						post: null,
						like: null,
						icon: null,
					};
					if (user.custom_fields) {
						if (user.custom_fields.name != null)  { userData.name = user.custom_fields.name; }
						if (user.custom_fields.breed != null) { userData.breed = user.custom_fields.breed; }
						if (user.custom_fields.sex != null)   { userData.sex = user.custom_fields.sex; }
						if (user.custom_fields.birth != null) { userData.birth = user.custom_fields.birth; }
						if (user.custom_fields.memo != null)  { userData.memo = user.custom_fields.memo; }
						if (user.custom_fields.post != null)  { userData.post = user.custom_fields.post; }
						if (user.custom_fields.like != null)  { userData.like = user.custom_fields.like; }
					}
					if (user.photo) {
						userData.icon = user.photo.urls.square_75;
					}
					userList.push(userData);
				}				
			}
			e.userList = userList; 
			callback(e);
		});
	},

	// 友人の検索
	searchCloudFriends:function(params, callback){
		Ti.API.debug('[func]searchCloudFriends:');

		Cloud.Users.query({
			where:{ '$or': [
				{ username: {'$regex': '^' + params.name} }, 
				{ first_name: {'$regex': '^' + params.name} }, 
				{ last_name: {'$regex': '^' + params.name} }
			] },
			page: params.page,
			per_page: params.count
		}, function (e) {
			if (e.success) {
				Ti.API.debug('success:');
				var userList = [];
				for (var i = 0; i < e.users.length; i++) {
					var user = e.users[i];
					var userData = {
						id: user.id,
						user: user.first_name + ' ' + user.last_name,
						photo: 0,
						like: 0,
						follow: 0,
						follower: 0,
						name: '',
						breed: '',
						sex: '',
						birth: '', 
						memo: '',
						post: null,
						like: null,
						icon: null
					};
	
					if (user.custom_fields) {
						if (user.custom_fields.name != null)  { userData.name = user.custom_fields.name; }
						if (user.custom_fields.breed != null) { userData.breed = user.custom_fields.breed; }
						if (user.custom_fields.sex != null)   { userData.sex = user.custom_fields.sex; }
						if (user.custom_fields.birth != null) { userData.birth = user.custom_fields.birth; }
						if (user.custom_fields.memo != null)  { userData.memo = user.custom_fields.memo; }
						if (user.custom_fields.post != null)  { userData.post = user.custom_fields.post; }
						if (user.custom_fields.like != null)  { userData.like = user.custom_fields.like; }
					}
					if (user.photo) {
						userData.icon = user.photo.urls.square_75;
					}
					userList.push(userData);
				}
			}
			e.userList = userList;
			callback(e);
		});
	},

	// フォローの取得
	getCloudFollow:function(params, callback){
		Ti.API.debug('[func]getCloudFollow:');
		Cloud.Friends.search({
			user_id: params.userId,
			page: params.page,
			per_page: params.count
		}, function (e) {
			if (e.success) {
				Ti.API.debug('success:');
				var userList = [];
				for (var i = 0; i < e.users.length; i++) {
					var user = e.users[i];
					var userData = {
						id: user.id,
						user: user.first_name + ' ' + user.last_name,
						photo: 0,
						like: 0,
						follow: 0,
						follower: 0,
						name: '',
						breed: '',
						sex: '',
						birth: '', 
						memo: '',
						post: null,
						like: null,
						icon: null
					};
	
					if (user.custom_fields) {
						if (user.custom_fields.name != null)  { userData.name = user.custom_fields.name; }
						if (user.custom_fields.breed != null) { userData.breed = user.custom_fields.breed; }
						if (user.custom_fields.sex != null)   { userData.sex = user.custom_fields.sex; }
						if (user.custom_fields.birth != null) { userData.birth = user.custom_fields.birth; }
						if (user.custom_fields.memo != null)  { userData.memo = user.custom_fields.memo; }
						if (user.custom_fields.post != null)  { userData.post = user.custom_fields.post; }
						if (user.custom_fields.like != null)  { userData.like = user.custom_fields.like; }
					}
					if (user.photo) {
						userData.icon = user.photo.urls.square_75;
					}
					userList.push(userData);
				}
			}
			e.userList = userList;
			callback(e);
		});
	},
	// フォロワーの取得
	getCloudFollower:function(params, callback){
		Ti.API.debug('[func]getCloudFollower:');
		Cloud.Friends.search({
			user_id: params.userId,
			followers: 'true',
			page: params.page,
			per_page: params.count
		}, function (e) {
			if (e.success) {
				Ti.API.debug('success:');
				var userList = [];
				for (var i = 0; i < e.users.length; i++) {
					var user = e.users[i];
					var userData = {
						id: user.id,
						user: user.first_name + ' ' + user.last_name,
						photo: 0,
						like: 0,
						follow: 0,
						follower: 0,
						name: '',
						breed: '',
						sex: '',
						birth: '', 
						memo: '',
						post: null,
						like: null,
						icon: null
					};
	
					if (user.custom_fields) {
						if (user.custom_fields.name != null)  { userData.name = user.custom_fields.name; }
						if (user.custom_fields.breed != null) { userData.breed = user.custom_fields.breed; }
						if (user.custom_fields.sex != null)   { userData.sex = user.custom_fields.sex; }
						if (user.custom_fields.birth != null) { userData.birth = user.custom_fields.birth; }
						if (user.custom_fields.memo != null)  { userData.memo = user.custom_fields.memo; }
						if (user.custom_fields.post != null)  { userData.post = user.custom_fields.post; }
						if (user.custom_fields.like != null)  { userData.like = user.custom_fields.like; }
					}
					if (user.photo) {
						userData.icon = user.photo.urls.square_75;
					}
					userList.push(userData);
				}
			}
			e.userList = userList;
			callback(e);
		});
	},

	// フォローの取得
	getCloudFollowCount:function(params, callback){
		Ti.API.debug('[func]getCloudFollowCount:');
		Cloud.Friends.search({
			user_id: params.userId
		}, function (e) {
			callback(e);
		});
	},
	// フォロワーの取得
	getCloudFollowerCount:function(params, callback){
		Ti.API.debug('[func]getCloudFollowerCount:');
		Cloud.Friends.search({
			user_id: params.userId,
			followers: 'true',
		}, function (e) {
			callback(e);
		});
	},

	// 記事の取得
	getCloudArticle:function(params, callback){
		Ti.API.debug('[func]getCloudArticle:');
		var startDate = new Date(params.year, params.month-1, params.day);

		Cloud.Posts.query({
			where: {
				user_id: { '$in': params.idList },
				'postDate': {
					'$gte': util.getCloudFormattedDateTime(startDate)
				}
			},
			order: '-created_at',
			page : params.page,
			per_page : params.count
		}, function (e) {
			var articleList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.posts.length; i++) {
					var post = e.posts[i];
					var user = post.user;
					var postDate = util.getDate(post.custom_fields.postDate);
					var name = '';
					if (user.custom_fields && user.custom_fields.name) {
						name = user.custom_fields.name;
					}
					var likeCount = 0;
					var commentCount = 0;
					if (post.reviews_count && post.reviews_count > 0) {
						commentCount = post.reviews_count;
					}
					if (post.ratings_count && post.ratings_count > 0) {
						commentCount = commentCount - post.ratings_count;
						likeCount = post.ratings_count;
					}
					var articleData = {
						id: post.id,
						userId: user.id,
						user: user.first_name + ' ' + user.last_name,
						name: name,
						text: post.content,
						date: util.getFormattedDateTime(postDate),
						photo: post.photo.urls.original,
						like: likeCount,
						comment: commentCount,
						icon: user.photo.urls.square_75
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

/*
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
*/
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

	// 指定ユーザの記事リストから指定月の記事を取得
	getCloudArticleList:function(params, callback){
		Ti.API.debug('[func]getCloudArticleList:');
		var startDate = null;
		var endDate = null;
		if (params.day == null) {
			startDate = new Date(params.year, params.month-1, 1);
			endDate = new Date(params.year, params.month, 1);
		} else {
			startDate = new Date(params.year, params.month-1, params.day);
			endDate = new Date(params.year, params.month-1, params.day+1);
		}

		Cloud.Posts.query({
			where: {
				user_id: params.userId,
				'postDate': {
					'$gte': util.getCloudFormattedDateTime(startDate),
					'$lt': util.getCloudFormattedDateTime(endDate)
				}
			},
			order: 'created_at',
			page : 1,
			per_page : 31
		}, function (e) {
			var articleList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.posts.length; i++) {
					var post = e.posts[i];
					var user = post.user;
					var postDate = util.getDate(post.custom_fields.postDate);
					var name = '';
					if (user.custom_fields && user.custom_fields.name) {
						name = user.custom_fields.name;
					}
					var likeCount = 0;
					var commentCount = 0;
					if (post.reviews_count && post.reviews_count > 0) {
						commentCount = post.reviews_count;
					}
					if (post.ratings_count && post.ratings_count > 0) {
						commentCount = commentCount - post.ratings_count;
						likeCount = post.ratings_count;
					}
					var articleData = {
						id: post.id,
						userId: user.id,
						user: user.first_name + ' ' + user.last_name,
						name: name,
						text: post.content,
						date: util.getFormattedDateTime(postDate),
						photo: post.photo.urls.original,
						like: likeCount,
						comment: commentCount,
						icon: user.photo.urls.square_75
					};
					articleList.push(articleData);
				}				
			}
			e.articleList = articleList; 
			callback(e);
		});
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
	initCloudStampList:function(params, callback){
		Ti.API.debug('[func]initCloudStampList:');
		Cloud.Events.query({
			where: {
				user_id: params.userId
			},
			page : 1,
			per_page : 1000
		}, function (e) {
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.events.length; i++) {
					Cloud.Events.remove({event_id:e.events[i].id, user_id:params.userId}, function (e) {
						callback(e);
					});
				}
			}
		});
	},

	// 指定ユーザのスタンプリストから全データを取得
	getAllCloudStampList:function(params, callback){
		Ti.API.debug('[func]getAllCloudStampList:');
		// 6ヶ月前以降のデータを取得
		var now = new Date();		
		var startDate = new Date(now.getFullYear(), now.getMonth() + 1 - 6, now.getDate());

		Cloud.Events.query({
			where: {
				user_id: params.userId,
				'created_at': {
					'$gte': util.getCloudFormattedDateTime(startDate)
				}
			},
			order: '-updated_at',
			page : 1,
			per_page : 5000
		}, function (e) {
			var stampList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.events.length; i++) {
					var event = e.events[i];
					var date = util.getDate(event.start_time);
					var hour = date.getHours();
					if (event.duration == 0) {
						hour = -1;
					}

					for( var stamp in event.custom_fields ){
						var stampData = {
							event: event.id,
							user: event.user.id,
							stamp: stamp,
							textList: event.custom_fields[stamp],
							year: date.getFullYear(),
							month: date.getMonth() + 1,
							day: date.getDate(),
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

	// 指定ユーザのスタンプリストから指定月のデータを取得
	getCloudStampList:function(params, callback){
		Ti.API.debug('[func]getCloudStampList:');
		var startDate = null;
		var endDate = null;
		if (params.day == null) {
			startDate = new Date(params.year, params.month-1, 1);
			endDate = new Date(params.year, params.month, 1);
		} else {
			startDate = new Date(params.year, params.month-1, params.day);
			endDate = new Date(params.year, params.month-1, params.day+1);
		}

		Cloud.Events.query({
			where: {
				user_id: params.userId,
				start_time : {
					'$gte': util.getCloudFormattedDateTime(startDate),
					'$lt': util.getCloudFormattedDateTime(endDate)
				}
			},
			order: 'start_time, created_at',
			page : 1,
			per_page : 5000
		}, function (e) {
			var stampList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.events.length; i++) {
					var event = e.events[i];
					var date = util.getDate(event.start_time);
					var hour = date.getHours();
					if (event.duration == 0) {
						hour = -1;
					}

					for( var stamp in event.custom_fields ){
						var stampData = {
							event: event.id,
							user: event.user.id,
							stamp: stamp,
							textList: event.custom_fields[stamp],
							year: date.getFullYear(),
							month: date.getMonth() + 1,
							day: date.getDate(),
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

	// スタンプデータテーブルの作成
	createLocalStampList:function(){
		Ti.API.debug('[func]createLocalStampList:');
		sqlite.open(function(db){
			db.create("DiaryStampTB", 
				"CREATE TABLE IF NOT EXISTS DiaryStampTB (" + 
				"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
				"user VARCHAR, " +
				"event VARCHAR, " +
				"stamp VARCHAR, " +
				"text TEXT, " +
				"date TEXT, " + 
				"duration INTEGER, " + 
				"created_at TIMESTAMP DEFAULT (DATETIME('now','localtime')))"
			);
		});
	},

	// スタンプデータテーブルの削除
	dropLocalStampList:function(){
		Ti.API.debug('[func]dropLocalStampList:');
		sqlite.open(function(db){
			db.drop("DiaryStampTB");
		});
	},

	// スタンプデータの追加
	addLocalStampList:function(_stampDataList){
		Ti.API.debug('[func]addLocalStampList:');
		sqlite.open(function(db){
			for (var i=0; i<_stampDataList.length; i++) {
				var duration = 3600;
				if (_stampDataList[i].hour == -1) {
					duration = 0;
					_stampDataList[i].hour = 0;
				}
				var stampDate = new Date(
					_stampDataList[i].year, 
					_stampDataList[i].month-1, 
					_stampDataList[i].day, 
					_stampDataList[i].hour);

				if (_stampDataList[i].id) {
					db.update("DiaryStampTB").set({
						event:_stampDataList[i].event, 
						user:_stampDataList[i].user, 
						stamp:_stampDataList[i].stamp, 
						text:_stampDataList[i].textList[0], 
						date:util.getCloudFormattedDateTime(stampDate),
						duration:duration, 
					}).where("id","=",_stampDataList[i].id)
					.execute();
				} else {
					db.insert("DiaryStampTB").set({
						event:_stampDataList[i].event, 
						user:_stampDataList[i].user, 
						stamp:_stampDataList[i].stamp, 
						text:_stampDataList[i].textList[0], 
						date:util.getCloudFormattedDateTime(stampDate),
						duration:duration, 
					}).execute();
				}
			}
		});
	},

	// スタンプデータの取得
	getLocalStampList:function(params){
		Ti.API.debug('[func]getLocalStampList:');

		var startDate = null;
		var endDate = null;
		if (params.day == null) {
			startDate = new Date(params.year, params.month-1, 1);
			endDate = new Date(params.year, params.month, 1);
		} else {
			startDate = new Date(params.year, params.month-1, params.day);
			endDate = new Date(params.year, params.month-1, params.day+1);
		}

		var stampList = sqlite.open(function(db){
			var rows = db.select().from("DiaryStampTB")
				.where("user","=",params.userId)
				.and_where("date",">=",util.getCloudFormattedDateTime(startDate))
				.and_where("date","<",util.getCloudFormattedDateTime(endDate))
				.order_by("date asc, created_at asc")
				.execute().getResult();

			var result = [];
			while(rows.isValidRow()){
				var date = util.getDate(rows.fieldByName('date'));
				var hour = date.getHours();
				if (rows.fieldByName('duration') == 0) {
					hour = -1;
				}

				var stampData = {
					id: rows.fieldByName('id'),
					event: rows.fieldByName('event'),
					user: rows.fieldByName('user'),
					stamp: rows.fieldByName('stamp'),
					textList: [rows.fieldByName('text')],
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					day: date.getDate(),
					hour: hour
				};
				result.push(stampData);
				rows.next();
			}
			return result;
		});
		
		return stampList;
	},

	// スタンプデータテーブルの件数取得
	getCountLocalStampList:function(_user){
		Ti.API.debug('[func]getCountLocalStampList:');
		return sqlite.open(function(db){
			var rows = db.select("count(user)").from("DiaryStampTB")
				.where("user","=",_user)
				.execute().getResult();
			return rows.field(0);
		});
	},

	// スタンプデータの削除
	removeLocalStampList:function(_stampDataList){
		Ti.API.debug('[func]removeLocalStampList:');
		sqlite.open(function(db){
			for (var i=0; i<_stampDataList.length; i++) {				
				db.remove("DiaryStampTB")
					.where("id","=",_stampDataList[i].id)
					.execute();
			}
		});
	},


	// スタンプデータテーブルの作成
	createLocalStampHistoryList:function(){
		Ti.API.debug('[func]createLocalStampHistoryList:');
		sqlite.open(function(db){
			db.create("StampHistoryTB", 
				"CREATE TABLE IF NOT EXISTS StampHistoryTB (" + 
				"user VARCHAR, " + 
				"stamp VARCHAR, " + 
				"textList TEXT, " + 
				"created_at TIMESTAMP DEFAULT (DATETIME('now','localtime')), " + 
				"PRIMARY KEY (user, stamp))"
			);
		});
	},

	// スタンプデータテーブルの削除
	dropLocalStampHistoryList:function(){
		Ti.API.debug('[func]dropLocalStampHistoryList:');
		sqlite.open(function(db){
			db.drop("StampHistoryTB");
		});
	},

	// スタンプの履歴データを追加
	addLocalStampHistoryList:function(_stampDataList){
		Ti.API.debug('[func]addLocalStampHistoryList:');
		sqlite.open(function(db){
			for (var i=0; i<_stampDataList.length; i++) {				
				var textListString = JSON.stringify(_stampDataList[i].textList);
				db.replace("StampHistoryTB").set({
					user:_stampDataList[i].user, 
					stamp:_stampDataList[i].stamp, 
					textList:textListString
				}).execute();
			}
		});
	},

	// 指定スタンプの履歴データを取得
	getLocalStampHistoryList:function(params){
		Ti.API.debug('[func]getLocalStampHistoryList:');
		var historyList = sqlite.open(function(db){
			var rows = db.select().from("StampHistoryTB")
				.where("user","=",params.userId)
				.and_where("stamp","=",params.stamp)
				.execute().getResult();			
			var data = eval(rows.fieldByName("textList"));
			return data;
		});
		
		return historyList;
	},

	// スタンプデータテーブルの件数取得
	getCountLocalStampHistoryList:function(_user){
		Ti.API.debug('[func]getCountLocalStampHistoryList:');
		return sqlite.open(function(db){
			var rows = db.select("count(user)").from("StampHistoryTB")
				.where("user","=",_user)
				.execute().getResult();
			return rows.field(0);
		});
	},



	// スタンプデータの追加
	addCloudStampList:function(_stampDataList, callback){
		Ti.API.debug('[func]addCloudStampList:');

		var duration = 3600;
		if (_stampDataList[0].hour == -1) {
			duration = 0;
			_stampDataList[0].hour = 0;
		}
		var stampDate = new Date(
			_stampDataList[0].year, 
			_stampDataList[0].month-1, 
			_stampDataList[0].day, 
			_stampDataList[0].hour);

		var custom_fields = {};
		for (var i=0; i<_stampDataList.length; i++) {
			custom_fields[_stampDataList[i].stamp] = _stampDataList[i].textList;
		}
		
		if(_stampDataList[0].event == null) {
			Cloud.Events.create({
				name: 'diary',
				start_time: util.getCloudFormattedDateTime(stampDate),
				duration: duration,
				custom_fields: custom_fields
			}, function (e) {
				_stampDataList[0].event = e.events[0].id;
				e.stampDataList = _stampDataList;
				callback(e);
			});
		} else {
			Cloud.Events.update({
				event_id: _stampDataList[0].event,
				name: 'diary',
				start_time: util.getCloudFormattedDateTime(stampDate),
				duration: duration,
				custom_fields: custom_fields
			}, function (e) {
				callback(e);
			});
		}
	},
	// スタンプデータの削除
	removeCloudStampList:function(_stampDataList, callback){
		Ti.API.debug('[func]removeCloudStampList:');
/*
		Cloud.Events.remove({
			event_id: _stampDataList[0].event,
		}, function (e) {
			callback(e);
		});
*/
		// １イベントに対して複数スタンプが登録されているので削除はせずにcustom_fieldsにnullをセットして削除
		var custom_fields = {};
		custom_fields[_stampDataList[0].stamp] = null;

		Cloud.Events.update({
			event_id: _stampDataList[0].event,
			custom_fields: custom_fields
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


/*
	// 指定スタンプの履歴データを取得
	getCloudStampHistoryList:function(params, callback){
		Ti.API.debug('[func]getCloudStampHistoryList:');
		var where_items = {};
		where_items['user_id'] = params.userId;
//		where_items[params.stamp] = {'$exists': true};
		where_items[params.stamp] = {'$ne': ''};

		Cloud.Events.query({
			where: where_items,
			order: '-created_at',
			page : 1,
			per_page : 1
		}, function (e) {
			var stampHistory = {
				stamp: params.stamp,
				historyList: []
			};
			if (e.success) {
				Ti.API.debug('success:');
				if (e.events.length > 0) {
					var event = e.events[0];
					stampHistory.historyList = event.custom_fields[params.stamp];
				}
			}
			e.stampHistory = stampHistory;
			callback(e);
		});
	},
*/
/*
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
*/
	// ライクデータテーブルの作成
	createLocalLikeList:function(){
		Ti.API.debug('[func]createLocalLikeList:');
		sqlite.open(function(db){
			// Cloudでは、review_idがプライマリーキーになっているが、Localではarticle_idをプライマリーキーに設定して、取得・削除をおこなう
			db.create("LikeArticleTB", 
				"CREATE TABLE IF NOT EXISTS LikeArticleTB (" + 
				"user VARCHAR, " + 
				"article VARCHAR, " + 
				"review VARCHAR, " + 
				"created_at TIMESTAMP DEFAULT (DATETIME('now','localtime')), " + 
				"PRIMARY KEY (user, article))"
			);
		});
	},

	// ライクデータテーブルの削除
	dropLocalLikeList:function(){
		Ti.API.debug('[func]dropLocalLikeList:');
		sqlite.open(function(db){
			db.drop("LikeArticleTB");
		});
	},

	// ライクデータテーブルの件数取得
	getCountLocalLikeList:function(_user){
		Ti.API.debug('[func]getCountLocalLikeList:');
		return sqlite.open(function(db){
			var rows = db.select("count(user)").from("LikeArticleTB")
				.where("user","=",_user)
				.execute().getResult();
			return rows.field(0);
		});
	},

	// 指定ユーザのライクデータから全データを取得
	getAllCloudLikeList:function(params, callback){
		Ti.API.debug('[func]getAllCloudLikeList:');
		// 6ヶ月前以降のデータを取得
		var now = new Date();		
		var startDate = new Date(now.getFullYear(), now.getMonth() + 1 - 6, now.getDate());

		Cloud.Reviews.query({
			where: {
				user_id: params.userId,
				rating: 1,
				'created_at': {
					'$gte': util.getCloudFormattedDateTime(startDate)
				}
			},
			order: '-updated_at',
			page : 1,
			per_page : 5000
		}, function (e) {
			var likeList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.reviews.length; i++) {
					var likeData = {
						user: params.userId,
						article: e.reviews[i].reviewed_object.id,
						review: e.reviews[i].id,
					};
					likeList.push(likeData);
				}
			}
			e.likeList = likeList;
			callback(e);
		});
	},

	// ライクデータを追加
	addLocalLikeList:function(_likeList){
		Ti.API.debug('[func]addLocalLikeList:');
		sqlite.open(function(db){
			for (var i=0; i<_likeList.length; i++) {
				db.replace("LikeArticleTB").set({
					user:_likeList[i].user, 
					article:_likeList[i].article, 
					review:_likeList[i].review
				}).execute();
			}
		});
	},
	// ライクデータを削除
	removeLocalLikeList:function(params){
		Ti.API.debug('[func]removeLocalLikeList:');
		sqlite.open(function(db){
			db.remove("LikeArticleTB").where("user","=",params.userId)
				.and_where("article","=",params.article)
				.execute();
		});
	},

	// 指定記事のライクデータを取得
	getLocalLikeReviewId:function(params){
		Ti.API.debug('[func]getLocalLikeList:');
		var likeReviewId = sqlite.open(function(db){
			var rows = db.select().from("LikeArticleTB")
				.where("user","=",params.userId)
				.and_where("article","=",params.article)
				.execute().getResult();
			var data = rows.fieldByName("review");
			return data;
		});
		
		return likeReviewId;
	},

	// ライクリストに追加
	addCloudLikeList:function(params, callback){
		Ti.API.debug('[func]addCloudLikeList:');
		Cloud.Reviews.create({
			post_id: params.postId,
    		rating: 1,
    		allow_duplicate: true
		}, function (e) {
			callback(e);
		});
	},
	// ライクリストから削除
	removeCloudLikeList:function(params, callback){
		Ti.API.debug('[func]removeCloudLikeList:');
		Cloud.Reviews.remove({
			post_id: params.postId,
			review_id: params.reviewId
		}, function (e) {
			callback(e);
		});
	},
	// ライクリストの取得
	getCloudLikeList:function(params, callback){
		Ti.API.debug('[func]getCloudLikeList:');
		Cloud.Reviews.query({
			post_id: params.postId,
			where: {
				user_id: params.userId,
				rating: 1
			},
			page : 1,
			per_page : 1
		}, function (e) {
			callback(e);
		});
	},

	// コメントリストに追加
	addCloudCommentList:function(params, callback){
		Ti.API.debug('[func]addCloudCommentList:');
		var commentDate = util.getDate(params.date);
		Cloud.Reviews.create({
			post_id: params.postId,
    		content: params.comment,
    		allow_duplicate: true,
			custom_fields: {
				postDate: util.getCloudFormattedDateTime(commentDate)
			}
		}, function (e) {
			callback(e);
		});
	},
	// コメントリストの取得
	getCloudCommentList:function(params, callback){
		Ti.API.debug('[func]getCloudCommentList:');
		Cloud.Reviews.query({
			user_id: params.userId,
			post_id: params.postId,
			where: {content: {'$exists': true}},
			order: 'created_at',
			page : 1,
			per_page : 10
		}, function (e) {
			callback(e);
		});
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

	// ユーザデータの取得
	getCloudUser:function(_id, callback){
		Ti.API.debug('[func]getCloudUser:');

		Cloud.Users.show({
			user_id: _id
		}, function (e) {
			var userList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.users.length; i++) {
					var user = e.users[i];
					var userData = {
						id: user.id,
						user: user.first_name + ' ' + user.last_name,
						photo: 0,
						like: 0,
						follow: 0,
						follower: 0, 
						name: '',
						breed: '',
						sex: '',
						birth: '', 
						memo: '',
						post: null,
						like: null,
						icon: null,
					};
					if (user.custom_fields) {
						if (user.custom_fields.name != null)  { userData.name = user.custom_fields.name; }
						if (user.custom_fields.breed != null) { userData.breed = user.custom_fields.breed; }
						if (user.custom_fields.sex != null)   { userData.sex = user.custom_fields.sex; }
						if (user.custom_fields.birth != null) { userData.birth = user.custom_fields.birth; }
						if (user.custom_fields.memo != null)  { userData.memo = user.custom_fields.memo; }
						if (user.custom_fields.post != null)  { userData.post = user.custom_fields.post; }
						if (user.custom_fields.like != null)  { userData.like = user.custom_fields.like; }
					}
					if (user.photo) {
						userData.icon = user.photo.urls.square_75;
					}
					userList.push(userData);
				}				
			}
			e.userList = userList; 
			callback(e);
		});
	},
	
	// ユーザデータの更新
	updateCloudUser:function(params, callback){
		Ti.API.debug('[func]updateCloudUser:');
		Cloud.Users.update({
			custom_fields: {
				name: params.name,
				breed: params.breed,
				sex: params.sex,
				birth: params.birth,
				memo: params.memo
			}
		}, function (e) {
			callback(e);
		});
		
	},
	// コレクションの更新
	updateCloudUserCollection:function(params, callback){
		Ti.API.debug('[func]updateCloudUserCollection:');
		Cloud.Users.update({
			custom_fields: {
				post: params.post,
				like: params.like
			}
		}, function (e) {
			callback(e);
		});
		
	},
	// アイコンの更新
	updateCloudUserIcon:function(params, callback){
		Ti.API.debug('[func]updateCloudUserIcon:');
		Cloud.Users.update({
			username: params.user,
			photo: params.icon,
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

	// フォローリストの登録
	setFollowList:function(_followList){
		Ti.API.debug('[func]setFollowList:');
		followList = _followList;
	},

	// フォローリストの取得
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
	// フォロワーリストの取得
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

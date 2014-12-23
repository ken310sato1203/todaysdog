//モデル

var loginUser = null;

var breedList = [];
var sexList = [];
var stampTopList = [];
var stampSelectList = [];
var stampHistoryList = [];

// ---------------------------------------------------------------------

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

photoTodayList = [
	{photo:"A0001"},
	{photo:"A0002"},
	{photo:"A0003"},
	{photo:"A0004"},
	{photo:"A0005"},
	{photo:"A0006"},
];

stampSelectList = [
//	{type:"one", title:"お天気", stampList:["stamp_sun","stamp_cloud","stamp_rain"]},
	{type:"one", title:"さんぽ", stampList:["stamp_walking1","stamp_walking2","stamp_walking3"]},
	{type:"one", title:"うんち", stampList:["stamp_favorite1","stamp_favorite2","stamp_favorite3"]},
	{type:"one", title:"ごはん", stampList:["stamp_restaurant1","stamp_restaurant2","stamp_restaurant3"]},
//	{type:"one", title:"体調", stampList:["stamp_barking1","stamp_barking2","stamp_barking3"]},
	{type:"all", title:"くすり\n病院", stampList:["stamp_medicine","stamp_injection","stamp_clinic"]},
	{type:"all", title:"シャンプ\nホテル", stampList:["stamp_wash","stamp_cut","stamp_cottage"]},
	{type:"all", title:"おでかけ\nイベント", stampList:["stamp_car","stamp_flag","stamp_birthday"]},
];

stampHistoryList = [
//	{stamp:"stamp_sun",textList:["本日は晴れなり","いいお天気"]},
//	{stamp:"stamp_cloud",textList:["本日は曇りなり","過ごしやすい天気"]},
//	{stamp:"stamp_rain",textList:["本日は雨なり","雨で散歩いけないね"]},
//	{stamp:"stamp_barking1",textList:["テンション高！","元気です！"]},
//	{stamp:"stamp_barking2",textList:["いつもどおり","まぁまぁかな"]},
//	{stamp:"stamp_barking3",textList:["おつかれ","元気ないね"]},
	{stamp:"stamp_walking1",textList:["めっちゃ元気だね！"]},
	{stamp:"stamp_walking2",textList:["ゆっくり散歩"]},
	{stamp:"stamp_walking3",textList:["ちょっと元気ないね"]},
	{stamp:"stamp_favorite1",textList:["いい固さ！"]},
	{stamp:"stamp_favorite2",textList:["ちょいやわからめ"]},
	{stamp:"stamp_favorite3",textList:["お腹こわしてるね"]},
	{stamp:"stamp_restaurant1",textList:["ガツガツ完食！"]},
	{stamp:"stamp_restaurant2",textList:["ちょっと残しました"]},
	{stamp:"stamp_restaurant3",textList:["食欲ないね"]},
	{stamp:"stamp_medicine",textList:["お薬のみました"]},
	{stamp:"stamp_injection",textList:["注射しました"]},
	{stamp:"stamp_clinic",textList:["病院に行きました"]},
	{stamp:"stamp_wash",textList:["シャンプーしました"]},
	{stamp:"stamp_cut",textList:["カットしました"]},
	{stamp:"stamp_cottage",textList:["お泊まりしました"]},
	{stamp:"stamp_car",textList:["おでかけしました"]},
	{stamp:"stamp_flag",textList:["イベントに行きました"]},
	{stamp:"stamp_birthday",textList:["記念日お祝いしました"]},
];

// ---------------------------------------------------------------------
exports.model = {

	// ログイン
	loginCloudUser:function(_type, _token, callback){
		Ti.API.debug('[func]loginCloudUser:');
		var accessToken = {
			type: _type, 
			token: _token
		};

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
					userData.icon = user.photo.urls.small_240;
				}
				e.userData = userData;
				callback(e);

			} else {
				e.accessToken = accessToken;
				callback(e);
			}
		});
	},

	// ローカルに画像を保存
	saveLocalImage:function(_imageBlob, _dirPath, _fileName){
		Ti.API.debug('[func]saveLocalImage:');
		var imageDir  = Ti.Filesystem.getFile(_dirPath);
		if (! imageDir.exists()) {
			imageDir.createDirectory();
		}
		var imageFile  = Ti.Filesystem.getFile(imageDir.nativePath + _fileName + '.png');
		imageFile.write(_imageBlob);
	},

	// ローカルの画像を削除
	deleteLocalImage:function(_dirPath, _fileName){
		Ti.API.debug('[func]deleteLocalImage:');
		var imageDir  = Ti.Filesystem.getFile(_dirPath);
		var imageFile  = Ti.Filesystem.getFile(imageDir.nativePath + _fileName + '.png');
		if (imageFile.exists()) {
			imageFile.deleteFile();
		}
	},

	// ローカルに画像が保存されていることをチェック
	checkLocalImage:function(_dirPath, _fileName){
		Ti.API.debug('[func]checkLocalImage:');
		var imageDir  = Ti.Filesystem.getFile(_dirPath);
		var imageFile  = Ti.Filesystem.getFile(imageDir.nativePath + _fileName + '.png');
		if (imageFile.exists()) {
			return true;
		} else {
			return false;
		}
	},

	// クラウドの画像をロード
	readCloudImage:function(_imagePath, callback){
		Ti.API.debug('[func]readCloudImage:');

		var xhr = Titanium.Network.createHTTPClient();
		xhr.open('GET',_imagePath);
		xhr.onload = function(e){
			e.image = this.responseData;
			callback(e);
		};
		xhr.send();
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
	addCloudArticle:function(params, callback){
		Ti.API.debug('[func]addCloudArticle:');		
		var articleData = params.articleData;
		var articleDate = util.getDate(articleData.date);

		Cloud.Photos.create({
			photo: params.photo,
			collection_name: 'post'
		}, function (e) {
			if (e.success) {
				Ti.API.debug('success:');
				Cloud.Posts.create({
					content: articleData.text,
					photo_id: e.photos[0].id,
					custom_fields: {
						postDate: util.getCloudFormattedDateTime(articleDate)
					}
				}, function (e2) {
					if (e2.success) {
						// Cloudで付与されたidをセット
						articleData.id = e2.posts[0].id;
						// Cloudからすぐには取得できないので、あとからwinToday表示の時にセット
//						articleData.photo = e2.posts[0].photo.urls.original;
						articleData.photo = '';
						e2.articleData = articleData;
					}
					callback(e2);
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
						userData.icon = user.photo.urls.getCloudUser
						;
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
		// 文字列含む検索はできないため、先頭から検索
		Cloud.Users.query({
			where:{ '$or': [
				{ username: {'$regex': '^' + params.name} }, 
				{ first_name: {'$regex': '^' + params.name} }, 
				{ last_name: {'$regex': '^' + params.name} },
				{ 'name': {'$regex': '^' + params.name} } 
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
						userData.icon = user.photo.urls.small_240;
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

/*
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
*/

	// 記事の取得
	getCloudArticlePost:function(params, callback){
		Ti.API.debug('[func]getCloudArticlePost:');

		Cloud.Posts.show({
			post_id: params.postId
		}, function (e) {
			var articleList = [];
			if (e.success) {
				Ti.API.debug('success:');
				if (e.posts[0]) {
					var post = e.posts[0];
					var user = post.user;
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
						date: util.getFormattedDateTime(post.custom_fields.postDate),
						created_at: util.getFormattedDateTime(post.created_at),
						photo: post.photo.urls.original,
						like: likeCount,
						comment: commentCount,
						icon: user.photo.urls.square_75
					};
					articleList.push(articleData);	

					if (e.posts[0].photo.urls) {
						e.photo = e.posts[0].photo.urls.original;					
					}
				}
			}
			e.articleList = articleList; 
			callback(e);
		});
	},

	// 記事の取得
	getCloudTodayArticle:function(params, callback){
		Ti.API.debug('[func]getCloudTodayArticle:');
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
					// バッジ更新で、RESTAPIではcustom_fieldsが取得できなかったのでcreated_atを使用
					var articleData = {
						id: post.id,
						userId: user.id,
						user: user.first_name + ' ' + user.last_name,
						name: name,
						text: post.content,
						date: util.getFormattedDateTime(post.custom_fields.postDate),
						created_at: util.getFormattedDateTime(post.created_at),
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

	// 最新記事件数の更新
	updateCloudNewArticleCount:function(callback){
		Ti.API.debug('[func]updateCloudNewArticleCount:');
		var userId = Ti.App.Properties.getString('userId');
//		var articleId = Ti.App.Properties.getString(userId + '_' + 'lastArticleId');
		var articleDate = Ti.App.Properties.getString(userId + '_' + 'lastArticleDate');
		var idList = model.getLocalFriendsList(userId);

		if (idList.length > 0) {
			// ACSの「App Management」で確認
			// 開発用：wnadlSr51PBVdxx6HOAgnjbkLpAY4QuQ
			// 本番用：5NWjAalB43p8FqOj0Ue6aQYk5HXVncIZ
			var acs_app_key = 'wnadlSr51PBVdxx6HOAgnjbkLpAY4QuQ';
			// バッジ更新で、RESTAPIではcustom_fieldsが取得できなかったのでcreated_atを使用
			var where_value = {
				user_id: { '$in': idList },
				id: { '$nin': [articleId] },
//				'postDate': {
//					'$gte': util.getCloudFormattedDateTime(articleDate)
//				}
				created_at: { '$gte': util.getCloudFormattedDateTime(articleDate) }
			};
			var url = 'https://api.cloud.appcelerator.com/v1/posts/query.json?';
			url += 'key=' + acs_app_key;
			url += '&where=' + JSON.stringify(where_value);
			url += '&order=created_at';

			var httpClient = Ti.Network.createHTTPClient({
				onload: function(e) {
					Ti.API.info("Received text: " + this.responseText);
					e.responseMeta = JSON.parse(this.responseData).meta;
					e.articleCount = e.responseMeta.total_results;
					callback(e);
				},
				onerror: function(e) {
					Ti.API.info("Receive Error: " + e.error);
					callback(e);
				}
			});
			httpClient.open('GET', url);
			httpClient.send();

/*
			Cloud.Posts.query({
				where: {
					user_id: { '$in': idList },
					id: { '$nin': [articleId] },
					'postDate': {
						'$gte': util.getCloudFormattedDateTime(articleDate)
					}
				},
				order: '-created_at'
			}, function (e) {
				if (e.success) {
					if (e.posts.length == 0) {
						e.badgeCount = null;
					} else {
						e.badgeCount = e.posts.length;						
					}
				}
				callback(e);
			});
*/

		} else {
			e.articleCount = 0;
		}
	},

	// ログインユーザの登録
	setLoginUser:function(_user){
		Ti.API.debug('[func]setLoginUser:');
		loginUser = _user;
	},
	// ログインユーザの取得
	getLoginUser:function(){
		Ti.API.debug('[func]getLoginUser:');
		return loginUser;
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
						date: util.getFormattedDateTime(post.custom_fields.postDate),
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

	// 記事データテーブルの作成
	createLocalArticleList:function(){
		Ti.API.debug('[func]createLocalArticleList:');
		sqlite.open(function(db){
			db.create("DogArticleTB", 
				"CREATE TABLE IF NOT EXISTS DogArticleTB (" + 
				"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
				"user VARCHAR, " + 
				"post VARCHAR, " + 
				"photo VARCHAR, " + 
				"text TEXT, " +
				"date TEXT, " + 
				"created_at TIMESTAMP DEFAULT (DATETIME('now','localtime')))"
			);
		});
	},

	// 記事データテーブルの削除
	dropLocalArticleList:function(){
		Ti.API.debug('[func]dropLocalArticleList:');
		sqlite.open(function(db){
			if(db.isExist("DogArticleTB")){
				db.drop("DogArticleTB");
			}
		});
	},

	// 記事データの追加
	addLocalArticleList:function(_articleData){
		Ti.API.debug('[func]addLocalArticleList:');
		for (var i = 0; i < _articleData.length; i++) {
			var articleDate = util.getDate(_articleData[i].date);
			sqlite.open(function(db){
				db.insert("DogArticleTB").set({
					user:_articleData[i].userId, 
					post:_articleData[i].id,
					photo:_articleData[i].photo, 
					text:_articleData[i].text, 
					date:util.getCloudFormattedDateTime(articleDate)
				}).execute();
			});
		}
	},

	// 記事データの写真URL追加
	updateLocalArticlePhoto:function(params){
		Ti.API.debug('[func]updateLocalArticlePhoto:');
		sqlite.open(function(db){
			db.update("DogArticleTB").set({
				photo:params.photo
			})
			.where("post","=",params.postId)
			.execute();
		});
	},

	// 記事データの取得
	getCloudAllArticleList:function(params, callback){
		Ti.API.debug('[func]getCloudAllArticleList:');
		// 6ヶ月前以降のデータを取得
		var now = util.getDateElement(new Date());
		var startDate = new Date(now.year, now.month - 6, now.day);

		Cloud.Posts.query({
			where: {
				user_id: params.userId,
				'postDate': {
					'$gte': util.getCloudFormattedDateTime(startDate)
				}
			},
			order: 'created_at',
			page : 1,
			per_page : 5000
		}, function (e) {
			var articleList = [];
			if (e.success) {
				Ti.API.debug('success:');
				for (var i = 0; i < e.posts.length; i++) {
					var post = e.posts[i];
					var user = post.user;
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
						date: util.getFormattedDateTime(post.custom_fields.postDate),
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

	// ローカルから記事の取得
	getLocalArticle:function(params){
		Ti.API.debug('[func]getLocalArticle:');
		var startDate = null;
		var endDate = null;
		if (params.day == null) {
			startDate = new Date(params.year, params.month-1, 1);
			endDate = new Date(params.year, params.month, 1);
		} else {
			startDate = new Date(params.year, params.month-1, params.day);
			endDate = new Date(params.year, params.month-1, params.day+1);
		}

		var articleList = sqlite.open(function(db){
			var rows = db.select().from("DogArticleTB")
				.where("user","=",params.userId)
				.and_where("date",">=",util.getFormattedDate(startDate))
				.and_where("date","<",util.getFormattedDate(endDate))
				.order_by("created_at asc")
				.execute().getResult();
			var result = [];
			while (rows.isValidRow()){
				result.push({
					user: params.user,
					name: params.name,
					icon: params.icon,
					id: rows.fieldByName('post'),
					userId: rows.fieldByName('user'),
//					post: rows.fieldByName('post'),
					text: rows.fieldByName('text'),
					photo: rows.fieldByName('photo'),
					date: util.getFormattedDateTime(rows.fieldByName('date'))
				});
				rows.next();
			}
			return result;
		});		
		return articleList;
	},
	
	// 記事データテーブルの件数取得
	getLocalArticleListCount:function(_user){
		Ti.API.debug('[func]getLocalArticleListCount:');
		return sqlite.open(function(db){
			var rows = db.select("count(user)").from("DogArticleTB")
				.where("user","=",_user)
				.execute().getResult();
			return rows.field(0);
		});
	},

	// ローカルから記事の取得
	getLocalTodayArticle:function(params){
		Ti.API.debug('[func]getLocalTodayArticle:');
		var startDate = new Date(params.year, params.month-1, params.day);
		var articleList = sqlite.open(function(db){
			var rows = db.select().from("DogArticleTB")
				.where("user","=",params.userId)
				.and_where("date",">=",util.getFormattedDate(startDate))
				.order_by("created_at asc")
				.execute().getResult();
			var result = [];
			while (rows.isValidRow()){
				result.push({
					user: params.user,
					name: params.name,
					icon: params.icon,
					id: rows.fieldByName('post'),
					userId: rows.fieldByName('user'),
//					post: rows.fieldByName('post'),
					text: rows.fieldByName('text'),
					photo: rows.fieldByName('photo'),
					date: util.getFormattedDateTime(rows.fieldByName('date'))
				});
				rows.next();
			}
			return result;
		});		
		return articleList;
	},

	// ローカルからランダムに記事の取得
	getLocalRandomArticle:function(params){
		Ti.API.debug('[func]getLocalRandomArticle:');
		var articleList = sqlite.open(function(db){
			var rows = db.select().from("DogArticleTB")
				.where("user","=",params.userId)
				.order_by("date desc")
				.limit(params.limit)
				.offset(params.offset)
				.execute().getResult();
			var result = [];
			while (rows.isValidRow()){
				result.push({
					user: params.user,
					name: params.name,
					icon: params.icon,
					id: rows.fieldByName('post'),
					userId: rows.fieldByName('user'),
//					post: rows.fieldByName('post'),
					text: rows.fieldByName('text'),
					photo: rows.fieldByName('photo'),
					date: util.getFormattedDateTime(rows.fieldByName('date'))
				});
				rows.next();
			}
			return result;
		});		
		return articleList;
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
	getCloudAllStampList:function(params, callback){
		Ti.API.debug('[func]getCloudAllStampList:');
		// 6ヶ月前以降のデータを取得
		var now = util.getDateElement(new Date());
		var startDate = new Date(now.year, now.month-1 - 6, now.day);

		Cloud.Events.query({
			where: {
				user_id: params.userId,
				'created_at': {
					'$gte': util.getCloudFormattedDateTime(startDate)
				}
			},
			order: 'created_at',
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
			if(db.isExist("DiaryStampTB")){
				db.drop("DiaryStampTB");
			}
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
//						user:_stampDataList[i].user, 
//						event:_stampDataList[i].event, 
						stamp:_stampDataList[i].stamp, 
						text:_stampDataList[i].textList[0], 
						date:util.getCloudFormattedDateTime(stampDate),
						duration:duration, 
					}).where("id","=",_stampDataList[i].id)
					.execute();
				} else {
					db.insert("DiaryStampTB").set({
						user:_stampDataList[i].user, 
						event:_stampDataList[i].event, 
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
				.order_by("date asc, duration asc, created_at asc")
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
	getLocalStampListCount:function(_user){
		Ti.API.debug('[func]getLocalStampListCount:');
		return sqlite.open(function(db){
			var rows = db.select("count(user)").from("DiaryStampTB")
				.where("user","=",_user)
				.execute().getResult();
			return rows.field(0);
		});
	},

	// スタンプデータの削除
	removeLocalStampList:function(_stampData){
		Ti.API.debug('[func]removeLocalStampList:');
		sqlite.open(function(db){
			db.remove("DiaryStampTB")
				.where("id","=",_stampData.id)
				.execute();
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
			if(db.isExist("StampHistoryTB")){
				db.drop("StampHistoryTB");
			}
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
			return eval(rows.fieldByName("textList"));
		});
		
		return historyList;
	},

	// スタンプデータテーブルの件数取得
	getLocalStampHistoryListCount:function(_user){
		Ti.API.debug('[func]getLocalStampHistoryListCount:');
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

		var stampDate = null;
		var duration = 3600;
		if (_stampDataList[0].hour == -1) {
			duration = 0;
			stampDate = new Date(
				_stampDataList[0].year, 
				_stampDataList[0].month-1, 
				_stampDataList[0].day, 
				0);
		} else {
			stampDate = new Date(
				_stampDataList[0].year, 
				_stampDataList[0].month-1, 
				_stampDataList[0].day, 
				_stampDataList[0].hour);
		}

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
				// Cloudで付与されたidをセット
				for (var i=0; i<_stampDataList.length; i++) {
					_stampDataList[i].event = e.events[0].id;
				}
//				e.stampDataList = _stampDataList;
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
				e.stampDataList = _stampDataList;
				callback(e);
			});
		}
	},
	// スタンプデータの削除
	removeCloudStampList:function(_stampData, callback){
		Ti.API.debug('[func]removeCloudStampList:');
		// １イベントに対して複数スタンプが登録されているので削除はせずにcustom_fieldsにnullをセットして削除
		var custom_fields = {};
		custom_fields[_stampData.stamp] = null;

		Cloud.Events.update({
			event_id: _stampData.event,
			custom_fields: custom_fields
		}, function (e) {
			callback(e);
		});
	},

	// 今日の写真のリストを取得
	getPhotoTodayList:function(){
		Ti.API.debug('[func]getPhotoTodayList:');
		return photoTodayList;
	},

	// timeWinのスタンプのリストを取得
	getTimeStampList:function(){
		Ti.API.debug('[func]getTimeStampList:');
		return stampHistoryList;
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
			if(db.isExist("LikeArticleTB")){
				db.drop("LikeArticleTB");
			}
		});
	},

	// ライクデータテーブルの件数取得
	getLocalLikeListCount:function(_user){
		Ti.API.debug('[func]getLocalLikeListCount:');
		return sqlite.open(function(db){
			var rows = db.select("count(user)").from("LikeArticleTB")
				.where("user","=",_user)
				.execute().getResult();
			return rows.field(0);
		});
	},

	// 指定ユーザの全ライクデータを取得
	getCloudAllLikeList:function(params, callback){
		Ti.API.debug('[func]getCloudAllLikeList:');
		// 6ヶ月前以降のデータを取得
		var now = util.getDateElement(new Date());
		var startDate = new Date(now.year, now.month - 6, now.day);

		Cloud.Reviews.query({
			where: {
				user_id: params.userId,
				rating: 1,
				'created_at': {
					'$gte': util.getCloudFormattedDateTime(startDate)
				}
			},
			order: '-created_at',
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
			return rows.fieldByName("review");
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
				postDate: util.getCloudFormattedDateTime(commentDate),
				ownerId: params.ownerId,
				reviewedPhoto: params.reviewedPhoto
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
	// 指定ユーザの全コメントデータを取得
	getCloudAllCommentList:function(params, callback){
		Ti.API.debug('[func]getCloudAllCommentList:');
		var startDate = new Date(params.year, params.month-1, params.day);

		Cloud.Reviews.query({
			where: {
				user_id: {'$nin': [params.userId]},
				content: {'$exists': true},
				'ownerId': params.userId,
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
				for (var i = 0; i < e.reviews.length; i++) {
					var review = e.reviews[i];
					var user = review.user;
					var name = '';
					if (user.custom_fields && user.custom_fields.name) {
						name = user.custom_fields.name;
					}
					var articleData = {
						id: review.id,
						userId: user.id,
						user: user.first_name + ' ' + user.last_name,
						name: name,
						text: review.content,
						date: util.getFormattedDateTime(review.custom_fields.postDate),
						icon: user.photo.urls.square_75,
						reviewedId: review.reviewed_object.id,
						reviewedPhoto: review.custom_fields.reviewedPhoto
					};
					articleList.push(articleData);
				}				
			}
			e.articleList = articleList; 
			callback(e);
		});
	},
	// 指定日以降の全コメントデータの件数を取得
	getCloudAllCommentListCount:function(params, callback){
		Ti.API.debug('[func]getCloudAllCommentListCount:');

		Cloud.Reviews.query({
			where: {
				user_id: {'$nin': [params.userId]},
				content: {'$exists': true},
				'ownerId': params.userId,
				'postDate': {
					'$gt': util.getCloudFormattedDateTime(params.date)
				}
			},
			order: '-created_at'

		}, function (e) {
			callback(e);
		});
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
						userData.icon = user.photo.urls.small_240;
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

	// 友人データテーブルの作成
	createLocalFriendsList:function(){
		Ti.API.debug('[func]createLocalFriendsList:');
		sqlite.open(function(db){
			db.create("DogFriendsTB", 
				"CREATE TABLE IF NOT EXISTS DogFriendsTB (" + 
				"user VARCHAR, " + 
				"friend VARCHAR, " + 
				"created_at TIMESTAMP DEFAULT (DATETIME('now','localtime')), " + 
				"PRIMARY KEY (user, friend))"
			);
		});
	},

	// 友人データテーブルの削除
	dropLocalFriendsList:function(){
		Ti.API.debug('[func]dropLocalFriendsList:');
		sqlite.open(function(db){
			if(db.isExist("DogFriendsTB")){
				db.drop("DogFriendsTB");
			}
		});
	},

	// 友人データを追加
	addLocalFriendsList:function(_user, _friendList){
		Ti.API.debug('[func]addLocalFriendsList:');
		for (var i=0; i<_friendList.length; i++) {
			sqlite.open(function(db){
				db.replace("DogFriendsTB").set({
					user:_user, 
					friend:_friendList[i].id
				}).execute();
			});
		}
	},

	// 友人の取得
	getLocalFriendsList:function(_user){
		Ti.API.debug('[func]getLocalFriendsList:');
		var friendsList = sqlite.open(function(db){
			var rows = db.select().from("DogFriendsTB")
				.where("user","=",_user)
				.execute().getResult();			
			var result = [];
			while (rows.isValidRow()){
				result.push(rows.fieldByName("friend"));
				rows.next();
			}
			return result;
		});		
		return friendsList;
	},

	// 友人データテーブルの件数取得
	getLocalFriendsListCount:function(_user){
		Ti.API.debug('[func]getLocalFriendsListCount:');
		return sqlite.open(function(db){
			var rows = db.select("count(user)").from("DogFriendsTB")
				.where("user","=",_user)
				.execute().getResult();
			return rows.field(0);
		});
	},

	// 友人かどうかのチェック
	checkLocalFriendsList:function(_user, _friend){
		Ti.API.debug('[func]getLocalFriendsList:');
		var existFlag = sqlite.open(function(db){
			var rows = db.select().from("DogFriendsTB")
				.where("user","=",_user)
				.and_where("friend","=",_friend)
				.execute().getResult();	
			return (rows.rowCount > 0);
		});
		return existFlag;
	},

	// 友人データの削除
	removeLocalFriendsList:function(_user, _friend){
		Ti.API.debug('[func]removeLocalFriendsList:');
		sqlite.open(function(db){
			db.remove("DogFriendsTB")
				.where("user","=",_user)
				.and_where("friend","=",_friend)
				.execute();
		});
	},	
};

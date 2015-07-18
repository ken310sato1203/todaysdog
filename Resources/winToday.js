// トップ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winToday.createWindow:');

	// 日時の更新
	var now = null;
	// 多重クリック防止
	var clickEnable = true;
	// スタンプメニューに表示位置
	var stampMenuPage = 0;
	// フォト一覧のリスト
	var photoFrameList = [];
	// フォト一覧の最大表示数
	var photoFrameMax = 10;
	// フォト一覧の初回表示位置
	var photoFrameStartPage = 0;
	// フォト一覧の表示位置
	var photoFramePage = 0;
	// 記事の取得件数
	var articleCount = 3;
	// 続きを読むフラグ
	var nextArticleFlag = false;

// ---------------------------------------------------------------------

	// 日時チェック
	var checkNewDay = function() {
		Ti.API.debug('[func]checkNewDay:');
		var nowDate = new Date();
		if (nowDate.getFullYear() != now.year || nowDate.getMonth() != now.month-1 || nowDate.getDate() != now.day) {
			return true;
		} else {
			return false;
		}
	};

	// 今日の記事を取得
	var getTodayArticle = function() {
		Ti.API.debug('[func]getTodayArticle:');
		// 今日の記事データ取得
		var articleList = model.getLocalTodayArticle({
			userId:_userData.id, 
			user:_userData.user, 
			name:_userData.name, 
			icon:_userData.icon, 
			year: now.year,
			month: now.month,
			day: now.day
		});
		if (articleList.length > 0) {
			return articleList[0];
		} else {
			return null;			
		}
	};

	// スタンプメニューの取得
	var getStampMenuRowList = function() {
		Ti.API.debug('[func]getStampMenuRowList:');
		var rowList = [];

		// スタンプの取得
		var stampList = model.getLocalStampList({
			userId: _userData.id,
			year: now.year,
			month: now.month,
			day: now.day
		});

		var stampGroupView = null;
		var stampSelectList = model.getStampSelectList();
		for (var i=0; i<stampSelectList.length; i++) {
			var groupListView = Ti.UI.createView(style.todayStampListView);
			groupListView.width = (style.commonSize.screenWidth / 2) + 'dp';
			var groupLabel = Ti.UI.createLabel(style.todayStampLabel);
			groupLabel.text = stampSelectList[i].title;
			groupListView.add(groupLabel);
			groupListView.listNo = stampSelectList[i].no - 1;

			var countStamp = 0;
			for (var j=0; j<stampList.length; j++) {
				if (stampSelectList[i].stampList.indexOf(stampList[j].stamp) != -1) {
					stampList[j].opacity = 1.0;
					var groupView = getGroupView(stampList[j]);
					groupListView.add(groupView);
					countStamp++;
					// 表示最大件数
					if (countStamp == 3) {
						break;
					}
				}
			}
			if (countStamp == 0) {
				var stampSpaceList = {
					stamp: stampSelectList[i].stampList[0],
					opacity: 0.2
				};
				var groupView = getGroupView(stampSpaceList);
				groupListView.add(groupView);					
			}
			
			if (i % 2 == 0) {
				stampGroupView = Ti.UI.createView(style.todayStampGroupView);
				stampGroupView.add(groupListView);
			} else if (i % 2 == 1) {
				stampGroupView.add(groupListView);
				var stampRow = Ti.UI.createTableViewRow(style.todayStampListTableRow);
				stampRow.add(stampGroupView);
				rowList.push(stampRow);
			}

			// スタンプをクリック
			groupListView.addEventListener('click',function(e){
				Ti.API.debug('[event]groupListView.click:');
				var target = e.source;
				// 多重クリック防止
				if (clickEnable) {
					clickEnable = false;
					target.opacity = 0.5;
					// opacityの表示を見せるため
			        setTimeout(function(){
						clickEnable = true;
						target.opacity = 1.0;
			        }, 200);

					stampScrollView.scrollTo(style.commonSize.screenWidth * target.listNo, 0);
					stampMenuPage = target.listNo;
				}
			});
		}

		return rowList;
	};

	// スタンプメニューの取得
	var getStampScrollView = function() {
		Ti.API.debug('[func]getStampScrollView:');
		var scrollView = Ti.UI.createScrollView(style.todayMenuScrollView);
/*
		var menuFrameView = Ti.UI.createView(style.todayMenuFrameView);
		stampScrollView.add(menuFrameView);
		var menuListView = Ti.UI.createView(style.todayMenuListView);
		menuFrameView.add(menuListView);

		// カメラの表示
		var cameraView = Ti.UI.createView(style.todayCameraView);
		menuListView.add(cameraView);
		var cameraImage = Ti.UI.createImageView(style.todayCameraImage);
		cameraView.add(cameraImage);


		// 日付の表示
		var dayLabelView = Ti.UI.createView(style.todayDayLabelView);
		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayLabelView.add(dayLabel);
//		dayLabel.text = now.month + '/' + now.day;
		stampScrollView.dayLabel = dayLabel;
		var weekdayLabel = Ti.UI.createLabel(style.todayWeekdayLabel);
		dayLabelView.add(weekdayLabel);
//		weekdayLabel.text = now.weekday.text;
//		weekdayLabel.color = now.weekday.color;
		stampScrollView.weekdayLabel = weekdayLabel;
		var dayView = Ti.UI.createView(style.todayDayView);
		dayView.add(dayLabelView);
		menuListView.add(dayView);

		// カレンダーボタンの表示
		var calendarView = Ti.UI.createView(style.todayCalendarView);
		menuListView.add(calendarView);
		var calendarImage = Ti.UI.createImageView(style.todayCalendarImage);
		calendarView.add(calendarImage);
	
		// カレンダーボタンをクリック
		calendarView.addEventListener('click',function(e){
			Ti.API.debug('[event]calendarView.click:');
			var target = e.source;
			// 多重クリック防止
			if (clickEnable) {
				clickEnable = false;
				target.opacity = 0.5;
				var calendarWin = win.createCalendarWindow(_userData);
				calendarWin.prevWin = todayWin;
				// 下から表示させるため、modalでウィンドウを表示。
				// titleControlが表示されなかったので、NavigationWindowを使用。
				var navWin = Ti.UI.iOS.createNavigationWindow({
					modal: true,
				    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
				    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
					window: calendarWin
				});
				calendarWin.nav = navWin;
				navWin.open();
				clickEnable = true;
				target.opacity = 1.0;
			}
		});
*/
		for (var i=0; i<selectStampList.length; i++) {
			var menuStampView = Ti.UI.createView(style.todayMenuFrameView);
			scrollView.add(menuStampView);
			var menuStampListView = Ti.UI.createView(style.todayMenuListView);
			menuStampView.add(menuStampListView);
			// 選択するスタンプ
			for (var j=0; j<selectStampList[i].stampList.length; j++) {
				var stampView = Ti.UI.createView(style.todayStampSelectView);
				stampView.stamp = selectStampList[i].stampList[j];
				menuStampListView.add(stampView);
				var stampImage = Ti.UI.createImageView(style.todayStampSelectImage);
				stampView.add(stampImage);
				stampImage.image = 'images/icon/' + selectStampList[i].stampList[j] + '.png';
			}
		}

		return scrollView;
	};
/*
	// 写真の表示
	var getDayPhotoView = function() {
		Ti.API.debug('[func]getDayPhotoView:');

		var dayPhotoView = Ti.UI.createView(style.todayDayPhotoView);
		dayPhotoView.height = photoHeight;

		var noDataView = Ti.UI.createView(style.todayNoDataView);
		// ( 全体の高さ - ステータスバー(20) - ヘッダ(44) - スタンプメニュー(54x3) - メニュー(74) - フッタ(44) )
//		noDataView.top = ( (style.commonSize.screenHeight - 344) / 2 - 40 ) + 'dp';
		dayPhotoView.add(noDataView);
		todayWin.noDataView = noDataView;		
		var noDataLabel = Ti.UI.createLabel(style.todayNoDataLabel);
		noDataLabel.text = '１日１枚、写真を投稿して\nわんこの日記をつけよう';
		noDataView.add(noDataLabel);
		var noDataImage = Ti.UI.createImageView(style.todayNoDataImage);
		noDataView.add(noDataImage);

		// 写真をクリック
		dayPhotoView.addEventListener('touchstart',function(e){
			Ti.API.debug('[event]dayPhotoView.touchstart:');
			// swipe時にclickイベントが発生するためtouchStartとtouchEndの差で判定
			swipeOffset = {x:e.x, y:e.y};
		});

		// 写真をクリック
		dayPhotoView.addEventListener('touchend',function(e){
			Ti.API.debug('[event]dayPhotoView.touchend:');
			// swipe時にclickイベントが発生するためtouchStartとtouchEndの差で判定
			if(swipeOffset != null && e.x == swipeOffset.x && e.y == swipeOffset.y) {
				if (e.source.objectName == 'todayPrevView') {
					// 多重クリック防止
					if (clickEnable) {
						clickEnable = false;
						updatePrevPhoto();
						clickEnable = true;
					}
					
				} else if (e.source.objectName == 'todayNextView') {
					// 多重クリック防止
					if (clickEnable) {
						clickEnable = false;
						updateNextPhoto();
						clickEnable = true;
					}

				} else if (e.source.objectName == 'todayNoDataImage') {
					var target = e.source;
					// 多重クリック防止
					if (clickEnable) {
						clickEnable = false;
						target.opacity = 0.5;
						// 日時の更新
						updateTodayDay();
						
						var dialog = Titanium.UI.createOptionDialog({
							options:['撮影する', 'アルバムから選ぶ', 'キャンセル'],
							cancel:2
		//						title:'写真を添付'
						});
						dialog.show();
			
						dialog.addEventListener('click',function(e) {
							Ti.API.debug('[event]dialog.click:');
							switch( e.index ) {
								case 0:
									var cameraWin = win.createCameraWindow('photo_camera', _userData);
									win.openTabWindow(cameraWin, {animated:true});
									target.opacity = 1.0;
									clickEnable = true;
									break;
								case 1:
									var cameraWin = win.createCameraWindow('photo_select', _userData);
									win.openTabWindow(cameraWin, {animated:true});
									target.opacity = 1.0;
									clickEnable = true;
									break;
								case 2:
									target.opacity = 1.0;
									clickEnable = true;
									break;
							}
						});
					}
	
				} else if (todayPhotoImage.visible){
					// 多重クリック防止
					if (clickEnable) {
						clickEnable = false;
						var target = e.source;
						target.opacity = 0.5;
						var photoWin = Ti.UI.createWindow(style.photoListFullPhotoWin);
						var photoView = Ti.UI.createView(style.photoListFullPhotoView);
						photoWin.add(photoView);
						var photoImage = Ti.UI.createImageView(style.photoListFullPhotoImage);
			//			photoImage.image = todayWin.photoImage;
						photoImage.image = todayPhotoImage.image;
						photoView.add(photoImage);
						var photoTimeLabel = Ti.UI.createLabel(style.photoListFullPhotoTimeLabel);
						photoTimeLabel.text = util.getFormattedMD(todayPhotoImage.articleData.date);
						photoView.add(photoTimeLabel);
						var photoTextLabel = Ti.UI.createLabel(style.photoListFullPhotoTextLabel);
						photoTextLabel.text = todayPhotoImage.articleData.text;
						photoView.add(photoTextLabel);
						photoWin.open({
							modal: true,
						    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
						    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
						});
			
						// フォト拡大画面にタップで戻る
						photoWin.addEventListener('click',function(e){
							Ti.API.debug('[event]photoWin.click:');
							photoWin.close();
						});
			
						target.opacity = 1.0;
						clickEnable = true;
					}
				}
			}
		});

		// 日付
		var dayLWeekView = Ti.UI.createView(style.todayDayWeekView);
		dayPhotoView.add(dayLWeekView);
		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayLabel.text = now.month + '/' + now.day;
		dayLWeekView.add(dayLabel);
		var weekLabel = Ti.UI.createLabel(style.todayWeekLabel);
//		dayWeekLabel.text = now.month + '/' + now.day + '(' + now.weekday.text + ')';
		weekLabel.text = now.weekday.text + '曜日';
		dayLWeekView.add(weekLabel);
		todayWin.dayLabel = dayLabel;
		todayWin.weekLabel = weekLabel;

		var prevView = Ti.UI.createImageView(style.todayPrevView);
		dayPhotoView.add(prevView);
		var prevImage = Ti.UI.createImageView(style.todayPrevImage);
		prevView.add(prevImage);
		todayWin.prevImage = prevImage;

		var nextView = Ti.UI.createImageView(style.todayNextView);
		dayPhotoView.add(nextView);
		var nextImage = Ti.UI.createImageView(style.todayNextImage);
		nextView.add(nextImage);
		todayWin.nextImage = nextImage;

		return dayPhotoView;
	};
*/

	// 写真の取得
	var getTodayPhotoImage = function(_articleData) {
		Ti.API.debug('[func]getTodayPhotoImage:');

		var fileName = _userData.id + "_" + _articleData.date.substring(0,10);
		// ローカルに投稿写真が保存されてる場合
		if (model.checkLocalImage(util.local.photoPath, fileName)) {
			return util.local.photoPath + fileName + '.png';
		} else {
			if (_articleData.photo == '') {
				// 記事の取得
				model.getCloudArticlePost({
					postId: _articleData.id
				}, function(e) {
					Ti.API.debug('[func]getCloudArticlePost.callback:');
					if (e.success) {
						model.updateLocalArticlePhoto({
							postId: _articleData.id,
							photo: e.photo
						});
						return e.photo;
					} else {
						util.errorDialog(e);
						return null;
					}
				});

			} else {
				return _articleData.photo;			
			}
		}
	};

	// 投稿済みページの取得
	var insertPostFrameView = function(params) {
		Ti.API.debug('[func]insertPostFrameView:');

		var postFrameView = Ti.UI.createView(style.todayPhotoFrameView);
		postFrameView.transform = rotateRow;
		var dayPhotoView = Ti.UI.createView(style.todayDayPhotoView);
		postFrameView.add(dayPhotoView);
		var noDataView = Ti.UI.createView(style.todayNoDataView);
		todayWin.noDataView = noDataView;
		dayPhotoView.add(noDataView);
		var noDataLabel = Ti.UI.createLabel(style.todayNoDataLabel);
		noDataView.add(noDataLabel);

		// 日付
		var dayLWeekView = Ti.UI.createView(style.todayDayWeekView);
		dayPhotoView.add(dayLWeekView);
		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayLabel.text = now.month + '/' + now.day;
		dayLWeekView.add(dayLabel);
		var weekLabel = Ti.UI.createLabel(style.todayWeekLabel);
		var weekday = util.diary.weekday[new Date(now.year, now.month-1, now.day).getDay()];
		weekLabel.text = weekday.text + '曜日';
		dayLWeekView.add(weekLabel);

		if (params.postedFlag) {
			noDataLabel.text = '写真の投稿は１日１枚です。\nまた明日。';
			var noDataImage = Ti.UI.createImageView(style.todayNoDataImage);
			noDataView.add(noDataImage);

		} else {
			noDataLabel.text = '１日１枚、写真を投稿して\nわんこの日記をつけよう';
			var cameraImage = Ti.UI.createImageView(style.todayCameraImage);
			noDataView.add(cameraImage);

			// カメラをクリック
			cameraImage.addEventListener('click',function(e){
				Ti.API.debug('[event]cameraImage.click:');
				var target = e.source;
				// 多重クリック防止
				if (clickEnable) {
					clickEnable = false;
					target.opacity = 0.5;
	
					var dialog = Titanium.UI.createOptionDialog({
						options:['撮影する', 'アルバムから選ぶ', 'キャンセル'],
						cancel:2
	//						title:'写真を添付'
					});
					dialog.show();
		
					dialog.addEventListener('click',function(e) {
						Ti.API.debug('[event]dialog.click:');
						switch( e.index ) {
							case 0:
								var cameraWin = win.createCameraWindow('photo_camera', _userData);
								win.openTabWindow(cameraWin, {animated:true});
								target.opacity = 1.0;
								clickEnable = true;
								break;
							case 1:
								var cameraWin = win.createCameraWindow('photo_select', _userData);
								win.openTabWindow(cameraWin, {animated:true});
								target.opacity = 1.0;
								clickEnable = true;
								break;
							case 2:
								target.opacity = 1.0;
								clickEnable = true;
								break;
						}
					});
				}
			});	
		}

		if (params.prevFlag) {
			var prevView = Ti.UI.createImageView(style.todayPrevView);
			dayPhotoView.add(prevView);
			var prevImage = Ti.UI.createImageView(style.todayPrevImage);
			prevView.add(prevImage);
			
			prevView.addEventListener('click', function(e) {
				Ti.API.debug('[event]prevView.click:');
				todayPhotoTableView.fireEvent('swipe', {direction:'right'});
			});
		}
		var photoRow = Ti.UI.createTableViewRow(style.todayPhotoTableRow);
		photoRow.add(postFrameView);
		if (todayPhotoTableView.data.length == 0) {
			todayPhotoTableView.appendRow(photoRow, {animated:false});
		} else {
			todayPhotoTableView.updateRow(0, photoRow, {animated:true});
		}
	};

	// 写真の取得
	var getPhotoFrameView = function(params) {
		Ti.API.debug('[func]getPhotoFrameView:');
		var photoFrameView = Ti.UI.createView(style.todayPhotoFrameView);
		photoFrameView.transform = rotateRow;
		photoFrameView.articleData = params.articleData;
		var dayPhotoView = Ti.UI.createView(style.todayDayPhotoView);
		photoFrameView.add(dayPhotoView);
		var photoImage = Ti.UI.createImageView(style.todayPhotoImage);
		photoImage.image = getTodayPhotoImage(params.articleData);
		photoImage.articleData = params.articleData;
		dayPhotoView.add(photoImage);

		// 白地で見えるように
		var photoCoverView = Ti.UI.createView(style.todayPhotoCoverView);
		dayPhotoView.add(photoCoverView);

		// 日付
		var articleDate = util.getDateElement(params.articleData.date);
		var dayLWeekView = Ti.UI.createView(style.todayDayWeekView);
		dayPhotoView.add(dayLWeekView);
		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayLabel.text = articleDate.month + '/' + articleDate.day;
		dayLWeekView.add(dayLabel);
		var weekLabel = Ti.UI.createLabel(style.todayWeekLabel);
		var weekday = util.diary.weekday[new Date(articleDate.year, articleDate.month-1, articleDate.day).getDay()];
		weekLabel.text = weekday.text + '曜日';
		dayLWeekView.add(weekLabel);

		if (params.prevFlag){
			var prevView = Ti.UI.createImageView(style.todayPrevView);
			dayPhotoView.add(prevView);
			var prevImage = Ti.UI.createImageView(style.todayPrevImage);
			prevView.add(prevImage);
			
			prevView.addEventListener('click', function(e) {
				Ti.API.debug('[event]prevView.click:');
				todayPhotoTableView.fireEvent('swipe', {direction:'right'});
			});
		}

		var nextView = Ti.UI.createImageView(style.todayNextView);
		dayPhotoView.add(nextView);
		var nextImage = Ti.UI.createImageView(style.todayNextImage);
		nextView.add(nextImage);

		nextView.addEventListener('click', function(e) {
			Ti.API.debug('[event]nextView.click:');
			todayPhotoTableView.fireEvent('swipe', {direction:'left'});
		});

		var photoRow = Ti.UI.createTableViewRow(style.todayPhotoTableRow);
		photoRow.add(photoFrameView);
		if (params.insertFlag){
			todayPhotoTableView.insertRowAfter(0, photoRow, {animated:false});
			todayPhotoTableView.deleteRow(0, {animated:false});
		} else {
			todayPhotoTableView.appendRow(photoRow, {animated:false});
		}

		return photoFrameView;
	};

	// 写真の更新
	var updateTodayPhoto = function() {
		Ti.API.debug('[func]updateTodayPhoto:');
		if (photoFrameList.length == 0) {
			// 写真の取得
			model.getCloudTodayArticle({
				idList: [_userData.id],
				limit: articleCount
			}, function(e) {
				Ti.API.debug('[func]getCloudTodayArticle.callback:');
				if (e.success) {
					// 続きがあるかチェック
					nextArticleFlag = (e.meta.total_results <= articleCount || photoFramePage + articleCount >= photoFrameMax) ? false : true;
					// 今日の記事を投稿済みかチェック
					var postedFlag = false;
					if (e.articleList.length > 0) {
						var latestDate = util.getDateElement(e.articleList[0].date);
						if (latestDate.year == now.year && latestDate.month == now.month && latestDate.day == now.day) {
							postedFlag = true;
						}
					}
					// 投稿ページ
					insertPostFrameView({postedFlag:postedFlag, prevFlag:(e.articleList.length > 0)});
					// todayPhotoTableViewに追加後にスクロールさせるためのタイムラグ
					setTimeout(function(){
						photoFrameStartPage = (postedFlag) ? 1 : 0;
						photoFramePage = photoFrameStartPage;
						todayPhotoTableView.scrollToIndex(photoFramePage, {animated:false});
					}, 200);

					// 写真
					for (var i=0; i<e.articleList.length; i++) {
						var prevFlag = (nextArticleFlag || i < e.articleList.length - 1) ? true : false;
						photoFrameList.push(getPhotoFrameView({articleData:e.articleList[i], prevFlag:prevFlag, insertFlag:false}));
					}

				} else {
					util.errorDialog(e);
				}
			});

		// 投稿済みページを先頭に追加
		} else if (photoFramePage == 0) {
			// 日時の更新
			now = util.getDateElement(new Date());
			// 今日の記事を投稿済みかチェック
			var postedFlag = false;
			var latestDate = util.getDateElement(photoFrameList[photoFrameList.length-1].articleData.date);
			if (latestDate.year == now.year && latestDate.month == now.month && latestDate.day == now.day) {
				postedFlag = true;
			}
			insertPostFrameView({postedFlag:postedFlag, prevFlag:true});
			// todayPhotoTableViewに追加後にスクロールさせるためのタイムラグ
			setTimeout(function(){
				todayPhotoTableView.scrollToIndex(photoFramePage, {animated:true});
				photoFrameStartPage = (postedFlag) ? 1 : 0;
			}, 200);

		// 続きの写真を追加
		} else {
			var lastId = photoFrameList[photoFrameList.length-1].articleData.id;
			// 写真の取得
			model.getCloudTodayArticle({
				idList: [_userData.id],
				limit: articleCount,
				lastId: lastId
			}, function(e) {
				Ti.API.debug('[func]getCloudTodayArticle.callback:');
				if (e.success) {
					nextArticleFlag = (e.meta.total_results <= articleCount || photoFramePage + articleCount >= photoFrameMax) ? false : true;
					// 写真の表示
					for (var i=0; i<e.articleList.length; i++) {
						var prevFlag = (nextArticleFlag || i < e.articleList.length - 1) ? true : false;
						photoFrameList.push(getPhotoFrameView({articleData:e.articleList[i], prevFlag:prevFlag, insertFlag:false}));
					}
					// todayPhotoTableViewに追加後にスクロールさせるためのタイムラグ
					setTimeout(function(){
						todayPhotoTableView.scrollToIndex(photoFramePage, {animated:true});
					}, 200);

				} else {
					util.errorDialog(e);
				}
			});			
		}
	};

/*
	// 写真の更新
	var updateTodayPhoto = function(params) {
		Ti.API.debug('[func]updateTodayPhoto:');

		if (params == null) {
			// 写真の取得
			model.getCloudTodayArticle({
				idList: [_userData.id],
				limit: articleCount
			}, function(e) {
				Ti.API.debug('[func]getCloudTodayArticle.callback:');
				if (e.success) {
					if (e.articleList.length > 0) {
						var todayArticle = null;
						articlePage = 1;
						todayArticleList = e.articleList;
						// 最新記事が今日の記事かチェック
						var latestDate = util.getDateElement(todayArticleList[0].date);
						if (latestDate.year == now.year && latestDate.month == now.month && latestDate.day == now.day) {
							todayArticle = articleList[0];
							todayIndex = 0;
						} else {
							todayIndex = null;
						}
					}
				
					if (todayArticle == null) {
						todayWin.noDataView.visible = true;
						todayWin.photoRow.backgroundColor = '#eeeeee';
						todayPhotoImage.visible = false;
						todayPhotoImage.articleData = null;
						todayWin.nextImage.visible = false;
						if (todayArticleList.length > 0) {
							todayWin.prevImage.visible = true;
						} else {
							todayWin.prevImage.visible = false;
						}

					} else {
						todayWin.noDataView.visible = false;
						todayWin.photoRow.backgroundColor = 'transparent';
						todayPhotoImage.visible = true;
						todayPhotoImage.image = getTodayPhotoImage(todayArticle);
						todayPhotoImage.articleData = todayArticle;
						updateTodayDay(todayArticle.date);
						todayWin.nextImage.visible = true;
						if (todayArticleList.length > 1) {
							todayWin.prevImage.visible = true;
						} else {
							todayWin.prevImage.visible = false;
						}
			
					}
					if (e.meta.total_results <= articleCount || articlePage == articlePageMax) {
						nextArticleFlag = false;
					} else {
						nextArticleFlag = true;
					}
	
				} else {
					util.errorDialog(e);
				}
			});

		} else {
			// 写真の取得
			model.getCloudTodayArticle({
				idList: [_userData.id],
				limit: articleCount,
				lastId: params.lastId
			}, function(e) {
				Ti.API.debug('[func]getCloudTodayArticle.callback:');
				if (e.success) {
					if (e.articleList.length > 0) {
						articlePage++;
						for (var i=0; i<e.articleList.length; i++) {
							todayArticleList.push(e.articleList[i]);
						}
						todayIndex++;
						todayPhotoImage.image = getTodayPhotoImage(todayArticleList[todayIndex]);
						todayPhotoImage.articleData = todayArticleList[todayIndex];
						updateTodayDay(todayArticleList[todayIndex].date);
						todayWin.nextImage.visible = true;
						if (todayArticleList.length > todayIndex + 1) {
							todayWin.prevImage.visible = true;
						} else {
							todayWin.prevImage.visible = false;
						}
					}
					if (e.meta.total_results <= articleCount || articlePage == articlePageMax) {
						nextArticleFlag = false;
					} else {
						nextArticleFlag = true;
					}
	
				} else {
					util.errorDialog(e);
				}
			});			
		}
	};
*/

	// groupViewの取得
	var getGroupView = function(_rowStamp) {
		Ti.API.debug('[func]getGroupView:');

		var targetView = Ti.UI.createView(style.todayStampView);
//		targetView.stampData = _rowStamp;

		var stampImage = Ti.UI.createImageView(style.todayStampImage);
		stampImage.image = 'images/icon/' + _rowStamp.stamp + '.png';
		stampImage.opacity = _rowStamp.opacity;
		targetView.add(stampImage);

		return targetView;
	};

	// 今日のわんこの取得
	var getTodayRowList = function() {
		Ti.API.debug('[func]getTodayRowList:');
		// フォトの表示
		var rowList = [];
		var photoRow = Ti.UI.createTableViewRow(style.todayPhotoTableRow);
		rowList.push(photoRow);
		photoRow.add(todayPhotoTableView);

		return rowList;
	};

	// 今日のデータ更新
	var updateTodayTable = function() {
		Ti.API.debug('[func]updateTodayTable:');
		// 日時の更新
		now = util.getDateElement(new Date());
		// スタンプメニューの更新
		stampMenuTableView.data = [];
		stampMenuTableView.setData(getStampMenuRowList());
		// 写真の更新
		todayTableView.data = [];
		todayTableView.setData(getTodayRowList());
		updateTodayPhoto();
	};
/*
	// 最上部から下スクロールで最新データを更新する用のヘッダを作成
	var getTableHeader = function() {
		Ti.API.debug('[func]getTableHeader:');

		var tableHeader = Ti.UI.createView(style.commonTableHeader);
		var headerBorder = Ti.UI.createView(style.commonHeaderBorder);
		tableHeader.add(headerBorder);
		var updateArrowImage = Ti.UI.createImageView(style.commonUpdateArrowImage);
		tableHeader.add(updateArrowImage);
		var pullLabel = Ti.UI.createLabel(style.commonPullLabel);
		tableHeader.add(pullLabel);
		var lastUpdatedLabel = Ti.UI.createLabel(style.commonLastUpdatedLabel);
		lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
		tableHeader.add(lastUpdatedLabel);
		var updateIndicator = Ti.UI.createActivityIndicator(style.commonUpdateIndicator);
		tableHeader.add(updateIndicator);

		// 参照用
		tableHeader.updateArrowImage = updateArrowImage;
		tableHeader.pullLabel = pullLabel;
		tableHeader.lastUpdatedLabel = lastUpdatedLabel;
		tableHeader.updateIndicator = updateIndicator;
		
		return tableHeader;
	};
*/
// ---------------------------------------------------------------------
	var todayWin = Ti.UI.createWindow(style.todayWin);
	// タイトルの表示
	var todayTitle = Ti.UI.createLabel(style.todayTitleLabel);	
	todayWin.titleControl = todayTitle;
	// フォトの表示
	var todayPhotoImage = Ti.UI.createImageView(style.todayPhotoImage);		
	todayWin.add(todayPhotoImage);
//	todayWin.photoImage = photoImage;
	// 写真の表示
	var todayTableView = Ti.UI.createTableView(style.todayTableView);
//	todayTableView.headerPullView = getTableHeader();
	todayWin.add(todayTableView);

	var todayPhotoTableView = Ti.UI.createTableView(style.todayPhotoTableView);
	var rotateRow = Ti.UI.create2DMatrix();//tableView内の画像を回転させるMatrix
	var rotateTable = Ti.UI.create2DMatrix();//tableView自体の画像を回転させるMatrix
	rotateRow = rotateRow.rotate(270);//画像それぞれを270度回転
	rotateTable = rotateTable.rotate(90);//tableViewそのものを90度回転
	todayPhotoTableView.transform = rotateTable;
	 
	// メニューに表示するスタンプリスト
	var selectStampList = model.getStampTimeSelectList();
	// スタンプスクロールの表示
	var stampScrollView = getStampScrollView();
	todayWin.add(stampScrollView);
	// スタンプメニューの表示
	var stampMenuTableView = Ti.UI.createTableView(style.todayMenuTableView);
	todayWin.add(stampMenuTableView);

	// 今日の内容を更新
	updateTodayTable();

// ---------------------------------------------------------------------

	// タイトルの年月をクリックした時
	todayTitle.addEventListener('click', function(e) {
		Ti.API.debug('[event]todayTitle.click:');
		e.source.opacity = 0.5;
		todayWin.fireEvent('refresh');
		e.source.opacity = 1.0;
	});

	// 更新用イベント
	todayWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]todayWin.refresh:');
		// 日が変わった場合
		if (checkNewDay()) {
			updateTodayTable();

		} else {
			photoFramePage = photoFrameStartPage;
			todayPhotoTableView.scrollToIndex(photoFramePage, {animated:true});
			stampMenuPage = 0;
			stampScrollView.scrollTo(stampMenuPage, 0);

			if (e.articleData) {
				var prevFlag = (photoFrameList.length > 0) ? true : false;
				photoFrameList.unshift(getPhotoFrameView({articleData:e.articleData, prevFlag:prevFlag, insertFlag:true}));
/*
				setTimeout(function(){
					photoFrameStartPage = 1;
					photoFramePage = 1;
					todayPhotoTableView.scrollToIndex(photoFramePage, {animated:false});
				}, 200);
*/	
			} else if (e.diaryData) {
				// スタンプメニューの更新
				stampMenuTableView.date = [];
				stampMenuTableView.setData(getStampMenuRowList());
			}
		}

		// 更新処理の後でタブの切り替え
		if (e.activeTab) {
			tabGroup.activeTab = e.activeTab;
		}
	});

	// 写真のスワイプ
	todayPhotoTableView.addEventListener('swipe',function(e){
		Ti.API.debug('[event]todayPhotoTableView.swipe:');
		// 多重クリック防止
		if (clickEnable) {
			clickEnable = false;
			setTimeout(function(){
				clickEnable = true;
			}, 500);
		
			if (e.direction == 'right') {
				if (photoFramePage < photoFrameList.length) {
					photoFramePage++;
					todayPhotoTableView.scrollToIndex(photoFramePage, {animated:true});
	
				} else {
					if (nextArticleFlag) {
						photoFramePage++;
						updateTodayPhoto();
					}	
				}
	
			} else if (e.direction == 'left') {
				if (photoFramePage == 1) {
					photoFramePage--;
					updateTodayPhoto();
				} else {
					photoFramePage--;
					todayPhotoTableView.scrollToIndex(photoFramePage, {animated:true});
				}
			}
		}
	});

	// スタンプのクリック
	stampScrollView.addEventListener('click',function(e){
		Ti.API.debug('[event]stampScrollView.click:');
		var target = e.source;
		if (target.objectName == 'todayStampSelectView') {
			// 多重クリック防止
			if (clickEnable) {
				clickEnable = false;
				target.opacity = 0.5;
				setTimeout(function(){
					clickEnable = true;
					target.opacity = 1.0;
				}, 500);

				// 日時の更新
				now = util.getDateElement(new Date());
	
				var stampData = {
					no: null,
					event: null,
					user: _userData.id,
					stamp: target.stamp,
					textList: null,
					year: now.year,
					month: now.month,
					day: now.day,
					hour: now.hour,
					all: null,
					report: null,
					date: null,
				};
	
				var postWin = win.createStampPostWindow('time', _userData, [stampData]);
				postWin.prevWin = todayWin;
				win.openTabWindow(postWin, {animated:true});
			}
		}
	});

	// スタンプのスワイプ
	stampScrollView.addEventListener('swipe',function(e){
		Ti.API.debug('[event]stampScrollView.swipe:');
		if (e.direction == 'right' && stampMenuPage > 0) {
			stampMenuPage--;
			stampScrollView.scrollTo(style.commonSize.screenWidth * stampMenuPage, 0);

		} else if (e.direction == 'left' && stampMenuPage < selectStampList.length - 1) {
			stampMenuPage++;
			stampScrollView.scrollTo(style.commonSize.screenWidth * stampMenuPage, 0);
		}
	});

/*
	// 下スクロールで上部ヘッダがすべて表示するまでひっぱったかどうかのフラグ
	var pulling = false;
	// スクロール終了時に更新をしてよいかどうかのフラグ
	var reloading = false;
	// 表示部分の最上位置からのオフセット
	var offset = 0;

	// ヘッダの表示をもとに戻す
	var resetPullHeader = function(_tableView){
        Ti.API.debug('[func]resetPullHeader:');
	    reloading = false;
	    _tableView.headerPullView.lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	    _tableView.headerPullView.updateIndicator.hide();
	    _tableView.headerPullView.updateArrowImage.transform=Ti.UI.create2DMatrix();
	    _tableView.headerPullView.updateArrowImage.show();
	    _tableView.headerPullView.pullLabel.text = 'Pull down to refresh...';
	    _tableView.setContentInsets({top:0}, {animated:true});
	};
	 
	// スクロールで発生するイベント
	todayTableView.addEventListener('scroll',function(e){
		// 表示部分の最上位置からのオフセット
	    offset = e.contentOffset.y;
		// 下スクロールで、上部のヘッダが一部表示している場合
	    if (pulling && !reloading && offset > -80 && offset < 0){
	        pulling = false;
	        var unrotate = Ti.UI.create2DMatrix();
	        e.source.headerPullView.updateArrowImage.animate({transform:unrotate, duration:180});
	        e.source.headerPullView.pullLabel.text = 'Pull down to refresh...';

		// 下スクロールで、上部のヘッダがすべて表示している場合
	    } else if (!pulling && !reloading && offset < -80){
	        pulling = true;
	        var rotate = Ti.UI.create2DMatrix().rotate(180);
	        e.source.headerPullView.updateArrowImage.animate({transform:rotate, duration:180});
	        e.source.headerPullView.pullLabel.text = 'Release to refresh...';
	    }
	});
		
	// スクロールの終了時に発生するイベント
	todayTableView.addEventListener('dragEnd',function(e){
		// 下スクロールで、上部のヘッダがすべて表示されたらを最新データを更新
	    if (pulling && !reloading && offset < -80){
	        pulling = false;
	        reloading = true;
	        e.source.headerPullView.pullLabel.text = 'Updating...';
	        e.source.headerPullView.updateArrowImage.hide();
	        e.source.headerPullView.updateIndicator.show();
	        e.source.setContentInsets({top:80}, {animated:true});
	        setTimeout(function(){
	        	resetPullHeader(e.source);
	        	todayWin.fireEvent('refresh');
	        }, 2000);
	    }
	});
*/
	return todayWin;
};


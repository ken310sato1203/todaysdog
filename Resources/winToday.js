// トップ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winToday.createWindow:');

	// 日付
	var now = null;
	// 写真がすべて表示されない場合高さを削るため、テキストの表示位置をあげる
	// 写真の高さーステータスバー(20)＋タイトルバー(44)＋カスタムタブ(44)ーメニュー(74)ースタンプ(74)
	var textBottom = (style.commonSize.screenWidth * 3 / 4) - (style.commonSize.screenHeight - 20 - 88 - 148);

// ---------------------------------------------------------------------
/*
	// StampViewの取得
	var getStampView = function(_rowStamp) {
		Ti.API.debug('[func]getStampView:');

		var targetView = Ti.UI.createView(style.todayTimeStampView);
		targetView.stampData = _rowStamp;

		var hourLabel = Ti.UI.createLabel(style.todayTimeHourLabel);
		if (_rowStamp.hour == -1) {
			hourLabel.text =  '終日 ';		
		} else {
			hourLabel.text =  _rowStamp.hour + ':00 ';
		}
//		targetView.add(hourLabel);

		var stampImage = Ti.UI.createImageView(style.todayTimeStampImage);
		stampImage.image = 'images/icon/' + _rowStamp.stamp + '.png';
		targetView.add(stampImage);

		var stampLabel = Ti.UI.createLabel(style.todayTimeStampLabel);
		stampLabel.text =  _rowStamp.textList[0];
		targetView.add(stampLabel);

		return targetView;
	};

	// Viewの取得
	var getTimeTableView = function(_stampList) {
		Ti.API.debug('[func]getTimeTableView:');
		var targetView = Ti.UI.createTableView(style.todayStampTableView);
		var rowList = [];

		var itemList = [
			{text:'ごはん', imageList:[]}, 
			{text:'うんち', imageList:[]}, 
			{text:'さんぽ', imageList:[]}];
		var indexList = { 
			'stamp_restaurant1': 0, 'stamp_restaurant2': 0, 'stamp_restaurant3': 0, 
			'stamp_favorite1': 1, 'stamp_favorite2': 1, 'stamp_favorite3': 1, 
			'stamp_walking1': 2, 'stamp_walking2': 2, 'stamp_walking3': 2 };

		// 当日のデータ
		for (var i=0; i<_stampList.length; i++) {
			if(_stampList[i].stamp in indexList) {
				var stampImage = Ti.UI.createImageView(style.todayStampImage);
				stampImage.image = 'images/icon/' + _stampList[i].stamp + '.png';
				itemList[indexList[_stampList[i].stamp]].imageList.push(stampImage);
			}
		}

		for (var i=0; i<itemList.length; i++) {
			var row = Ti.UI.createTableViewRow(style.todayStampTableRow);
			rowList.push(row);
			
			var stampMax = 4;
			for (var j=0; j<stampMax; j++) {
				var stampView = Ti.UI.createView(style.todayStampView);
				if (itemList[i].imageList[j] != null) {
					stampView.add(itemList[i].imageList[j]);				
				} else {
					var stampText = Ti.UI.createLabel(style.todayStampTextLabel);
					stampText.text = itemList[i].text;
					stampView.add(stampText);
				}
				row.add(stampView);
			}
		}
		
		// 当日のデータ
		for (var i=0; i<_stampList.length; i++) {
			var row = Ti.UI.createTableViewRow(style.todayTimeTableRow);
			row.diaryData = {
				year: now.year,
				month: now.month,
				day: now.day,
				weekday: now.weekday,
				todayFlag: true,
				stampList: _stampList,
				articleData: null,
				timeIndex: _stampList[i].hour,
			};
			
			var stampView = getStampView(_stampList[i]);
			row.add(stampView);
			rowList.push(row);

			stampView.addEventListener('click',function(e){
				Ti.API.debug('[event]hourView.click:');
				var targetTab = win.getTab("diaryTab");
				// timeWinがオープンしている場合
				if (targetTab.window.nextWin != null) {
					// timeWinをクローズ
					targetTab.window.nextWin.close({animated:false});
				}
				// timeWinを新規オープン
				var timeWin = win.createTimeWindow(_userData, e.row.diaryData);
				timeWin.prevWin = targetTab.window;
				targetTab.window.nextWin = timeWin;
				targetTab.open(timeWin, {animated:false});	
				tabGroup.activeTab = targetTab;
			});
		}

		targetView.setData(rowList);
		return targetView;
	};
*/
	// dayViewの取得
	var getDayLabelView = function() {
		Ti.API.debug('[func]getDayLabelView:');
		// 日付
		var dayLabelView = Ti.UI.createView(style.todayDayLabelView);

		// 日時の更新
		var nowDate = new Date();
		now = util.getDateElement(nowDate);
		now.weekday = util.diary.weekday[nowDate.getDay()];
		now.today = util.getFormattedDate(nowDate);

		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayLabelView.add(dayLabel);
		dayLabel.text = now.month + '/' + now.day;
//		dayLabel.text = Math.floor(Math.random() * 10);
		var weekdayLabel = Ti.UI.createLabel(style.todayWeekdayLabel);
		dayLabelView.add(weekdayLabel);
		weekdayLabel.text = now.weekday.text;
		weekdayLabel.color = now.weekday.color;

		return dayLabelView;
	};


	// menuRowの取得
	var getTodayMenuRow = function(_articleData) {
		Ti.API.debug('[func]getTodayMenuRow:');
		// メニューの表示
		var menuRow = Titanium.UI.createTableViewRow(style.todayTableRow);
		menuRow.backgroundColor = '#eeeeee';
		var menuView = Ti.UI.createView(style.todayMenuView);
		menuRow.add(menuView);

		// カメラの表示
		var cameraView = Ti.UI.createView(style.todayCameraView);
		todayWin.cameraView = cameraView;
		menuView.add(cameraView);
		var cameraImage = Ti.UI.createImageView(style.todayCameraImage);
		cameraView.add(cameraImage);
		// 今日の投稿が既にされている場合
		if (_articleData) {
			cameraView.opacity = 0.3;
			cameraView.touchEnabled = false;
		}

		// カメラをクリック
		cameraView.addEventListener('click',function(e){
			Ti.API.debug('[event]cameraView.click:');
			var target = e.source;
			// 多重クリック防止
			target.touchEnabled = false;
			target.opacity = 0.5;
			var dialog = Titanium.UI.createOptionDialog({
				options:['撮影する', 'アルバムから選ぶ', 'キャンセル'],
				cancel:2
//					title:'写真を添付'
			});
			dialog.show();

			dialog.addEventListener('click',function(e) {
				Ti.API.debug('[event]dialog.click:');
				cameraView.touchEnabled = true;
				switch( e.index ) {
					case 0:
						var cameraWin = win.createCameraWindow('photo_camera', _userData);
						cameraWin.prevWin = todayWin;
						win.openTabWindow(cameraWin, {animated:true});
						cameraView.opacity = 1.0;
						break;
					case 1:
						var cameraWin = win.createCameraWindow('photo_select', _userData);
						cameraWin.prevWin = todayWin;
						win.openTabWindow(cameraWin, {animated:true});
						cameraView.opacity = 1.0;
						break;
					case 2:
						cameraView.opacity = 1.0;
						break;
				}
			});
		});		

		// 日付の表示
		var dayView = Ti.UI.createView(style.todayDayView);
		dayView.add(getDayLabelView());
		menuView.add(dayView);
		todayWin.dayView = dayView;
	
		// スタンプボタンの表示
		var editView = Ti.UI.createView(style.todayEditView);
		menuView.add(editView);
		var editImage = Ti.UI.createImageView(style.todayEditImage);
		editView.add(editImage);
	
		// スタンプボタンをクリック
		editView.addEventListener('click',function(e){
			Ti.API.debug('[event]editView.click:');
			var target = e.source;
			// 多重クリック防止
			target.touchEnabled = false;
			target.opacity = 0.5;
			var type = "today";
			var stampWin = win.createStampWindow(type, _userData, null);	
			stampWin.prevWin = todayWin;
			win.openTabWindow(stampWin, {animated:true});
			target.touchEnabled = true;
			target.opacity = 1.0;
		});

		// 余白分
		var spaceView = Ti.UI.createView(style.todaySpaceView);		
		menuView.add(spaceView);
		
		return menuRow;
	};

	// photoRowの取得
	var getTodayPhotoRow = function(_articleData) {
		Ti.API.debug('[func]getTodayPhotoRow:');

		var photoRow = Ti.UI.createTableViewRow(style.todayTableRow);
		var photoView = Ti.UI.createView(style.todayPhotoView);
		photoRow.add(photoView);

		var photoImage = Ti.UI.createImageView(style.todayPhotoImage);
		photoView.add(photoImage);
//		photoImage.image = 'images/photo/' + _articleData.photo + '.jpg';
		photoImage.image = _articleData.photo;
		
		var textView = Ti.UI.createView(style.todayPhotoTextView);
		photoImage.textView = textView;
		if ( textBottom > 0 ) {
			textView.bottom = textBottom + 'dp';
		}
		photoView.add(textView);
		var photoTextLabel = Ti.UI.createLabel(style.todayPhotoTextLabel);
		photoTextLabel.text = _articleData.text;
		var photoTimeLabel = Ti.UI.createLabel(style.todayPhotoTimeLabel);
		photoTimeLabel.text = _articleData.date;
		textView.add(photoTextLabel);
		textView.add(photoTimeLabel);

		// 写真をクリックした時
		photoImage.addEventListener('click', function(e) {
			Ti.API.debug('[event]photoImage.click:');
			// テキストの表示
			var target = e.source.textView;
			if (target.visible) {
				target.visible = false;
			} else {
				target.visible = true;
			}
			
/*
			if (target.articleData != null) {
				var photoWin = Ti.UI.createWindow(style.todayFullPhotoWin);
				var photoView = Ti.UI.createView(style.todayFullPhotoView);
				photoWin.add(photoView);
				var photoImage = Ti.UI.createImageView(style.todayPhotoImage);
				photoImage.image = target.articleData.photo;
				var photoTextLabel = Ti.UI.createLabel(style.todayPhotoTextLabel);
				photoTextLabel.text = target.articleData.text;
				var photoTimeLabel = Ti.UI.createLabel(style.todayPhotoTimeLabel);
				photoTimeLabel.text = target.articleData.date;
				photoView.add(photoImage);
				photoView.add(photoTextLabel);
				photoView.add(photoTimeLabel);
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
			}
*/
		});

		return photoRow;
	};

/*
	// photoImageの取得
	var getTodayPhotoImage = function() {
		Ti.API.debug('[func]getTodayPhotoImage:');

		var photoImage = Ti.UI.createImageView(style.profilePhotoImage);
	
		// フォトコレクションの取得
		model.getCloudPhotoCollection({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getCloudPhotoCollection.callback:');
			if (e.success) {
				for (var i = 0; i < e.collections.length; i++) {
					var collection = e.collections[i];
					if (collection.name == 'post') {
						// フォト数の更新
						_userData.photo = collection.counts.total_photos;

						// カバー写真の更新
						if (_userData.photo > 0) {
							var coverIndex = Math.floor(Math.random() * _userData.photo);
							model.getCloudPhoto({
								collection: collection.id,
								page: coverIndex+1,
								count: 1
							}, function(e) {
								Ti.API.debug('[func]getCloudPhoto.callback:');
								if (e.success) {
									if (e.photos) {
										photoImage.image = e.photos[0].urls.original;
									}
								} else {
									util.errorDialog(e);
								}
							});
						}

					// LikeがAPIでサポートされてないのでPhotoCollectionsを使わずReviewsから取得
					} else if (collection.name == 'like') {
						_userData.like = collection.counts.total_photos;
						countLikeLabel.text = _userData.like;

					}
				}

			} else {
				util.errorDialog(e);
			}
		});

		return photoImage;
	};
*/
/*
	// photoRowの取得
	var getTodayCameraRow = function(_articleData) {
		Ti.API.debug('[func]getTodayCameraRow:');

		var photoRow = Ti.UI.createTableViewRow(style.todayTableRow);
		photoRow.height = (Ti.Platform.displayCaps.platformHeight - 88 - 148 - 20) + 'dp';
		var photoView = Ti.UI.createView(style.todayPhotoView);
		photoRow.add(photoView);
		photoView.add(getTodayPhotoImage());

		// 今日の投稿が既にされている場合
		if (_articleData) {
			var fileName = _userData.id + "_" + now.today;
			
//			model.deleteLocalImage(util.local.photoPath, fileName);

			var photoImage = Ti.UI.createImageView(style.todayPhotoImage);
			// ローカルに投稿写真が保存されてる場合
			if (model.checkLocalImage(util.local.photoPath, fileName)) {
				photoImage.image = util.local.photoPath + fileName + '.png';
			} else {
				photoImage.image = _articleData.photo;

				model.loadCloudImage(_articleData.photo, function(e) {
					Ti.API.debug('[func]loadCloudImage.callback:');
					if (e.success) {
						model.saveLocalImage(e.image, util.local.photoPath, fileName);
					} else {
						util.errorDialog(e);
					}
				});

			}
//			photoView.add(photoImage);

	
		// 今日の投稿がまだの場合
		} else {
			var cameraImage = Ti.UI.createImageView(style.todayCameraImage);
//			photoView.add(cameraImage);
	
			// cameraImageをクリック
			cameraImage.addEventListener('click',function(e){
				Ti.API.debug('[event]cameraImage.click:');
				// 多重クリック防止
				cameraImage.touchEnabled = false;
				cameraImage.opacity = 0.5;
				var dialog = Titanium.UI.createOptionDialog({
					options:['撮影する', 'アルバムから選ぶ', 'キャンセル'],
					cancel:2
//					title:'写真を添付'
				});
				dialog.show();

				dialog.addEventListener('click',function(e) {
					Ti.API.debug('[event]dialog.click:');
					cameraImage.touchEnabled = true;
					switch( e.index ) {
						case 0:
							var cameraWin = win.createCameraWindow('photo_camera', _userData);
							cameraWin.prevWin = todayWin;
							win.openTabWindow(cameraWin, {animated:true});
							cameraImage.opacity = 1.0;
							break;
						case 1:
							var cameraWin = win.createCameraWindow('photo_select', _userData);
							cameraWin.prevWin = todayWin;
							win.openTabWindow(cameraWin, {animated:true});
							cameraImage.opacity = 1.0;
							break;
						case 2:
							cameraImage.opacity = 1.0;
							break;
					}
				});
			});			
		}
		return photoRow;
	};
*/
	// StampRowの取得
	var getTodayStampRow = function(_stampList) {
		Ti.API.debug('[func]getTodayStampRow:');
		// スタンプの表示
		var stampScrollView = Ti.UI.createScrollView(style.todayStampScrollView);
		stampScrollView.top = 74 + (style.commonSize.screenWidth * 3 / 4) - textBottom;

		for (var i=0; i<_stampList.length; i++) {
			var stampView = Ti.UI.createView(style.todayStampView);
			stampView.backgroundColor = '#eeeeee';
			stampScrollView.add(stampView);
			var stampImage = Ti.UI.createImageView(style.todayStampImage);
			stampView.add(stampImage);
			stampImage.image = 'images/icon/' + _stampList[i].stamp + '.png';
			stampView.stamp = _stampList[i].stamp;

			// スタンプボタンをクリック
			stampView.addEventListener('click',function(e){
				Ti.API.debug('[event]stampView.click:');
				var target = e.source;
				if (target.objectName == 'todayStampView') {					
					// 多重クリック防止
					target.touchEnabled = false;
					target.opacity = 0.5;
					// 日時の更新
					var nowDate = new Date();
					now = util.getDateElement(nowDate);
					now.weekday = util.diary.weekday[nowDate.getDay()];
					now.today = util.getFormattedDate(nowDate);					

					var stampData = {
						no: null,
						event: null,
						user: _userData.id,
						stamp: target.stamp,
						textList: [''],
						year: now.year,
						month: now.month,
						day: now.day,
						hour: now.hour,
						all: null,
						report: null,
						date: null,
					};

					var type = "today";
					var postWin = win.createStampPostWindow(type, _userData, [stampData]);
					postWin.prevWin = todayWin;
					win.openTabWindow(postWin, {animated:true});
					target.touchEnabled = true;
					target.opacity = 1.0;
				}
			});

		}

		// 余白分
		var spaceView = Ti.UI.createView(style.todaySpaceView);
		stampScrollView.add(spaceView);

//		return stampRow;
		return stampScrollView;
	};

	// ビューの更新
	var updateTableView = function() {
		Ti.API.debug('[func]updateTableView:');
		var rowList = [];
		// 日時の更新
		var nowDate = new Date();
		now = util.getDateElement(nowDate);
		now.weekday = util.diary.weekday[nowDate.getDay()];
		now.today = util.getFormattedDate(nowDate);

/*
		// 今日のスタンプデータ取得
		var todayStampList = model.getLocalStampList({
			userId: _userData.id,
			year: now.year,
			month: now.month,
			day: now.day
		});
		
		// 表示スタンプの作成
		var stampList = [];
		var stampTodayList = model.getStampTodayList();
		for (var i=0; i<stampTodayList.length; i++) {
			// リストの一番目を表示
			stampList.push({todayFlag:false, stamp:stampTodayList[i].stampList[0]});
			for (var j=0; j<todayStampList.length; j++) {
				if (stampTodayList[i].stampList.indexOf(todayStampList[j].stamp) != -1) {
					stampList[i].todayFlag = true;
					stampList[i].stamp = todayStampList[j].stamp;
				}
			}			
		}
*/		

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
		var articleData = null;
		if(articleList.length > 0) {
			articleData = articleList[0];
		}
		// メニューの取得
		rowList.push(getTodayMenuRow(articleData));

		// 記事数の取得
		articleData = null;
		var countLocalArticleList = model.getCountLocalArticleList(_userData.id);
		if (countLocalArticleList > 0) {
			// ランダム記事データ取得
			articleList = model.getLocalRandomArticle({
				userId: _userData.id, 
				user: _userData.user, 
				name: _userData.name, 
				icon: _userData.icon, 
				limit: 1,
				offset: Math.floor(Math.random() * countLocalArticleList) + 1
			});
			articleData = articleList[0];
		}
		if (articleData == null) {
			articleData = {
				photo: 'images/photo/A0001.jpg',
				text: '写真がない時に表示',
				date: '20XX-XX-XX'
			};
		}
		// 今日のわんこ取得
		rowList.push(getTodayPhotoRow(articleData));

		// スタンプの表示
		var stampList = model.getStampTodayList();
		todayWin.add(getTodayStampRow(stampList));

		// スタンプの表示
//		rowList.push(getTodayStampRow(stampList.slice(3,6)));

/*	
		// 写真の表示
		var photoTodayList = model.getPhotoTodayList();
		// 記事数の取得
		var countLocalArticleList = model.getCountLocalArticleList(_userData.id);
		// ランダム取得の開始位置
		var position = 1;
		if (countLocalArticleList > photoTodayList.length) {
			position = Math.floor(Math.random() * (countLocalArticleList - photoTodayList.length)) + 1;
		}
		// ランダム記事データ取得
		var articleList = model.getLocalRandomArticle({
			userId: _userData.id, 
			user: _userData.user, 
			name: _userData.name, 
			icon: _userData.icon, 
			limit: photoTodayList.length,
			offset: position
		});
		
		var photoList = [];
		for (var i=0; i<photoTodayList.length; i++) {
			// リストの一番目を表示
			photoList.push({articleData:null, photo:photoTodayList[i].photo});
			if (articleList.length > i) {
				photoList[i].articleData = articleList[i];
				photoList[i].photo = articleList[i].photo;
			}
		}

		// 写真の表示
		rowList.push(getTodayPhotoRow(photoList.slice(0,3)));

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
		var articleData = null;
		if(articleList.length > 0) {
			articleData = articleList[0];
		}
		
		if (articleData && articleData.photo == "") {
			model.getCloudArticlePost({
				userId: _userData.id,
				postId: articleData.id,
			}, function(e) {
				Ti.API.debug('[func]getCloudArticlePost.callback:');
				if (e.success) {
					if (e.photo) {
						model.addLocalArticlePhoto({post:articleData.id, photo:e.photo});
					}
		
				} else {
					util.errorDialog(e);
				}
			});
		}
	
		// 写真の表示
		rowList.push(getTodayPhotoRow(photoList.slice(3,6)));
*/
		todayTableView.setData(rowList);

	};

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

// ---------------------------------------------------------------------
	var todayWin = Ti.UI.createWindow(style.todayWin);
	// タイトルの表示
	var todayTitle = Ti.UI.createLabel(style.todayTitleLabel);	
	todayWin.titleControl = todayTitle;

	// カレンダーボタン
	var calendarButton = Titanium.UI.createButton(style.todayCalendarButton);
	todayWin.rightNavButton = calendarButton;

	var todayTableView = Ti.UI.createTableView(style.todayTableView);
	todayTableView.headerPullView = getTableHeader();
	todayWin.add(todayTableView);

	// ビューの更新
	updateTableView();

// ---------------------------------------------------------------------
	// カレンダーボタン
	calendarButton.addEventListener('click', function(e){
		Ti.API.debug('[event]calendarButton.click:');
		var type = "search";
		var calendarWin = win.createCalendarWindow(_userData);
		calendarWin.prevWin = todayWin;
//		win.openTabWindow(calendarWin, {animated:true});
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
	});

	// 更新用イベント
	todayWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]todayWin.refresh:');
		// ビューの更新
//		todayTableView.data = [];
//		updateTableView();

		todayWin.dayView.add(getDayLabelView());

		// 日時の更新
		var nowDate = new Date();
		now = util.getDateElement(nowDate);
		now.weekday = util.diary.weekday[nowDate.getDay()];
		now.today = util.getFormattedDate(nowDate);

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
		if(articleList.length > 0) {
			todayWin.cameraView.opacity = 0.3;
			todayWin.cameraView.touchEnabled = false;
		} else {
			todayWin.cameraView.opacity = 1.0;
			todayWin.cameraView.touchEnabled = true;			
		}

	});

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
				// ビューの更新
//				todayTableView.data = [];
//				updateTableView();
				todayWin.dayView.add(getDayLabelView());

				// 日時の更新
				var nowDate = new Date();
				now = util.getDateElement(nowDate);
				now.weekday = util.diary.weekday[nowDate.getDay()];
				now.today = util.getFormattedDate(nowDate);
		
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
				if(articleList.length > 0) {
					todayWin.cameraView.opacity = 0.3;
					todayWin.cameraView.touchEnabled = false;
				} else {
					todayWin.cameraView.opacity = 1.0;
					todayWin.cameraView.touchEnabled = true;			
				}

	        }, 2000);
	    }
	});

	return todayWin;
};


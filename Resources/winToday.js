// トップ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winToday.createWindow:');

	// 日時の更新
	var now = null;
	var tmpDate = null;
	// 多重クリック防止
	var clickEnable = true;
	var slideEnable = true;

	// フォト用追加フラグ
	var addRowFlag = false;
	// フォト用追加サイズ
	// 全体の幅（写真のサイズ）ー全体の高さーステータスバー(20)ータイトルバー(44)ースタンプリスト(45*3)ーメニュー(74)ー下のタブ(44)
	var spaceHeight = style.commonSize.screenHeight - 317;
	var photoHeight = (style.commonSize.screenWidth - spaceHeight > 0) ? spaceHeight : style.commonSize.screenWidth;
	var addHeight = style.commonSize.screenWidth - photoHeight;
	// メニューに表示するスタンプリスト
	var selectStampList = model.getStampTimeSelectList();
	// メニューに表示するページ
	var todayMenuPage = 0;
	// 記事リスト
	var todayArticleList = [];
	var todayIndex = null;

// ---------------------------------------------------------------------

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

	// 最新の記事を取得
	var getArticleList = function(lastDate) {
		Ti.API.debug('[func]getArticleList:');
		var articleList = null;
		var articleLimit = 3;
		if (lastDate == null) {
			// 最新の記事データ取得
			articleList = model.getLocalArticle({
				userId:_userData.id, 
				user:_userData.user, 
				name:_userData.name, 
				icon:_userData.icon, 
				limit: articleLimit
			});
			
		} else {
			// 最新の記事データ取得
			articleList = model.getLocalArticle({
				userId:_userData.id, 
				user:_userData.user, 
				name:_userData.name, 
				icon:_userData.icon, 
				limit: articleLimit,
				lastDate: lastDate
			});
		}
		return articleList;
	};

	// menuViewの取得
	var getTodayMenuView = function() {
		Ti.API.debug('[func]getTodayMenuView:');

		var menuScrollView = Ti.UI.createScrollView(style.todayMenuScrollView);

/*
		var menuFrameView = Ti.UI.createView(style.todayMenuFrameView);
		menuScrollView.add(menuFrameView);
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
		menuScrollView.dayLabel = dayLabel;
		var weekdayLabel = Ti.UI.createLabel(style.todayWeekdayLabel);
		dayLabelView.add(weekdayLabel);
//		weekdayLabel.text = now.weekday.text;
//		weekdayLabel.color = now.weekday.color;
		menuScrollView.weekdayLabel = weekdayLabel;
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
			menuScrollView.add(menuStampView);
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

			// スタンプボタンをクリック
			menuStampListView.addEventListener('click',function(e){
				Ti.API.debug('[event]menuStampListView.click:');
				var target = e.source;
				if (target.objectName == 'todayStampSelectView') {
					// 多重クリック防止
					if (clickEnable) {
						clickEnable = false;
						target.opacity = 0.5;
						// 日時の更新
						updateTodayDay();
			
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
	
						clickEnable = true;
						target.opacity = 1.0;
					}
				}
			});
		}

		return menuScrollView;
	};

	// フォトの表示
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
		dayPhotoView.addEventListener('click',function(e){
			Ti.API.debug('[event]dayPhotoView.click:');
			if (todayWin.noDataView.visible) {
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

			} else {
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
		
		return dayPhotoView;
	};

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

	// 写真の更新
	var updateTodayPhoto = function() {
		Ti.API.debug('[func]updateTodayPhoto:');
		// 写真の取得
//		var todayArticle = getTodayArticle();
		todayArticleList = getArticleList();
		var todayArticle = null;
		todayIndex = null;
		// 最新記事が今日の記事かチェック
		var latestDate = util.getDateElement(todayArticleList[0].date);
		if (latestDate.year == now.year && latestDate.month == now.month && latestDate.day == now.day) {
			todayArticle = articleList[0];
			todayIndex = 0;
		}

//		todayArticle = articleList[0];

		if (todayArticle) {
			todayWin.noDataView.visible = false;
			todayWin.photoRow.backgroundColor = 'transparent';
//			todayWin.photoImage.visible = true;
//			todayWin.photoImage.image = getTodayPhotoImage(todayArticle);
			todayPhotoImage.visible = true;
			todayPhotoImage.image = getTodayPhotoImage(todayArticle);
			todayPhotoImage.articleData = todayArticle;

		} else {
			todayWin.noDataView.visible = true;
			todayWin.photoRow.backgroundColor = '#eeeeee';
//			todayWin.photoImage.visible = false;
			todayPhotoImage.visible = false;
			todayPhotoImage.articleData = null;
		}

/*
			// 写真の取得
			var todayDate = new Date(now.year, now.month-1, now.day);
			model.getCloudTodayArticle({
				idList: [_userData.id],
				date: todayDate,
				page: 1,
				count: 1
			}, function(e) {
				Ti.API.debug('[func]getCloudTodayArticle.callback:');
				if (e.success) {
					if (e.articleList.length > 0) {
						// ローカルDBに登録
						model.addLocalArticleList(e.articleList);
						todayWin.noDataView.visible = false;
						todayWin.photoRow.backgroundColor = 'transparent';
//						todayWin.photoImage.visible = true;
//						todayWin.photoImage.image = e.articleList[0].photo;
						todayPhotoImage.visible = true;
						todayPhotoImage.image = e.articleList[0].photo;
						todayPhotoImage.articleData = e.articleList[0];

					} else {
						todayWin.noDataView.visible = true;
						todayWin.photoRow.backgroundColor = '#eeeeee';
//						todayWin.photoImage.visible = false;
						todayPhotoImage.visible = false;
						todayPhotoImage.articleData = null;
					}
		
				} else {
					util.errorDialog(e);
				}
			});
*/
	};

	// 日付の更新
	var updateTodayDay = function(date) {
		Ti.API.debug('[func]updateTodayDay:');
		var todayDate = null;
		if (now == null) {
			todayDate = new Date();
			now = util.getDateElement(todayDate);
			now.weekday = util.diary.weekday[todayDate.getDay()];
		} else {
			if (date == null) {
				todayDate = new Date();
				now = util.getDateElement(todayDate);
				now.weekday = util.diary.weekday[todayDate.getDay()];
			} else {
				var 
				todayDate = util.getDate(date);
			}
			todayWin.dayLabel.text = (todayDate.getMonth() + 1) + '/' + todayDate.getDate();
			todayWin.weekLabel.text = util.diary.weekday[todayDate.getDay()].text + '曜日';
		}

/*
		now.today = util.getFormattedDate(nowDate);
		todayMenuView.dayLabel.text = now.month + '/' + now.day;
		todayMenuView.weekdayLabel.text = now.weekday.text;
		todayMenuView.weekdayLabel.color = now.weekday.color;
*/
	};

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

	// 今日のフォト・スタンプリストの表示
	var getTodayRowList = function() {
		Ti.API.debug('[func]getTodayRowList:');

		// フォトの表示
		var rowList = [];
		var photoRow = Ti.UI.createTableViewRow(style.todayPhotoTableRow);
		rowList.push(photoRow);
		photoRow.add(getDayPhotoView());
		todayWin.photoRow = photoRow;

		// スワイプで前後の記事を表示
		photoRow.addEventListener('swipe',function(e){
			Ti.API.debug('[event]photoRow.swipe:');
			// 多重クリック防止
			if (clickEnable) {
				clickEnable = false;
				if (todayArticleList.length > 0) {
					if (todayIndex == null) {
						if (e.direction == 'right') {
							todayIndex = 0;
							todayWin.noDataView.visible = false;
							todayWin.photoRow.backgroundColor = 'transparent';
							todayPhotoImage.visible = true;
							todayPhotoImage.image = getTodayPhotoImage(todayArticleList[todayIndex]);
							todayPhotoImage.articleData = todayArticleList[todayIndex];
							updateTodayDay(todayArticleList[todayIndex].date);
						}
	
					} else {
						if (e.direction == 'right') {
							if (todayArticleList.length > todayIndex + 1) {
								todayIndex++;
								todayPhotoImage.image = getTodayPhotoImage(todayArticleList[todayIndex]);
								todayPhotoImage.articleData = todayArticleList[todayIndex];
								updateTodayDay(todayArticleList[todayIndex].date);

							} else {
								var lastDate = todayArticleList[todayArticleList.length-1].date;
								var nextList = getArticleList(lastDate);
								// 日付を条件にデータを取得する場合、同じ日付で重複する可能性があるためチェック
								if (nextList[0].id == todayArticleList[todayArticleList.length-1].id) {
									nextList[0].shift();
								}
								if (nextList.length > 0) {
									for (var i=0; i<nextList.length; i++) {
										todayArticleList.push(nextList[i]);
									}
									todayIndex++;
									todayPhotoImage.image = getTodayPhotoImage(todayArticleList[todayIndex]);
									todayPhotoImage.articleData = todayArticleList[todayIndex];
									updateTodayDay(todayArticleList[todayIndex].date);
								}
							}
		
						} else if (e.direction == 'left') {
							if (todayIndex == 0) {
								todayIndex = null;
								todayWin.noDataView.visible = true;
								todayWin.photoRow.backgroundColor = '#eeeeee';
								todayPhotoImage.visible = false;
								todayPhotoImage.articleData = null;
								updateTodayDay();
	
							} else {
								todayIndex--;
								todayPhotoImage.image = getTodayPhotoImage(todayArticleList[todayIndex]);
								todayPhotoImage.articleData = todayArticleList[todayIndex];
								updateTodayDay(todayArticleList[todayIndex].date);
							}
	
						}					
					}				
				}
				clickEnable = true;
			}
		});
		
		// スタンプの取得
		var stampList = model.getLocalStampList({
			userId: _userData.id,
			year: now.year,
			month: now.month,
			day: now.day
		});

//		if (stampList.length > 0) {
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
						todayMenuView.scrollTo(style.commonSize.screenWidth * target.listNo, 0);
						todayMenuPage = target.listNo;
						// opacityの表示を見せるため
				        setTimeout(function(){
							target.opacity = 1.0;
							clickEnable = true;
				        }, 200);
					}
				});
			}
//		}

		return rowList;
	};

	// 今日のデータ更新
	var updateTodayTable = function() {
		Ti.API.debug('[func]updateTodayTable:');
		// 日付の更新
		updateTodayDay();
		// 今日のフォト・スタンプリストの表示
		todayTableView.setData(getTodayRowList());
		// 写真の更新
		updateTodayPhoto();
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
	// フォトの表示
	var todayPhotoImage = Ti.UI.createImageView(style.todayPhotoImage);		
	todayWin.add(todayPhotoImage);
//	todayWin.photoImage = photoImage;
	// 日付用
	var photoCoverView = Ti.UI.createView(style.todayPhotoCoverView);		
	todayWin.add(photoCoverView);
	// 写真・スタンプの表示
	var todayTableView = Ti.UI.createTableView(style.todayTableView);
	todayTableView.headerPullView = getTableHeader();
	todayWin.add(todayTableView);
	// メニューの表示
	var todayMenuView = getTodayMenuView();
	todayWin.add(todayMenuView);
	// 今日の内容を更新
	updateTodayTable();

// ---------------------------------------------------------------------
	// 更新用イベント
	todayWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]todayWin.refresh:');
		// 日が変わった場合
		var nowDate = new Date();
		if (nowDate.getFullYear() != now.year || nowDate.getMonth() != now.month-1 || nowDate.getDate() != now.day) {
			todayTableView.data = [];
			todayWin.remove(todayMenuView);
			todayMenuView = getTodayMenuView();
			todayWin.add(todayMenuView);
			updateTodayTable();

		} else {
			// メニューをトップに戻す
			todayMenuView.scrollTo(0, 0);
			todayMenuPage = 0;

			if (e.articleData) {
				// フォトの差し替え
				todayWin.noDataView.visible = false;
				todayWin.photoRow.backgroundColor = 'transparent';
//				todayWin.photoImage.visible = true;
//				todayWin.photoImage.image = getTodayPhotomage(e.articleData);
				todayPhotoImage.visible = true;
				todayPhotoImage.image = getTodayPhotoImage(e.articleData);
				todayPhotoImage.articleData = e.articleData;
	
			} else if (e.diaryData) {
				// 今日のフォト・スタンプリストの表示
				todayTableView.data = [];
				todayTableView.setData(getTodayRowList());
//				if (todayWin.photoImage.visible == false) {
				if (todayPhotoImage.visible == false) {
					todayWin.noDataView.visible = true;					
				}
			}
		}

		// 更新処理の後でタブの切り替え
		if (e.activeTab) {
			tabGroup.activeTab = e.activeTab;
		}
	});

	// 右スワイプでメニュートップに戻す
	todayMenuView.addEventListener('swipe',function(e){
		Ti.API.debug('[event]todayMenuView.swipe:');
		if (e.direction == 'right' && todayMenuPage > 0) {
			todayMenuPage--;
		} else if (e.direction == 'left' && todayMenuPage < selectStampList.length) {
			todayMenuPage++;
		}
		
		todayMenuView.scrollTo(style.commonSize.screenWidth * todayMenuPage, 0);	
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
	        	todayWin.fireEvent('refresh');
	        }, 2000);
	    }
	});

	return todayWin;
};


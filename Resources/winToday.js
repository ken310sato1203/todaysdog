// トップ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winToday.createWindow:');

	// 日時の更新
	var now = null;
	var tmpDate = null;
	// 多重クリック防止
	var clickEnable = true;
	// フォト用追加フラグ
	var addRowFlag = false;
	// フォト用追加サイズ
	// 全体の幅（写真のサイズ）ー全体の高さーステータスバー(20)ータイトルバー(44)ースタンプリスト(45*3)ーメニュー(74)ー下のタブ(44)
	var spaceHeight = style.commonSize.screenHeight - 317;
	var photoHeight = (style.commonSize.screenWidth - spaceHeight > 0) ? spaceHeight : style.commonSize.screenWidth;
	var addHeight = style.commonSize.screenWidth - photoHeight;
	// メニューに表示するスタンプリスト
	var stampSelectList = null;
	// メニューに表示するページ
	var currentMenu = 0;

// ---------------------------------------------------------------------

	// dayLabelViewの取得
	var getDayLabelView = function() {
		Ti.API.debug('[func]getDayLabelView:');

		// 日付
		var dayLabelView = Ti.UI.createView(style.todayDayLabelView);
//		var dayLabelView = Ti.UI.createView(style.todayDayView);
		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayLabelView.add(dayLabel);
		dayLabel.text = now.month + '/' + now.day;
//		dayLabel.text = now.month + '/' + now.day + '(' + now.weekday.text + ')';
//		dayLabel.text = Math.floor(Math.random() * 10);

		var weekdayLabel = Ti.UI.createLabel(style.todayWeekdayLabel);
		dayLabelView.add(weekdayLabel);
		weekdayLabel.text = now.weekday.text;
		weekdayLabel.color = now.weekday.color;

/*
		// 天気取得
		var http = Titanium.Network.createHTTPClient();
		http.open("GET", "http://rss.weather.yahoo.co.jp/rss/days/4410.xml");
		http.onload = function() {
			var doc = this.responseXML.documentElement;
			var descriptions = doc.getElementsByTagName("description");
			var weather = descriptions.item(1).text;
			var weatherLabel = Ti.UI.createLabel(style.todayDayLabel);
			weatherLabel.text = weather.substring(0, weather.indexOf(' - '));
			dayLabelView.add(weatherLabel);
		};
		http.send();
*/

		return dayLabelView;
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

	// menuViewの取得
	var getTodayMenuView = function() {
		Ti.API.debug('[func]getTodayMenuView:');

		var menuScrollView = Ti.UI.createScrollView(style.todayMenuScrollView);
		var menuFrameView = Ti.UI.createView(style.todayMenuFrameView);
		menuScrollView.add(menuFrameView);
		var menuListView = Ti.UI.createView(style.todayMenuListView);
		menuFrameView.add(menuListView);

		// カメラの表示
		var cameraView = Ti.UI.createView(style.todayCameraView);
		menuListView.add(cameraView);
		var cameraImage = Ti.UI.createImageView(style.todayCameraImage);
		cameraView.add(cameraImage);

		// カメラをクリック
		cameraView.addEventListener('click',function(e){
			Ti.API.debug('[event]cameraView.click:');
			var target = e.source;
			// 多重クリック防止
			if (clickEnable) {
				clickEnable = false;
				target.opacity = 0.5;

				// 日時の更新
				var nowDate = new Date();
				now = util.getDateElement(nowDate);
				now.weekday = util.diary.weekday[nowDate.getDay()];
				now.today = util.getFormattedDate(nowDate);
	
				if ( getTodayArticle() ) {
					var alertDialog = Titanium.UI.createAlertDialog({
						title: '写真の投稿は１日１枚です。\nまた明日。',
						buttonNames: ['OK'],
					});
					alertDialog.show();
					alertDialog.addEventListener('click',function(alert){
						clickEnable = true;
						target.opacity = 1.0;
					});
	
				} else {
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
			}
		});		

		// 日付の表示
		var dayLabelView = Ti.UI.createView(style.todayDayLabelView);
		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayLabelView.add(dayLabel);
		dayLabel.text = now.month + '/' + now.day;
		var weekdayLabel = Ti.UI.createLabel(style.todayWeekdayLabel);
		dayLabelView.add(weekdayLabel);
		weekdayLabel.text = now.weekday.text;
		weekdayLabel.color = now.weekday.color;
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

		var selectStampList = model.getStampSelectList();
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
						var nowDate = new Date();
						now = util.getDateElement(nowDate);
						now.weekday = util.diary.weekday[nowDate.getDay()];
						now.today = util.getFormattedDate(nowDate);
			
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
		dayPhotoView.add(noDataView);
		todayWin.noDataView = noDataView;		
		var noDataLabel = Ti.UI.createLabel(style.todayNoDataLabel);
		noDataView.add(noDataLabel);
		var noDataImage = Ti.UI.createImageView(style.todayNoDataImage);
		noDataView.add(noDataImage);

		// 日付
		var dayLWeekView = Ti.UI.createView(style.todayDayWeekView);
		var dayWeekLabel = Ti.UI.createLabel(style.todayDayWeekLabel);
		dayLWeekView.add(dayWeekLabel);
		dayWeekLabel.text = now.month + '/' + now.day + '(' + now.weekday.text + ')';
		dayPhotoView.add(dayLWeekView);
		
		return dayPhotoView;
	};

	// 写真の取得
	var getTodayPhotoImage = function(_articleData) {
		Ti.API.debug('[func]getTodayPhotoImage:');

		var photoImage = null;
		var fileName = _userData.id + "_" + _articleData.date.substring(0,10);
		// ローカルに投稿写真が保存されてる場合
		if (model.checkLocalImage(util.local.photoPath, fileName)) {
			photoImage = util.local.photoPath + fileName + '.png';
		} else {
			if (_articleData.photo == '') {
				// 記事の取得
				model.getCloudArticlePost({
					postId: _articleData.id
				}, function(e) {
					Ti.API.debug('[func]getCloudArticlePost.callback:');
					if (e.success) {
						photoImage = e.photo;
						model.updateLocalArticlePhoto({
							postId: _articleData.id,
							photo: e.photo
						});
					} else {
						util.errorDialog(e);
					}
				});
			} else {
				photoImage = _articleData.photo;			
			}
		}
		
		return photoImage;
	};

	// 写真の更新
	var updateTodayPhoto = function() {
		Ti.API.debug('[func]updateTodayPhoto:');
		// 写真の取得
		var todayArticle = getTodayArticle();
//		todayArticle = 1;
		if (todayArticle) {
			todayWin.noDataView.visible = false;
			todayWin.photoRow.backgroundColor = 'transparent';
			todayWin.photoImage.visible = true;
			todayWin.photoImage.image = getTodayPhotoImage(todayArticle);

		} else {
			todayWin.noDataView.visible = true;
			todayWin.photoRow.backgroundColor = '#eeeeee';
			todayWin.photoImage.visible = false;
		}
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

		// フォトをクリック
		photoRow.addEventListener('click',function(e){
			Ti.API.debug('[event]photoRow.click:');
			// 写真が表示されている場合
			if (todayWin.photoImage.visible) {
				// 多重クリック防止
				if (clickEnable) {
					clickEnable = false;
					if (addRowFlag) {
						addRowFlag = false;
						todayTableView.deleteRow(0, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
	
					} else {
						if (addHeight > 0) {
							addRowFlag = true;
							var photoAddRow = Ti.UI.createTableViewRow(style.todayPhotoAddTableRow);
							photoAddRow.height = addHeight;
							todayTableView.insertRowBefore(0, photoAddRow, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			
							// 写真をクリック
							photoAddRow.addEventListener('click',function(e){
								Ti.API.debug('[event]photoAddRow.click:');
								if (addRowFlag) {
									addRowFlag = false;
									todayTableView.deleteRow(0, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
								}
							});
						}

					}
					clickEnable = true;
				}
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
			stampSelectList = model.getStampSelectList();
			for (var i=0; i<stampSelectList.length; i++) {
				var groupListView = Ti.UI.createView(style.todayStampListView);
				var groupLabel = Ti.UI.createLabel(style.todayStampLabel);
				groupLabel.text = stampSelectList[i].title;
				groupListView.add(groupLabel);
				groupListView.listNo = i+1;

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
						currentMenu = target.listNo;
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
		var nowDate = new Date();
		now = util.getDateElement(nowDate);
		now.weekday = util.diary.weekday[nowDate.getDay()];
		now.today = util.getFormattedDate(nowDate);
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
	var photoImage = Ti.UI.createImageView(style.todayPhotoImage);		
	todayWin.add(photoImage);
	todayWin.photoImage = photoImage;
	// 写真・スタンプの表示
	var todayTableView = Ti.UI.createTableView(style.todayTableView);
//	todayTableView.headerPullView = getTableHeader();
	todayWin.add(todayTableView);
	updateTodayTable();
	// メニューの表示
	var todayMenuView = getTodayMenuView();
	todayWin.add(todayMenuView);

// ---------------------------------------------------------------------
	// 更新用イベント
	todayWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]todayWin.refresh:');
		// 日が変わった場合
		var nowDate = new Date();
		if (nowDate.getFullYear() != now.year || nowDate.getMonth() != now.month-1 || nowDate.getDate() != now.day) {
			todayTableView.data = [];
			updateTodayTable();
			todayWin.remove(todayMenuView);
			todayMenuView = getTodayMenuView();
			todayWin.add(todayMenuView);

		} else {
			// メニューをトップに戻す
			todayMenuView.scrollTo(0, 0);
			if (e.articleData) {
				// フォトの差し替え
				todayWin.noDataView.visible = false;
				todayWin.photoRow.backgroundColor = 'transparent';
				todayWin.photoImage.visible = true;
				todayWin.photoImage.image = getTodayPhotoImage(e.articleData);
	
			} else if (e.diaryData) {
				// 今日のフォト・スタンプリストの表示
				todayTableView.data = [];
				todayTableView.setData(getTodayRowList());
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
		if (e.direction == 'right' && currentMenu > 0) {
			currentMenu--;
		} else if (e.direction == 'left' && currentMenu < stampSelectList.length) {
			currentMenu++;
		}
		todayMenuView.scrollTo(style.commonSize.screenWidth * currentMenu, 0);	
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


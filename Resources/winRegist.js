// ユーザ登録

exports.createWindow = function(_type){
	Ti.API.debug('[func]winRegist.createWindow:');
	Ti.API.debug('_type:' + _type);

// ---------------------------------------------------------------------

	var registWin = Ti.UI.createWindow(style.registWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.registTitleLabel);	
	registWin.titleControl = titleLabel;

	var listView = Ti.UI.createView(style.registListView);
	registWin.add(listView);

	// 名前のフィールドを表示
	var nameView = Ti.UI.createView(style.registListItemView);
	nameView.top = '4dp';
	nameView.objectName = 'name';
	listView.add(nameView);
	var nameLabel = Ti.UI.createLabel(style.registListItemLabel);
	nameLabel.text = 'メールアドレス';
	var nameField = Ti.UI.createTextField(style.registListValueField);
	nameField.returnKeyType = Ti.UI.RETURNKEY_NEXT;
	nameField.maxLength = 200;
	nameField.objectName = 'name';
	nameView.add(nameLabel);
	nameView.add(nameField);

	// 名前フィールドのチェック
	var checkNameField = function() {
		Ti.API.debug('[func]checkNameField:');
		if (nameField.value != '') {
			nameLabel.hide();
		} else {
			nameLabel.show();
		}
	};
	nameField.addEventListener('click',function(e){
		Ti.API.debug('[event]nameField.click:');
		nameLabel.hide();
	});
	nameField.addEventListener('return',function(e){
		Ti.API.debug('[event]nameField.return:');
		passField.focus();
	});
	nameField.addEventListener('blur',function(e){
		Ti.API.debug('[event]nameField.blur:');
		checkNameField();
	});

	// パスワードのフィールドを表示
	var passView = Ti.UI.createView(style.registListItemView);
	passView.objectName = 'pass';
	if (_type == 'regist') {
		listView.add(passView);
	}
	var passLabel = Ti.UI.createLabel(style.registListItemLabel);
	passLabel.text = 'パスワード（6文字以上）';
	var passField = Ti.UI.createTextField(style.registListValueField);
	passField.maxLength = 50;
	passField.objectName = 'pass';
	passView.add(passLabel);
	passView.add(passField);

	// パスワードフィールドのチェック
	var checkPassField = function() {
		Ti.API.debug('[func]checkPassField:');
		if (passField.value != '') {
			passLabel.hide();
		} else {
			passLabel.show();
		}
	};
	passField.addEventListener('focus',function(e){
		Ti.API.debug('[event]passField.focus:');
		passLabel.hide();
	});
	passField.addEventListener('return',function(e){
		Ti.API.debug('[event]passField.return:');
		registView.fireEvent('click');
	});
	passField.addEventListener('blur',function(e){
		Ti.API.debug('[event]passField.blur:');
		checkPassField();
	});

	// 登録ボタンのフィールドを表示
	var registView = Ti.UI.createView(style.registListItemView);
	registView.top = '9dp';
	registView.backgroundColor = '#e74c3c';
	registView.objectName = 'regist';
	listView.add(registView);
	var registLabel = Ti.UI.createLabel(style.registListButtonItemLabel);
	registLabel.color = 'white';
	if (_type == 'regist') {
		registLabel.text = 'ユーザーを登録する';
	} else if (_type == 'reset') {
		registLabel.text = 'パスワードをリセットする';
	}
	registView.add(registLabel);

	registView.addEventListener('click',function(e){
		Ti.API.debug('[event]registView.click:');
			
		if (nameField.value == '' || nameField.value.indexOf('@') == -1) {
			util.alertDialog('メールアドレスを入力してください');
		} else if (_type == 'regist' && passField.value.length < 6) {
			util.alertDialog('パスワードは6文字以上入力してください');
		} else {

			var mailDialog = Titanium.UI.createAlertDialog({
				title: 'このメールアドレスでよろしいですか？',
				message: nameField.value,
				buttonNames: ['キャンセル','OK'],
				cancel: 1
			});
			mailDialog.show();
	
			mailDialog.addEventListener('click',function(alert){
				Ti.API.debug('[event]mailDialog.click:');						
				// OKの場合
				if(alert.index == 1){
					if (_type == 'regist') {
						var httpClient = Titanium.Network.createHTTPClient();
						httpClient.clearCookies('https://api.cloud.appcelerator.com');

						model.registCloudUser({
							email: nameField.value,
							username: nameField.value.substring(0,nameField.value.indexOf('@')),
							pass: passField.value
						}, function(e) {
							Ti.API.debug('[func]confirmCloudUser.callback:');
						    if (e.success) {
								var registCompleteDialog = Titanium.UI.createAlertDialog({
									message: 'メールアドレスにユーザ登録用のメールを送信したので、確認してください',
//									message: 'ユーザ登録が完了したので、ログインしてください',
									buttonNames: ['OK']
								});
								registCompleteDialog.show();
								registView.touchEnabled = false;
								backLabel.touchEnabled = false;
						
								registCompleteDialog.addEventListener('click',function(alert){
									Ti.API.debug('[event]registCompleteDialog.click:');
									registWin.prevWin.fireEvent('refresh', {email: nameField.value});
									registWin.close();
								});

						    } else {
						    	if (e.code == 400) {
							        util.alertDialog('このメールアドレスは既に登録済みです');
						    	} else if (e.code == 401) {
						    		// 同じセッションを使用しているためか、一度登録した後には、その登録の確認メールを処理するまでエラーになる
						    		// アプリを再起動するとエラーにはならない
							        util.alertDialog('前回登録したメールアドレスの確認中です、再度登録を行う場合は、一度このアプリを終了してください');
						    	} else {
							        util.errorDialog();
						    		
						    	}
						    }
						});

					} else if (_type == 'reset') {
						model.resetCloudPassword({
							email: nameField.value,
							username: nameField.value.substring(0,nameField.value.indexOf('@')),
						}, function(e) {
							Ti.API.debug('[func]resetCloudPassword.callback:');
						    if (e.success) {
								var resetCompleteDialog = Titanium.UI.createAlertDialog({
									message: 'メールアドレスにパスワード変更用のメールを送信したので、確認してください',
									buttonNames: ['OK']
								});
								resetCompleteDialog.show();
								registView.touchEnabled = false;
								backLabel.touchEnabled = false;
						
								resetCompleteDialog.addEventListener('click',function(alert){
									Ti.API.debug('[event]resetCompleteDialog.click:');
									registWin.prevWin.fireEvent('refresh', {email: nameField.value});
									registWin.close();
								});

						    } else {
						    	if (e.code == 400) {
							        util.alertDialog('このメールアドレスは登録されていません');
						    	} else if (e.code == 401) {
						    		// 同じセッションを使用しているためか、一度登録した後には、その登録の確認メールを処理するまでエラーになる
						    		// アプリを再起動するとエラーにはならない
							        util.alertDialog('前回登録したパスワードリセットの確認中です、再度リセットを行う場合は、一度このアプリを終了してください');
						    	} else {
							        util.errorDialog();
						    		
						    	}
						    }
						});
					}
				}
			});		
		}
	});

	// 戻る
	var backView = Ti.UI.createView(style.registListItemView);
	backView.backgroundColor = '#eeeeee';
	listView.add(backView);
	var backLabel = Ti.UI.createLabel(style.registListButtonItemLabel);
	backLabel.color = '#696969';
	if (_type == 'regist') {
		backLabel.text = '登録をやめる';
	} else if (_type == 'reset') {
		backLabel.text = 'リセットをやめる';
	}
	listView.add(backLabel);

	backLabel.addEventListener('click',function(e){
		Ti.API.debug('[event]backLabel.click:');
		registWin.close();
	});

	registWin.addEventListener('click',function(e){
		Ti.API.debug('[event]registWin.click:');
		nameField.blur();
		passField.blur();
	});

// ---------------------------------------------------------------------

	// 選択したフィールド名を保管
	var selectedName = null;

	return registWin;
};

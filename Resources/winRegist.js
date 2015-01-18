// ログイン

exports.createWindow = function(){
	Ti.API.debug('[func]winLogin.createWindow:');


// ---------------------------------------------------------------------

	var loginWin = Ti.UI.createWindow(style.registWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.registTitleLabel);	
	loginWin.titleControl = titleLabel;

	var listView = Ti.UI.createView(style.registListView);
	loginWin.add(listView);

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
	var passView = Ti.UI.createView(style.loginListItemView);
	passView.objectName = 'pass';
	listView.add(passView);
	var passLabel = Ti.UI.createLabel(style.loginListItemLabel);
	passLabel.text = 'パスワード';
	var passField = Ti.UI.createTextField(style.loginListValueField);
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
	registView.objectName = 'login';
	listView.add(registView);
	var registLabel = Ti.UI.createLabel(style.registListButtonItemLabel);
	registLabel.color = 'white';
	registLabel.text = 'ユーザーを登録する';
	registView.add(registLabel);

	registView.addEventListener('click',function(e){
		Ti.API.debug('[event]registView.click:');
		if (nameField.value == '' || nameField.value.indexOf('@') == -1) {
			util.alertDialog('メールアドレスを入力してください');
		} else if (passField.value.length < 6) {
			util.alertDialog('パスワードは6文字以上入力してください');
		} else {
			model.registCloudUser({
				email: nameField.value,
				username: nameField.value,
				pass: passField.value
			}, function(e) {
				Ti.API.debug('[func]confirmCloudUser.callback:');
			    if (e.success) {
			        alert('ユーザー登録の確認メールを送信しました');
			    } else {
			    	if (e.code == 400) {
				        util.alertDialog('このメールアドレスは既に登録済みです');
			    	} else if (e.code == 401) {
			    		// 同じセッションを使用しているためか、一度登録した後には、その登録の確認メールを処理するまでエラーになる
			    		// アプリを再起動するとエラーにはならない
				        util.alertDialog('ユーザー登録の確認メールが届いていない場合、一度このアプリを終了し、再度登録をお願いします');
			    	} else {
				        util.errorDialog();
			    		
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
	backLabel.text = 'アカウントをもっている';
	listView.add(backLabel);

	backLabel.addEventListener('click',function(e){
		Ti.API.debug('[event]backLabel.click:');
		loginWin.close();
	});

	loginWin.addEventListener('click',function(e){
		Ti.API.debug('[event]loginWin.click:');
		nameField.blur();
		passField.blur();
	});

// ---------------------------------------------------------------------

	// 選択したフィールド名を保管
	var selectedName = null;

	return loginWin;
};

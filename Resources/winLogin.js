// ログイン

exports.createWindow = function(){
	Ti.API.debug('[func]winLogin.createWindow:');

	// 多重クリック防止
	var clickEnable = true;

// ---------------------------------------------------------------------

	var loginWin = Ti.UI.createWindow(style.loginWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.loginTitleLabel);	
	loginWin.titleControl = titleLabel;

/*
	var loginFbButton = Facebook.createLoginButton(style.loginFacebookButton);
	loginFbButton.style = Facebook.BUTTON_STYLE_WIDE;
	loginWin.add(loginFbButton);
*/
	
	var listView = Ti.UI.createView(style.loginListView);
	loginWin.add(listView);

	// facebookボタンのフィールドを表示
	var facebookView = Ti.UI.createView(style.loginListItemView);
	facebookView.backgroundColor = '#3B5998';
	facebookView.objectName = 'login';
	listView.add(facebookView);
	var facebookLabel = Ti.UI.createLabel(style.loginListButtonItemLabel);
	facebookLabel.color = 'white';
	facebookLabel.text = 'Facebookでログイン';
	facebookView.add(facebookLabel);

	facebookView.addEventListener('click',function(e){
		Ti.API.debug('[event]facebookView.click:');
		Facebook.authorize();
	});

	// またはのフィールドを表示
	var orLabel = Ti.UI.createLabel(style.loginListButtonItemLabel);
	orLabel.color = '#696969';
	orLabel.text = 'または';
	listView.add(orLabel);

	// 名前のフィールドを表示
	var nameView = Ti.UI.createView(style.loginListItemView);
	nameView.top = '4dp';
	nameView.objectName = 'name';
	listView.add(nameView);
	var nameLabel = Ti.UI.createLabel(style.loginListItemLabel);
	nameLabel.text = 'メールアドレス';
	var nameField = Ti.UI.createTextField(style.loginListValueField);
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
	passField.passwordMask = true;
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
		loginView.fireEvent('click');
	});
	passField.addEventListener('blur',function(e){
		Ti.API.debug('[event]passField.blur:');
		checkPassField();
	});
	
	// ログインボタンのフィールドを表示
	var loginView = Ti.UI.createView(style.loginListItemView);
	loginView.top = '9dp';
	loginView.backgroundColor = '#e74c3c';
	loginView.objectName = 'login';
	listView.add(loginView);
	var loginLabel = Ti.UI.createLabel(style.loginListButtonItemLabel);
	loginLabel.color = 'white';
	loginLabel.text = 'ログイン';
	loginView.add(loginLabel);

	loginView.addEventListener('click',function(e){
		Ti.API.debug('[event]loginView.click:');
		nameField.blur();
		passField.blur();
		util.alertDialog('ログイン');
	});

	// 新規ボタンのフィールドを表示
	var newView = Ti.UI.createView(style.loginListItemView);
	newView.top = '9dp';
//	newView.backgroundColor = '#e74c3c';
	newView.objectName = 'new';
	listView.add(newView);
	var newLabel = Ti.UI.createLabel(style.loginListButtonItemLabel);
	newLabel.text = '新規登録';
	newView.add(newLabel);

	newView.addEventListener('click',function(e){
		Ti.API.debug('[event]newView.click:');
		if (clickEnable) {
			clickEnable = false;
			var target = e.source;
			target.opacity = 0.5;
			var registWin = win.createRegistWindow();
			registWin.open({
				modal: true,
			    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
			    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL,
			});

			target.opacity = 1.0;
			clickEnable = true;
		}
	});

	// パスワードリセット
	var resetView = Ti.UI.createView(style.registListItemView);
	resetView.backgroundColor = '#eeeeee';
	listView.add(resetView);
	var resetLabel = Ti.UI.createLabel(style.registListButtonItemLabel);
	resetLabel.color = '#696969';
	resetLabel.text = 'パスワードを忘れた場合';
	listView.add(resetLabel);

	resetLabel.addEventListener('click',function(e){
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

// スケジュール

exports.createWindow = function(){
	//タイトルに今の年月を表示
	var now = new Date();
	now.setHours(12);
	var Y = now.getYear() + 1900;
	var M = now.getMonth() + 1;
	var thisMonth = Y + "年" + M + "月";

	var titleLabel = Ti.UI.createLabel({
		text: thisMonth,
    	color: 'white',
    	shadowColor: 'gray',
    	font: {fontSize: 20, fontWeight: 'bold'}
	});
	
	style.scheduleWin.titleControl = titleLabel;
	
	var win = Ti.UI.createWindow(style.scheduleWin);


/*	
	var whenLabel = Ti.UI.createLabel({
	    font:{
	        fontFamily:'Helvetica Neue',
	        fontSize:25
	    },
	    textAlign:'center',
	    text:Y+"年"+M+"月",
	    top:5, left:'auto', height:25, width:'auto'
	});
*/

	return win;
}


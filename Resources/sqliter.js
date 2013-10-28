/*
 * 
 * SQlite Query Builder : sqliter
 * Author: Yu Watanabe
 * Version: 1.0
 * Last Update: 2013/10/15
 * 
 * example:http://watanabeyu.blogspot.com/
 * 
 */

var db,dbname;

var sqliter = function(_dbname){
	if(!_dbname){
		console.log("sqlite:dbname is not undefined. ex: var sqlite = new sqlite('dbname')");
		return false;
	}
	
	this.dbname = dbname = _dbname;
	
	return makeQuery;
};
exports.sqliter = sqliter;

var makeQuery = {
	q:"",
	opened:0,
	order:0,
	group:0,
	ins:0,
	upd:0,
	result:"",
	fieldCount:0,
	rowCount:0,
	reset:function(){
		this.q = "";
		this.opened = 0;
		this.order = 0;
		this.group = 0;
		this.ins = 0;
		this.upd = 0;
		this.result = "";
	},
	open:function(_func){
		this.reset();
		db = Ti.Database.open(dbname);
		
		var r = _func(this);
		
		db.close();
		
		return r;
	},
	
	tableCheck:function(_tblname,_query){
		if(!_tblname || !_query){
			console.log("sqlite:makeQuery.tableCheck - tblname and query is string");
			return false;
		}
		
		this.reset();
		
		this.select().from("sqlite_master").where("type","=","table").and_where("tbl_name","=",_tblname).execute();
		
		var result = this.result;
		
		var sql = "";
		while(result.isValidRow()){
			sql = result.fieldByName("sql");
			result.next();
		}
		
		if(!sql){
			console.log("create table");
			this.query(_query).execute();
		}
		else if(sql != _query){
			console.log("table is old,drop table and create table");
			this.drop(_tblname);
			this.query(_query).execute();
		}
		
		return true;
	},
	
	query:function(_string){
		this.reset();
		
		if(!_string || typeof _string != "string"){
			console.log("sqlite:makeQuery.query - string is string");
			return false;
		}
		
		this.q = _string;
		
		return this;
	},
	execute:function(){
		if(!this.q){
			console.log("sqlite:makeQuery.execute - query is not undefined");
		}
		
		this.result = db.execute(this.q);
		
		return this;
	},
	getResult:function(){
		return this.result;
	},
	getCount:function(){
		return this.result.rowCount;
	},
	getFieldCount:function(){
		return (Ti.Platform.osname == "android")?this.result.fieldCount:this.result.fieldCount();
	},
	as_array:function(){
		var result = this.result;
		
		var data = [];
		while(result.isValidRow()){
			var row = {};
			
			for(var j = 0;j < this.getFieldCount();j++){
				row[result.fieldName(j)] = result.field(j);
			}
			
			data.push(row);
			
			result.next();
		}
		result.close();
		
		return data;
	},
	
	select:function(_column){
		this.reset();
		
		if(arguments.length == 1 || arguments.length == 0){
			if(!_column || _column == "*"){
				this.q = "SELECT *";
			}
			else if(typeof _column == "string"){
				this.q = "SELECT " + _column;
			}
			else if(typeof _column == "object" && _column.length != undefined){
				this.q = "SELECT " + _column.join(",") + "";
			}
			else{
				console.log("sqlite:makeQuery.select - column is string or [column1,column2] or ''");
				return false;
			}
		}
		else{
			console.log("sqlite:makeQuery.select - column is string or [column1,column2] or ''");
			return false;
		}
		
		return this;
	},
	distinct:function(_column){
		if(typeof _column == "string"){
			this.q += "SELECT DISTINCT " + _column;
		}
		else if(typeof _column == "object" && _table.length != undefined){
			this.q += "SELECT DISTINCT " + _column.join(",");
		}
		else if(_column == ""){
			console.log("sqlite:makeQuery.distinct - column is string or [column1,column2] or ''");
			return false;
		}
		
		return this;
	},
	from:function(_table){
		if(typeof _table == "string"){
			this.q += " FROM " + _table;
		}
		else if(typeof _table == "object" && _table.length != undefined){
			this.q += " FROM " + _table[0] + " as " + _table[1];
		}
		else{
			console.log("sqlite:makeQuery.from - table is string or [table,alias]");
			return false;
		}
		
		return this;
	},
	join:function(_table,_type){
		if(typeof _table != "string" && !(typeof _table == "object" && _table.length != undefined)){
			console.log("sqlite:makeQuery.join - table is string or [table,alias]");
			return false;
		}
		
		if(typeof _type != "string"){
			console.log("sqlite:makeQuery.join - type is string(left or right or inner)");
			return false;
		}
		
		_type = _type.toUpperCase();
		
		if(!_type.match(/LEFT/) && !_type.match(/RIGHT/) && !_type.match(/INNER/)){
			console.log("sqlite:makeQuery.join - type is left or right or inner");
			return false;
		}
		
		if(typeof _table == "string"){
			this.q += " " + _type + " JOIN " + _table;
		}
		else{
			this.q += " " + _type + " JOIN " + _table[0] + " as " + _table[1];
		}
		
		return this;
	},
	on:function(_column1,_operator,_column2){
		if(typeof _column1 != "string"){
			console.log("sqlite:makeQuery.on - column1 is string");
			return false;
		}
		if(typeof _operator != "string" || !_operator){
			console.log("sqlite:makeQuery.on - operator is string");
			return false;
		}
		if(typeof _column2 != "string"){
			console.log("sqlite:makeQuery.on - column2 is string");
			return false;
		}
		
		this.q += " ON (" + _column1 + " " + _operator + " " + _column2 + ")";
		
		return this;
	},
	where:function(_column,_operator,_value){
		var v = this.w(_column,_operator,_value,"where");
		this.q += v;
		
		return (v)?this:false;
	},
	and_where:function(_column,_operator,_value){
		var v = this.w(_column,_operator,_value,"and_where");
		this.q += v;
		
		return (v)?this:false;
	},
	or_where:function(_column,_operator,_value){
		var v = this.w(_column,_operator,_value,"or_where");
		this.q += v;
		
		return (v)?this:false;
	},
	where_open:function(){
		this.opened = 1;
		this.q += " WHERE (";
		return this;
	},
	where_close:function(){
		this.opened = 0;
		this.q += ")";
		return this;
	},
	and_where_open:function(){
		this.opened = 1;
		this.q += " AND (";
		return this;
	},
	and_where_close:function(){
		this.opened = 0;
		this.q += ")";
		return this;
	},
	or_where_open:function(){
		this.opened = 1;
		this.q += " OR (";
		return this;
	},
	or_where_close:function(){
		this.opened = 0;
		this.q += ")";
		return this;
	},
	having:function(_column,_operator,_value){
		var v = this.h(_column,_operator,_value,"having");
		this.q += v;
		
		return (v)?this:false;
	},
	and_having:function(_column,_operator,_value){
		var v = this.h(_column,_operator,_value,"and_having");
		this.q += v;
		
		return (v)?this:false;
	},
	or_having:function(_column,_operator,_value){
		var v = this.h(_column,_operator,_value,"or_having");
		this.q += v;
		
		return (v)?this:false;
	},
	having_open:function(){
		this.opened = 1;
		this.q += " HAVING (";
		return this;
	},
	having_close:function(){
		this.opened = 0;
		this.q += ")";
		return this;
	},
	and_having_open:function(){
		this.opened = 1;
		this.q += " AND (HAVING(";
		return this;
	},
	and_having_close:function(){
		this.opened = 0;
		this.q += "))";
		return this;
	},
	or_having_open:function(){
		this.opened = 1;
		this.q += " OR (HAVING(";
		return this;
	},
	or_having_close:function(){
		this.opened = 0;
		this.q += "))";
		return this;
	},
	order_by:function(_column,_order){
		if(_column && typeof _column == "string"){
			this.q += (!this.order)?" ORDER BY " + _column:"," + _column;
		}
		else{
			console.log("sqlite:makeQuery.order_by - column is string");
			return false;
		}
		
		if(_order && typeof _order == "string"){
			_order = _order.toUpperCase();
			
			if(_order != "ASC" && _order != "DESC"){
				console.log("sqlite:makeQuery.order_by - order is string(asc or desc)");
				return false;
			}
			
			this.q += " " + _order;
		}
		
		this.order = 1;
		return this;
	},
	group_by:function(_column){
		if(_column && typeof _column == "string"){
			this.q += (!this.group)?" GROUP BY " + _column:"," + _column;
		}
		else{
			console.log("sqlite:makeQuery.group_by - column is string");
			return false;
		}
		
		this.group = 1;
		return this;
	},
	limit:function(_value){
		if(_value && typeof _value == "number"){
			this.q += " LIMIT " + _value;
		}
		else{
			console.log("sqlite:makeQuery.limit - value is number");
			return false;
		}
		
		return this;
	},
	offset:function(_value){
		if(_value && typeof _value == "number"){
			this.q += " OFFSET " + _value;
		}
		else{
			console.log("sqlite:makeQuery.offset - value is number");
			return false;
		}
		
		return this;
	},
	insert:function(_table){
		this.reset();
		
		if(typeof _table != "string"){
			console.log("sqlite:makeQuery.insert - table is string");
			return false;
		}
		
		this.q = "INSERT INTO " + _table;
		
		this.ins = 1;
		return this;
	},
	set:function(_columns){
		if(typeof _columns != "object"){
			console.log("sqlite:makeQuery.set - columns is object({column1:value1,column2:value2...})");
			return false;
		}
		else if(typeof _columns == "object" && _columns.length != undefined){
			console.log("sqlite:makeQuery.set - columns is object({column1:value1,column2:value2...})");
			return false;
		}
		else{
			var columns = [];
			var values = [];
			
			for(var i in _columns){
				columns.push(i);
				values.push(this.val(_columns[i]));
			}
		}
		
		if(this.ins){
			this.q += " (" + columns.join(",") + ") VALUES(" + values.join(",") + ")";
		}
		else if(this.upd){
			for(var i = 0;i < columns.length;i++){
				this.q += (!i)?" SET " + columns[i] + " = " + values[i]:"," + columns[i] + " = " + values[i];
			}
		}
		
		return this;
	},
	columns:function(_columns){
		if(typeof _columns == "object" && _columns.length != undefined){
			this.q += " (" + _columns.join(",") + ")";
		}
		else{
			console.log("sqlite:makeQuery.columns - columns is [column1,column2...]");
			return false;
		}
		
		return this;
	},
	values:function(_values){
		if(typeof _values == "object" && _values.length != undefined){
			this.q += " VALUES(";
			for(var i = 0;i < _values.length;i++){
				this.q += (!i)?"":",";
				this.q += this.val(_values[i]);
			}
			this.q += ")";
		}
		else{
			console.log("sqlite:makeQuery.values - values is [value1,value2...]");
			return false;
		}
		
		return this;
	},
	update:function(_table){
		this.reset();
		
		if(typeof _table != "string"){
			console.log("sqlite:makeQuery.update - table is string");
			return false;
		}
		
		this.q = "UPDATE " + _table;
		
		this.upd = 1;
		return this;
	},
	value:function(_column,_value){
		if(!_column || typeof _column != "string"){
			console.log("sqlite:makeQuery.value - column is string");
			return false;
		}
		if(!_value || (typeof _value != "string" && typeof _value != "number")){
			console.log("sqlite:makeQuery.value - value is string");
			return false;
		}
		
		this.q += (!this.q.match(/ SET /))?" SET ":",";
		this.q += _column + " = " + this.val(_value);
		
		return this;
	},
	remove:function(_table){
		this.reset();
		
		if(typeof _table != "string"){
			console.log("sqlite:makeQuery.remove - table is string");
			return false;
		}
		
		this.q = "DELETE FROM " + _table;
		
		return this;
	},
	drop:function(_table){
		this.reset();
		
		if(typeof _table != "string"){
			console.log("sqlite:makeQuery.drop - table is string");
			return false;
		}
		
		this.q = "DROP TABLE " + _table;
		
		return this;
	},
	optimize:function(){
		this.reset();
		
		this.q = "VACUUM";
		
		return this;
	},
	
	w:function(_column,_operator,_value,_type){
		if(!_column || typeof _column != "string"){
			console.log("sqlite:makeQuery.w - column is string");
			return false;
		}
		if(!_operator || typeof _operator != "string"){
			console.log("sqlite:makeQuery.w - option is string");
			return false;
		}
		
		_operator = _operator.toUpperCase();
		
		/* in,not in,between */
		if(_operator == "IN" || _operator == "NOT IN"){
			if(typeof _value != "object" || _value.length == undefined || _value.length < 2){
				console.log("sqlite:makeQuery.w - if option == IN or NOT IN, value must be [value1,value2...]");
				return false;
			}
			else{
				_value = "('" + _value.join("','") + "')";
			}
		}
		else if(_operator == "BETWEEN"){
			if(typeof _value != "object" || _value.length != 2){
				console.log("sqlite:makeQuery.w - if option == BETWEEN, value must be [value1,value2](2 length)");
				return false;
			}
			else{
				_value = "'" + _value.join("' AND '") + "'";
			}
		}
		else{
			if(_value && (typeof _value != "string" && typeof _value != "number")){
				console.log("sqlite:makeQuery.w - value is string or number or ''");
				return false;
			}
		}
		
		/* like,not like */
		if(_operator == "LIKE" || _operator == "NOT LIKE"){
			_value = (!_value.match(/\%/))?"%" + _value + "%":_value;
		}
		
		switch(_type){
			case "where":
				if(this.opened){
					return _column + " " + _operator + " " + this.val(_value,_operator);
				}
				else{
					return " WHERE " + _column + " " + _operator + " " + this.val(_value,_operator);
				}
				break;
			case "and_where":
				return " AND " + _column + " " + _operator + " " + this.val(_value,_operator);
				break;
			case "or_where":
				return " OR " + _column + " " + _operator + " " + this.val(_value,_operator);
				break;
		}
	},
	h:function(_column,_operator,_value,_type){
		if(!_column || typeof _column != "string"){
			console.log("sqlite:makeQuery.h - column is string");
			return false;
		}
		if(!_operator || typeof _operator != "string"){
			console.log("sqlite:makeQuery.h - option is string");
			return false;
		}
		if(_value && (typeof _value != "string" && typeof _value != "number")){
			console.log("sqlite:makeQuery.h - value is string or number or ''");
			return false;
		}
		
		switch(_type){
			case "having":
				if(this.opened){
					return _column + " " + _operator + " " + this.val(_value,_operator);
				}
				else{
					return " HAVING " + _column + " " + _operator + " " + this.val(_value,_operator);
				}
				break;
			case "and_having":
				if(this.opened){
					return " AND " + _column + " " + _operator + " " + this.val(_value,_operator);
				}
				else{
					return " AND HAVING " + _column + " " + _operator + " " + this.val(_value,_operator);
				}
				break;
			case "or_having":
				if(this.opened){
					return " OR " + _column + " " + _operator + " " + this.val(_value,_operator);
				}
				else{
					return " OR HAVING " + _column + " " + _operator + " " + this.val(_value,_operator);
				}
				break;
		}
	},
	val:function(_value,_operator){
		if(_operator == "IN" || _operator == "NOT IN" || _operator == "BETWEEN"){
			return _value;
		}
		
		return (typeof _value == "string")?"'" + _value + "'":_value;
	}
};

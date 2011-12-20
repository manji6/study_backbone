/**
 * Backbone.js
 * 写経プログラム
 *
 * 写経元：http://lab.dwango.jp/articles/jquery-mobile-app-development/2-add-mvc-with-backbone.html
 *
 * @author Ryosuke Sawada<ryosuke.sawada@gmail.com>
 */

 /**
  * Model
  *
  */
var Friend = Backbone.Model.extend({

	// set default object.
	defaults: function(){
		return {
			friendName: "unknown name",
			date: null
		}
	},

	// keep create date.
	initialize: function(){
		this.set({date: new Date()});
	}
});

/**
 * Collection
 *
 */
var Friends = Backbone.Collection.extend({
	// define reference to "Friend" model.
	model:Friend
});


/**
 * View
 *
 */
var FriendView = Backbone.View.extend({
	el: "#friends",
	events: {
		"click button": "addFriend"
	},
	initialize: function(){
		this.collection = new Friends();
		this.collection.bind("add",this.render,this);
	},
	render: function(friend){
		$(this.el).children("ul").append(this.template(friend));
	},
	addFriend: function(){
		var rand = Math.floor(Math.random()*this.nameTemplate.length);
		var name = this.nameTemplate[rand];
		var friend = new Friend({friendName: name});
		this.collection.add(friend);
	},
	template: function(friend){
		return "<li>"+friend.get("friendName")+"("+friend.get("date")+")"+"</li>";
	},
	nameTemplate: [
		"Steve Jobs",
		"Bill Gates",
		"Martin Luther King Junior"
	]
});

$(function(){
	var view = new FriendView();
});

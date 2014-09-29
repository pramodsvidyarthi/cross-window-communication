(function  ($,_,Backbone) {
	var personModel =  Backbone.Model.extend({});

	var peopleCollection = Backbone.Collection.extend({model:personModel});

	var peopleView = Backbone.View.extend({
		tagName:'ul',

		id:'list',

		template:_.template("<li> <%= id %> <%= name %> <%= age %> </li>"),

		render:function(){
			this.collection.each(function(model){
			this.$el.append(this.template(model.toJSON()));		// pls pass the reference of this, 
			},this);											// donot forget imp note.				
	  	},

	  	initialize:function(){
	  		this.render();
	  		$('#data').append(this.$el);
	  	}
	});

	var mycollection = new peopleCollection(data);
	var myview = new peopleView({collection:mycollection});

	$(function(){
		$('#send').on('click',function(){
			var tosend = $('#data')[0].outerHTML;
			$('#data').slideUp();
			var newwin = window.open("test2.html","abc","height=400,width=400,top=100,left=100");
			newwin.onload = function(){
				newwin.postMessage(tosend,"*");
			}
		});
	});
})($,_,Backbone)
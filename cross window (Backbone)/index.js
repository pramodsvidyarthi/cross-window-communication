(function($,_,Backbone){

	window.Tasks={
		Models:{},
		Collections:{},
		Views:{}
	};
	var arr = [],
		mod = [];

	Tasks.Models.client = Backbone.Model.extend({});

	Tasks.Collections.clients = Backbone.Collection.extend({model:Tasks.Models.client});

	Tasks.Views.clientView = Backbone.View.extend({

		tagName:'ul',

		template:_.template($('#view').html()),

		events:{
			"click input#chkbox":"display",
		},

		display:function(e){
			//var a = this.$el.find('#chkbox').is(':checked');
			var b = e.currentTarget; //event delegation in backbone.js 
			if(b.checked){
			//console.log(b.attributes.rel.value);
			arr.push(b.attributes.rel.value);
			//mod.push($(b).parent().text());
			var a = $(b).parent().text();
			// first regexp to remove leading and trailing whitespace and 
			// second to replace whitespace with commas. 
			var ele = a.replace(/^[ ]+|[ ]+$/g,'').replace(/[ ,]+/g, ",");
			mod.push(ele);
		}
		else if(!b.checked){
			arr.pop('b.attributes.rel.value');
			mod.pop(ele);
		}
		console.log(arr);
		console.log(mod);
		},

		initialize:function(){
			this.render();
			$('body').append(this.$el);
			//console.log(this.$el);
		},

		render:function(){
			this.collection.each(function(model){						// pls pass the reference of this,
				this.$el.append(this.template(model.toJSON()));			// donot forget imp note.
			},this);
		}
	});

	var tasks = new Tasks.Collections.clients(data);

	var taskview = new Tasks.Views.clientView({collection:tasks});

	function sendmsg(){
		$('#send').on('click',function(){
			var open = window.open("newwindow.html","abc");
			open.onload = function(){
				open.postMessage(JSON.stringify(arr),"*");
			}
		});
	}

	$(function(){
		sendmsg();
	});

})($,_,Backbone);
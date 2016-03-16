require.config({
	paths : {
		jquery:'jquery.min',
		jqueryUI:'jquery-ui'
	}
});



require(['jquery','jqueryUI','window'],function($,$UI,w){
	$("#a").click(function(){
		var win = new w.Window();
		win.alert({
			title:"Alert",
			content:"welcome!",
			width:300,
			height:150,
			y:50,
			hasCloseBtn: true,
			skinClassName: "window_skin_a",
			text4AlertBtn: "确认",
			dragHandle: ".window_header",
			//handler4AlertBtn: function(){alert("you click the alert button");},
			//handler4CloseBtn: function(){alert("you click the close button");},
		}).on("alert",function(){alert("2nd alert handler");
		}).on("alert",function(){alert("3rd alert handler");
		}).on("close",function(){alert("2nd close handler");});
	});

	$("#b").click(function(){
		var win = new w.Window();
		win.confirm({
			title: "Confirm",
			content: "Are you sure?",
			width: 300,
			height: 150,
			y: 50,
			text4ConfirmBtn: "Yes",
			text4CancelBtn: "No",
			dragHandle: ".window_header"
		}).on("confirm",function(){
			alert("Sure");
		}).on("cancel",function(){
			alert("Not Sure");
		});
	});

	$("#c").click(function(){
		var win = new w.Window();
		win.prompt({
			title: "Type your name",
			content: "keep information secret",
			width: 300,
			height: 150,
			y: 50,
			text4PromptBtn: "Type",
			text4CancelBtn: "Cancel",
			defaultValue4PromptInput: "abcdefg",
			dragHandle: ".window_header",
			handler4PromptBtn: function(inputValue){
				alert("yout text is: " + inputValue);
			},
			handler4CancelBtn: function(){
				alert("Canceled");
			},
		});
	});

	$("#d").click(function(){
		var win = new w.Window();
		win.common({
			content: "Common",
			width: 300,
			height: 150,
			y: 50,
			hasCloseBtn: true,
		});
	});
});
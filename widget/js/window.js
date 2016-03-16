define(['widget','jquery','jqueryUI'],function(widget,$,$UI){

	function Window(){
		this.cfg = {
			width: 500,
			height: 300,
			title:"Title",
			content:"",
			hasCloseBtn: false,
			hasMask: true,
			isDraggable: true,
			dragHandle:null,
			skinClassName: null,
			text4AlertBtn: "OK",
			text4ConfirmBtn: "OK",
			text4CancelBtn: "Cancel",
			text4PromptBtn: "OK",
			isPromptInputPassword: false,
			defaultValue4PromptInput: "",
			maxlength4PromptInput: 10,
			handler4PromptBtn: null,
			handler4AlertBtn: null,
			handler4CloseBtn: null,
			handler4ConfirmBtn: null,
			handler4CancelBtn: null,
		};
		this.handlers={};
	}

	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI : function(){
			var footerContent = "";
			switch(this.cfg.winType){
				case "alert":
					footerContent = '<input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn">';
					break;
				case "confirm":
					footerContent = '<input type="button" value="'+
					this.cfg.text4ConfirmBtn+'" class="window_confirmBtn"><input type="button" value="'+
					this.cfg.text4CancelBtn+'" class="window_cancelBtn">';
					break;
				case "prompt":
					this.cfg.content += '<p class="window_promptInputWrapper"><input type="' + 
					(this.cfg.isPromptInputPassword ? "password":"text") +'" value="' +
					this.cfg.defaultValue4PromptInput + '" maxlength="' + 
					this.cfg.maxlength4PromptInput + '" class="window_promptInput"></p>';
					footerContent = '<input type="button" value="' + 
					this.cfg.text4PromptBtn + '" class="window_promptBtn"><input type="button" value="' +
					this.cfg.text4CancelBtn + '" class="window_cancelBtn">';
					break;
			}
			this.boundingBox = $(
				'<div class="window_boundingBox">'+
				'<div class="window_body">'+ this.cfg.content +'</div>'+
				'</div>'
				);
			if(this.cfg.winType!="common"){
				this.boundingBox.prepend('<div class="window_header">'+ this.cfg.title +'</div>');
				this.boundingBox.append('<div class="window_footer">'+ footerContent +'</div>');
			}
			if(this.cfg.hasMask){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo("body");
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			}
			this.boundingBox.appendTo(document.body);
			this._promptInput = this.boundingBox.find(".window_promptInput");

		},
		bindUI : function(){
			var that = this;
			this.boundingBox.delegate(".window_alertBtn","click",function(){
				that.fire("alert");
				that.destroy();
			}).delegate(".window_closeBtn","click",function(){
				that.fire("close");
				that.destroy();
			}).delegate(".window_confirmBtn","click",function(){
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancelBtn","click",function(){
				that.fire("cancel");
				that.destroy();
			}).delegate(".window_promptBtn","click",function(){
				that.fire("prompt",that._promptInput.val());
				that.destroy();
			});
			if(this.cfg.handler4AlertBtn){
				this.on("alert",this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on("close",this.cfg.handler4CloseBtn);
			}
			if(this.cfg.handler4ConfirmBtn){
				this.on("confirm",this.cfg.handler4ConfirmBtn);
			}
			if(this.cfg.handler4CancelBtn){
				this.on("cancel",this.cfg.handler4CancelBtn);
			}
			if(this.cfg.handler4PromptBtn){
				this.on("prompt",this.cfg.handler4PromptBtn);
			}
		},
		syncUI : function(){
			this.boundingBox.css({
				width: this.cfg.width + "px",
				height: this.cfg.height + "px",
				left: (this.cfg.x||(window.innerWidth - this.cfg.width)/2) + "px",
				top: (this.cfg.y||(window.innerHeight - this.cfg.height)/2) + "px",
			});
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}else{
					this.boundingBox.draggable();
				}		
			}
		},
		destructor : function(){
			this._mask && this._mask.remove();
		},
		alert : function(cfg){
			$.extend(this.cfg,cfg,{winType:"alert"});
			this.render();
			return this;
			/*
			var boundingBox = $(
				'<div class="window_boundingBox">'+
				'<div class="window_header">'+ CFG.title +'</div>'+
				'<div class="window_body">'+ CFG.content +'</div>'+
				'<div class="window_footer"><input type="button" value="'
				+ CFG.text4AlertBtn +'" class="window_alertBtn"></div>'+
				'</div>'
				);
			*/
			//btn = boundingBox.find(".window_alertBtn");
			//mask = null;
			//that = this;
			/*
			if(CFG.hasMask){
				mask = $('<div class="window_mask"></div>');
				mask.appendTo("body");
			}
			*/
			//boundingBox.appendTo("body");
			/*
			btn.click(function(){
				CFG.handler4AlertBtn && CFG.handler4AlertBtn();
				boundingBox.remove();
				mask && mask.remove();
				that.fire("alert");
			});
			*/
			/*
			boundingBox.css({
				width: CFG.width + "px",
				height: CFG.height + "px",
				left: (CFG.x||(window.innerWidth - CFG.width)/2) + "px",
				top: (CFG.y||(window.innerHeight - CFG.height)/2) + "px",
			});
			*/
			/*
			if(CFG.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function(){
					CFG.handler4CloseBtn && CFG.handler4CloseBtn();
					boundingBox.remove();
					mask && mask.remove();
					that.fire("close");
				});
			}*/
			/*
			if(CFG.skinClassName){
				boundingBox.addClass(CFG.skinClassName);
			}
			*/
			/*
			if(CFG.isDraggable){
				if(CFG.dragHandle){
					boundingBox.draggable({handle:CFG.dragHandle});
				}else{
					boundingBox.draggable();
				}
				
			}
			*/
			/*
			if(CFG.handler4AlertBtn){
				this.on("alert",CFG.handler4AlertBtn);
			}
			if(CFG.handler4CloseBtn){
				this.on("close",CFG.handler4CloseBtn);
			}
			*/

		},
		confirm : function(cfg){
			$.extend(this.cfg,cfg,{winType:"confirm"});
			this.render();
			return this;
		},
		prompt : function(cfg){
			$.extend(this.cfg,cfg,{winType:"prompt"});
			this.render();
			this._promptInput.focus().select();
			return this;
		},
		common : function(cfg){
			$.extend(this.cfg,cfg,{winType:"common"});
			this.render();
			return this;
		},
	});

	return{
		Window : Window
	}
	
});
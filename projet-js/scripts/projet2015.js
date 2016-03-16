/***********************************************/
/**                                            */
/**              MINI-PROJET JS 2015           */
/**                                            */
/***********************************************/

/** placez ici votre code javascript réponse aux questions du sujet de projet */

/** n'oubliez pas de faire précéder le code de vos fonctions 
    d'un commentaire documentant la fonction                   **/
function afterLoad(){
	var score,
	scoreNode = document.getElementById("score"),
	player,
	bullet,
	bullets,
	enemy,
	enemies,
	fpsNode = document.getElementById("fps"),
	fps,
	fpsInterval,
	FPS = 60,
	canvas = document.getElementById("stars"),
	ctx = document.getElementById("stars").getContext("2d");

	function Enemy(cfg){
		this.enemyReady = false;
		this.enemyNode = new Image();
		this.enemyNode.src  = "images/flyingSaucer-petit.png";
		this.x = this.y = 0;
		this.xSpeed = 5;
		this.init();
	}

	Enemy.prototype = {
		init : function(){
			this.x = canvas.width;
			this.y = Math.random()*(canvas.height - 36);
		},
		_move : function(){
			this.x -= this.xSpeed;
			
		},
		render : function(){
			ctx.clearRect(this.x,this.y,48,36);
			this._move();
			if(this.enemyReady){
				ctx.drawImage(this.enemyNode,this.x,this.y);
			}
			if(this.x < 0 - 48){
				this.destroy();
			}
		},
		destroy : function(){
			ctx.clearRect(this.x,this.y,48,36);
			for(var i=enemies.length-1;i>=0;i--){
				if(enemies[i] == this){
					enemies.splice(i,1);
				}
			}
			if(enemies.length == 0){
				enemy = null;
			}	
		},
	}

	function Bullet(cfg){
		this.bulletReady = false;
		this.bulletNode = new Image();
		this.bulletNode.src = "images/tir.png";
		this.x = cfg.x || 0; 
		this.y = cfg.y + 10 || 0;
		this.xSpeed = 5;
		this.blankKeyDown = false;
		this.init();
	}

	Bullet.prototype = {
		init : function(){
			//console.log("creating bullet");
		},
		_move : function(){
				this.x += this.xSpeed;
		},
		render : function(){
			ctx.clearRect(this.x,this.y,32,8);
			this._move();
			getEnemy = this._getImpact();
			if(this.bulletReady){
				ctx.drawImage(this.bulletNode,this.x,this.y);
			}
			if(this.x > canvas.width || getEnemy){
				this.destroy();
			}
		},
		destroy : function(){
			ctx.clearRect(this.x,this.y,32,8);			
			for(var i=bullets.length-1;i>=0;i--){
				if(bullets[i] == this){
					bullets.splice(i,1);
					//bullet = null;
				}
			}
			if(bullets.length == 0){
				bullet = null;
			}			
		},
		_getImpact : function(){
			if(enemies.length!=0){
				for(var i = enemies.length-1;i>=0;i--){
					if( this.y >= enemies[i].y-8 && 
						this.y <= enemies[i].y+36 && 
						this.x >= enemies[i].x &&
						this.x <= enemies[i].x+48){
						enemies[i].destroy();
						score += 1;
						scoreNode.innerHTML = score;
						return true;
						//this.destroy();
					}
				}
			}
			return false;
		},
	}


	function Player(cfg){
		this.playerReady = false;
		this.playerNode = new Image();
		this.playerNode.src = "images/vaisseau-ballon-petit.png";
		this.vSpeed = cfg.vSpeed || 2.5;
		this.x = this.y =0;
		this.ySpeed = 1;
		this.upKeyDown = false;
		this.downKeyDown = false;
		this.blankKeyDown = false;
		this.haveBullet = true,
		this.init();
	}

	Player.prototype = {
		init : function(){
			this.initPosition();	
		},
		initPosition : function(){
			this.x = 40;
			this.y = canvas.height/2;
		},
		_move : function(){
			if(this.upKeyDown){
				this.y -= this.vSpeed;
			}
			if(this.downKeyDown){
				this.y += this.vSpeed;
			}
			if(this.y < 0){
				this.y = 0;
			}else if(this.y > canvas.height - 39){
				this.y = canvas.height - 39;
			}
			//console.log(this.y);
		},
		render : function(){
			ctx.clearRect(this.x,this.y,48,39);
			this._move();
			this._shoot();
			if(this.playerReady){
				ctx.drawImage(this.playerNode,this.x,this.y);
			}
		},
		_shoot : function(){
			if(this.haveBullet){
				if(this.blankKeyDown){
					bullet = new Bullet({x:this.x,y:this.y});
					bullets.push(bullet);
					this.haveBullet = false;
				}
			}
			if(bullets.length !=0 && bullet !=null){
				for(var i = bullets.length-1; i>=0;i--){
					bullets[i].bulletNode.onload = function(){
						bullet.bulletReady = true;
					}
					bullets[i].render();
				}
			}

						
		},
	}

	function mainLoop(){
		fps++;
		player.playerNode.onload = function(){
			player.playerReady = true;
		}
		player.render();
		
		if(score <5){
			if(enemies.length == 0){
				enemy = null;
				enemy = new Enemy({});
				enemies.push(enemy);
			}
		}else{
			if(enemies.length < 2){
				enemy = null;
				enemy = new Enemy({});
				enemies.push(enemy);
			}
		}
		
		/*
		if(enemies.length <= 1){
		//if(enemies.length == 0 && enemies <= 3){
			enemy = null;
			//if(score>5){
				enemy = new Enemy({});
			//}
			//if(enemies.length == 0){
			//	enemy = new Enemy({});
			//}	
			enemies.push(enemy);
		}
		*/
		if(enemies.length != 0){
			
			for(var i = enemies.length-1;i>=0;i--){
				//console.log("number of enemies: "+enemies.length);
				enemies[i].enemyNode.onload = function(){
					enemy.enemyReady = true;
				}
				enemies[i].render();
			}
		}
		

		setTimeout(mainLoop,1000/FPS);
	}

	function gameInit(){
		fps = 0;
		score = 0;
		player = new Player({});
		bullets = [];
		enemies = [];
		mainLoop();
		document.onkeydown = function(e){
			e = e || window.event;
			if(!player) return;
			switch(e.keyCode){
				case 38:
					player.upKeyDown = true;
					break;
				case 40:
					player.downKeyDown = true;
					break;
				case 32:
					player.blankKeyDown = true;
					break;
			}
		}
		document.onkeyup = function(e){
			e = e || window.event;
			if(!player) return;
			switch(e.keyCode){
				case 38:
					player.upKeyDown = false;
					break;
				case 40:
					player.downKeyDown = false;					
					break;
				case 32:
					player.blankKeyDown = false;
					player.haveBullet = true;
					break;
			}
		}

	}

	gameInit();
	fpsInterval && clearInterval(fpsInterval);
	fpsInterval = setInterval(function(){fpsNode.innerHTML=fps;fps=0;},1000);
}

window.onload = afterLoad;
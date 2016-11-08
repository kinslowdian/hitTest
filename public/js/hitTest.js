// DEBUG
var trace = function(msg){ console.log(msg); };

var onEnterFrame;
var players;
var control;

function pageLoad_init()
{
	trace("pageLoad_init();");

	control_setup();
	game_setup();

	onEnterFrame_setup();
}

function control_setup()
{
	control = {};
	control.direction = "S";
	
	// BAISC
	control.x = 0;
	control.y = 0;
	
	// VELOCITY
	control.vx = control.x;
	control.vy = control.y;	
	
	// TARGET
	control.tx = control.x;
	control.ty = control.y;
	
	// OUTPUT
	control.dx = control.x;
	control.dy = control.y;
	
	// SAFE
	control.sx = control.x;
	control.sy = control.y;

	// SETTINGS
	control.easing = 0.05;
	control.inc = 10;
}

function control_port(connect)
{
	if(connect)
	{
		window.addEventListener("keydown", control_event, false);
	}

	else
	{
		window.removeEventListener("keydown", control_event, false);
	}	
}

function control_event(event)
{
	var direction = event.keycode || event.keyCode;

	switch(direction)
	{
		case 37:
		{
			//LEFT
			control.direction = "L";

			break;
		}

		case 38:
		{
			// UP
			control.direction = "U";

			break;
		}

		case 39:
		{
			// RIGHT
			control.direction = "R";

			break;
		}

		case 40:
		{
			// DOWN
			control.direction = "D";

			break;
		}

		default:
		{
			control.direction = "S";
		}
	}

	if(control.direction !== "S")
	{
		control_move();
	}

	trace(direction);
}

function control_move()
{
	if(control.direction === "L")
	{
		control.tx -= control.inc;
	}

	else if(control.direction === "R")
	{
		control.tx += control.inc;
	}

	else if(control.direction === "U")
	{
		control.ty -= control.inc;
	}

	else if(control.direction === "D")
	{
		control.ty += control.inc;
	}

	// ERROR
	else
	{
		control.direction = "S";
	}

	// player_move();
}

function game_setup()
{
	players = {};

	players.player 	= {};
	players.enemy 	= new Array();
	players.wall 	= new Array();

	// RADIUS HALF WIDTH 80 / 40
	players.player 	= {radius: 40, x: 0, y: 0, link: document.querySelector(".player")};

	enemy_create({radius:40, x:320, y:320, num:0});
	enemy_create({radius:40, x:0, y:320, num:1});
	enemy_create({radius:40, x:120, y:640, num:2});
	enemy_create({radius:40, x:640, y:640, num:3});

	wall_create({w:600, h:1000, x:900, y:80, num:0});

	control_port(true);
}

function enemy_create(settings)
{
	var e = {};

	e.radius 	= settings.radius;
	e.x			= settings.x;
	e.y			= settings.y;
	e.class		= 'enemy' + settings.num;
	e.link		= document.querySelector('.' + e.class);

	players.enemy.push(e);
}

function wall_create(settings)
{
	var w = {};

	w.w 		= settings.w;
	w.h 		= settings.h;
	w.class 	= 'wall' + settings.num;
	w.link		= document.querySelector('.' + w.class);

	players.wall.push(w);
}

function onEnterFrame_setup()
{
	onEnterFrame = {};
	onEnterFrame.run = false;
	onEnterFrame.calls = new Array();

	onEnterFrame.calls.push(hit_check);
	onEnterFrame.calls.push(player_move);

	onEnterFrame_init(true);
}

function onEnterFrame_init(init)
{
	if(init)
	{
		onEnterFrame.run = true;
		window.requestAnimationFrame(onEnterFrame_event);
	}

	else
	{
		onEnterFrame.run = false;
		window.cancelAnimationFrame(onEnterFrame_event);	
	}
}

function onEnterFrame_event()
{
	for(var i = 0; i < onEnterFrame.calls.length; i++)
	{
		onEnterFrame.calls[i]();
	}


	if(onEnterFrame.run)
	{
		onEnterFrame_init(true);
	}
}

function player_move()
{
	// X

	control.dx = control.tx - control.x;
	

	if(Math.abs(control.dx) < 1)
	{
		control.x = control.tx;
	}

	else
	{
		control.vx = control.dx * control.easing;
		control.x += control.vx;
	}

	// Y

	control.dy = control.ty - control.y;
	

	if(Math.abs(control.dy) < 1)
	{
		control.y = control.ty;
	}

	else
	{
		control.vy = control.dy * control.easing;
		control.y += control.vy;
	}


	players.player.x = control.x;
	players.player.y = control.y;
	players.player.link.style.transform = 'translate(' + players.player.x + 'px, ' + players.player.y + 'px)';
}

function enemy_move(settings)
{
	players.enemy[settings.select].x = settings.x;
	players.enemy[settings.select].y = settings.y;
	players.enemy[settings.select].link.style.transform = 'translate(' + settings.x + 'px, ' + settings.y + 'px)';
}

function hit_check()
{
	var _player = players.player

	// ENEMY
	for(var i = 0; i < players.enemy.length; i++)
	{
		var dx 		= 0;
		var dy 		= 0;
		var _enemy 	= players.enemy[i];

		dx = (_player.x + _player.radius) - (_enemy.x + _enemy.radius);
		dy = (_player.y + _player.radius) - (_enemy.y + _enemy.radius);
		dc = _enemy.class;
		
		distance = Math.sqrt(dx * dx + dy * dy);

		if(distance < _player.radius + _enemy.radius)
		{
			trace("ATTACK " + distance + " " + dc);

			onEnterFrame.run = false;

			_enemy.link.style.opacity = "0.5";
		}
	}

	// WALL
	for(var j = 0; j < players.wall.length; j++)
	{
		// TODO
	}
}



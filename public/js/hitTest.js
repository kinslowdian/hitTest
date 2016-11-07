// DEBUG
var trace = function(msg){ console.log(msg); };

var onEnterFrame;
var players = {};

function pageLoad_init()
{
	trace("pageLoad_init();");

	game_setup();

	onEnterFrame_setup();
}

function game_setup()
{
	players.player 	= {};
	players.enemy 	= new Array();

	// RADIUS HALF WIDTH 80 / 40
	players.player 	= {radius: 40, x: 0, y: 0, link: document.querySelector(".player")};

	enemy_create({radius:40, x:320, y:320, num:0});
	enemy_create({radius:40, x:0, y:320, num:1});
	enemy_create({radius:40, x:120, y:640, num:2});
	enemy_create({radius:40, x:640, y:640, num:3});
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

function onEnterFrame_setup()
{
	onEnterFrame = {};
	onEnterFrame.run = false;
	onEnterFrame.calls = new Array();

	onEnterFrame.calls.push(hit_check);

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

function player_move(settings)
{
	players.player.x = settings.x;
	players.player.y = settings.y;
	players.player.link.style.transform = 'translate(' + settings.x + 'px, ' + settings.y + 'px)';
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
}



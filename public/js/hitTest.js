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
	players.enemy 	= {};

	// RADIUS HALF WIDTH 80 / 40
	players.player 	= {radius: 40, x: 0, y: 0};
	players.enemy	= {radius: 40, x: 320, y: 320, class: "enemy0", link: document.querySelector('.enemy0')};
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

function enemy_move(settings)
{
	players.enemy.x = settings.x;
	players.enemy.y = settings.y;
	players.enemy.link.style.transform = 'translate(' + settings.x + 'px, ' + settings.y + 'px)';
}

function hit_check()
{
	var dx = 0;
	var dy = 0;

	dx = (players.player.x + players.player.radius) - (players.enemy.x + players.enemy.radius);
	dy = (players.player.y + players.player.radius) - (players.enemy.y + players.enemy.radius);
	dc = players.enemy.class;
	
	distance = Math.sqrt(dx * dx + dy * dy);

	if(distance < players.player.radius + players.enemy.radius)
	{
		trace("ATTACK " + distance + " " + dc);

		onEnterFrame.run = false;

		players.enemy.link.style.opacity = "0.5";
	}

	else
	{
		trace("APART " + distance);
	}
}



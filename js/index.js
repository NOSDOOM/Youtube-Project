var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubePlayerAPIReady() {
	player = new YT.Player('player', {
		playerVars: {
			listType: 'playlist',
			list: 'PLo9CR8rpct9PWadjZ-CevG7QkOH04xTHa'
			
		},
		height: '648',
		width: '1152',
		videoId: '',
		events: {
			'onReady': onPlayerReady
		}
	});
}

function onPlayerReady(event) {
	event.target.setShuffle(true); //here is the function
	var playButton = document.getElementById("start");
	playButton.addEventListener("click", function() {
		player.playVideo();
		var pauseButton = document.getElementById("pause");
		pauseButton.addEventListener("click", function() {
			player.pauseVideo();
		});
	});
}

timer = {};
timer.duration = 61000; //100 seconds
timer.elapsedTime = 0;
var value = 0;

$().ready(function() {
	$('#start').click(function() {
		document.getElementById('demo').style.display = "block";
		start(timer);
	});
});

function start(timer) {
	player.playVideo();
	timer.beginning = new Date();
	timer.interval = setInterval(function() {
		updateClock(timer);
	}, 10);
	$('#pause').html('Pause').off('click').click(function() {
		pause(timer);
	});
}

function pause(timer) {
	player.pauseVideo();
	timer.elapsedTime += new Date() - timer.beginning;
	clearInterval(timer.interval);
	//updateClock(timer);

	$('#start').html('Resume').off('click').click(function() {
		start(timer);
	});
}

function end(timer) {
	clearInterval(timer.interval);
	timer.elapsedTime = 0;

}

function updateClock(timer) {
	var currentRuntime = new Date() - timer.beginning + timer.elapsedTime;

	if (timer.duration <= currentRuntime) {
		end(timer);
		player.nextVideo();
		value = value + 1;
		var rounds = value + 1;
		playSound();
		document.getElementById("demo").innerHTML = "Round " + rounds + " of 60";
		player.seekTo(Math.floor((Math.random() * 70) + 30));
		start(timer);

	}

	var timeString = Math.floor(currentRuntime / 1000 / 60) + 'min; ' +
		Math.floor(currentRuntime / 1000 % 60) + 'sec; ' +
		(currentRuntime % 1000) + 'ms';
}

var timereno = null,
	intervalio = 3600000,
	valueio = 0;

$("#start").click(function() {
	if (timereno !== null) return;
	timereno = setInterval(function() {
		valueio = valueio + 1;
		playSound();
	}, intervalio);
});

$("#stop").click(function() {
	clearInterval(timereno);
	playSound();
	timereno = null;
});

$("#go").click(function() {
	var listId = $("#myText").val();
		player.loadPlaylist({
		listType: "playlist",
		list: listId,
		
		});
});

function playSound(number) {
	var sound = new Audio("http://www.soundjay.com/button/beep-07.wav");
	if (number == undefined) {
		playSoundLoop();
	} else {
		var counter = number;
		var interval = setInterval(function() {
			if (counter > 0) {
				playSoundLoop();
			} else {
				clearInterval(interval);
			}
			counter--;
		}, 250);
	}

	function playSoundLoop() {
		sound.play();
	}
}

function over() {
	window.location.reload(false);
}

$("#idloc").tooltip({content: '<img src="http://i.imgur.com/0XVFRWv.jpg"/>'});
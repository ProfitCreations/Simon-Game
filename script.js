$(document).ready(function() {

  // sounds
  var soundGreen = $("#sound_1")[0];
  var soundRed = $("#sound_2")[0];
  var soundYellow = $("#sound_3")[0];
  var soundBlue = $("#sound_4")[0];
  var startGame = false;
  var colorArr = ["green", "red", "blue", "yellow"];
  var stepArr = [];
  // count generated steps
  var stepCounter = 0;
  // count steps van player
  var playerStepCounter = 0;
  // determines wheter player can play or not
  var playerTurn = false;
  var playGeneratedStepsCounter = 0;
  var checkStepCounter = 0;
  var badStep = false;
  var strict = false;
  var win = false;

  // helper function for clicked buttons
  function remClass(color) {
    setTimeout(function() {
      $(color).removeClass("clicked");
    }, 400);
  }

  function playGreen() {
    $(".green").addClass("clicked");
    soundGreen.play();
    remClass(".green");
  }

  function playRed() {
    $(".red").addClass("clicked");
    soundRed.play();
    remClass(".red");
  }

  function playYellow() {
    $(".yellow").addClass("clicked");
    soundYellow.play();
    remClass(".yellow");
  }

  function playBlue() {
    $(".blue").addClass("clicked");
    soundBlue.play();
    remClass(".blue");
  }

  // color elements
  $(".green").click(function() {
    if (playerTurn) {
      playGreen();
      checkStep("green");
    }
  });

  $(".red").click(function() {
    if (playerTurn) {
      playRed();
      checkStep("red");
    }
  });

  $(".yellow").click(function() {
    if (playerTurn) {
      playYellow();
      checkStep("yellow");
    }
  });

  $(".blue").click(function() {
    if (playerTurn) {
      playBlue();
      checkStep("blue");
    }
  });

  // Start button
  $("#start").click(function() {
    if ($(this).text() === "Start") {
      $(this).text("Restart");
      startGame = true;
      setTimeout(function() {
        generateStep();
      }, 1000);
    } else {
      resetGame();
      strict = false;
    }
  });

  // strict button
  $("#strict").click(function() {
    if (!strict) {
      strict = true;
      $(".strict").addClass("on");
    } else {
      strict = false;
      $(".strict").removeClass("on");
    }
  });

  // reset the game
  function resetGame() {
    if (win) {
      win = false;
      stepCounter = 0;
      stepArr = [];
      playerTurn = false;
      $("#stepCounter").text(twoDigits(stepCounter));
    } else {
      stepCounter = 0;
      stepArr = [];
      playerTurn = false;
      $("#stepCounter").text(twoDigits(stepCounter));
      setTimeout(function() {
        generateStep();
      }, 1000);
    }
  }

  function generateStep() {
    var randColor = colorArr[Math.floor(Math.random() * colorArr.length)];
    stepArr.push(randColor);
    // Update step counter
    stepCounter++;
    $("#stepCounter").text(twoDigits(stepCounter));
    if (stepCounter > playerStepCounter) {
      playerTurn = true;
    }
    return playStep(randColor);
  }

//  Helper function
  function playStep(color) {
    switch (color) {
      case "green":
        playGreen();
        break;
      case "red":
        playRed();
        break;
      case "yellow":
        playYellow();
        break;
      case "blue":
        playBlue();
        break;
    }
  }

  function checkStep(step) {
    var gameStep = stepArr[checkStepCounter];
    if (checkStepCounter === 20) {
      return winner();
    }
    if (step === gameStep) {
      badStep = false;
      checkStepCounter++;
        if (checkStepCounter === stepArr.length) {
          playerTurn = false;
          setTimeout(playGeneratedSteps, 2000);
          checkStepCounter = 0;
        }
    } else {
      badStep = true;
      checkStepCounter = 0;
      $(".simon").addClass("animated shake");
      $("#stepCounter").text("!!");
      var errorSound = setTimeout(function() {
        soundBlue.play();
      }, 100);
      var remErrNot = setTimeout(function() {
        $("#stepCounter").text(twoDigits(stepCounter));
        $(".simon").removeClass("animated shake");
      }, 2000);
      if (strict) {
        resetGame();
      } else {
        setTimeout(playGeneratedSteps, 2000);
      }
    }
  }

  function playGeneratedSteps() {
    var playTimer = setInterval(playGeneratedStepsPlayer, 1000);
    function playGeneratedStepsPlayer() {
      if (playGeneratedStepsCounter < stepArr.length) {
        playStep(stepArr[playGeneratedStepsCounter]);
        playGeneratedStepsCounter++;
      } else {
        if (badStep) {
          clearInterval(playTimer);
          playGeneratedStepsCounter = 0;
        } else {
          clearInterval(playTimer);
          playGeneratedStepsCounter = 0;
          generateStep();
        }
      }
    }
  }

  function winner() {
    win = true;
    var winCounter = 0;
    var winCounterTimes = 0;
    $(".winner").prop("hidden", false);
    var winTimer = setInterval(function() {
      playStep(colorArr[winCounter]);
      winCounter++;
      if (winCounter > 3) {
        winCounter = 0;
        winCounterTimes++;
      }
      if (winCounterTimes > 2) {
        $(".winner").prop("hidden", true);
        resetGame();
        clearInterval(winTimer);
      }
    }, 200);
  }

  // function that keeps 2 digits
	function twoDigits(val) {
		return ("00" + val).slice(-2);
	}

});

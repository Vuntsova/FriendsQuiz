//Making Sure the page is loaded before run javaScript
//====================================================
$(document).ready(function() {


//Declaring Objects && Global Variavles
//=====================================
//Objects:
//=======

    var questions = [{//Question 1
        question: "What word did Rachel misspell on her resume?",
        choices: ["Computer", "Rachel", "Central Perk", "Dependable"],
        correct: 0,//index number
        image: "assets/images/rachelcheck.gif",
        audiosrc: "assets/audio/geek.wav"
    }, {//Question 2
        question: 'What is the name of the dog in "The One Where Chandler Does not Like Dogs?"',
        choices: ["Duke", "Fluffy", "Clunkers", "Spike"],
        correct: 2,//index number
        image: "assets/images/chandler-dogs.gif",
        audiosrc: "assets/audio/geek.wav"
    }, {//Question 3
        question: "What food is Ross allergic to in 'The One With The Baby on the Bus?'",
        choices: ["Chocolate, Eggs, and Pears", "Milk, Eggs, and Kiwi", "Apples, Milk, and Peanuts", "Kiwi, Lobster, and Peanuts"],
        correct: 3,//index number
        image: "assets/images/ross-fine.gif",
        audiosrc: "assets/audio/geek.wav"
    }, {//Question 4
        question: "What is the address Chandler gives Janice when he lies about moving to Yemen?",
        choices: ["15 Yemen Road, Yemen", "13 Desert Road, Yemen", "93 Yemenite Street, Yemen", "47 Yemen Street, Yemen"],
        correct: 0,//index number
        image: "assets/images/yemen.gif",
        audiosrc: "assets/audio/geek.wav"
    }, {//Question 5
        question: "When Joey couldn't afford to buy the full set of encyclopedias, which single volume did he buy?",
        choices: ["M", "J", "Q", "V"],
        correct: 3,//index number
        image: "assets/images/joey.jpeg",
        audiosrc: "assets/audio/geek.wav"
    }, {//Question 6
        question: "What did Rachel think Emma's first word was?",
        choices: ["Mama", "Gleeba", "Dada", "Gleebo"],
        correct: 1,//index number
        image: "assets/images/gleba.gif",
        audiosrc: "assets/audio/geek.wav"
    }, {//Question 7
        question: "Where do Ross and Phoebe get stuck when Ben is born?",
        choices: ["A closet", "An air vent", "Locked in a car", "A bathroom"],
        correct: 0,//index number
        image: "assets/images/bad-things.gif",
        audiosrc: "assets/audio/geek.wav"
    }, {//Question 8
        question: "What is the 'giant poking device' made out of?",
        choices: ["Plastic spoons", "Chopsticks", "Pens", "Hangers"],
        correct: 1,//index number
        image: "assets/images/poking.gif",
        audiosrc: "assets/audio/geek.wav"
    }, {//Question 9
        question: "Who says they are 1/16 Portuguese?",
        choices: ["Monica", "Joey", "Phoebe", "Chandler"],
        correct: 1,//index number
        image: "assets/images/one-six.gif",
        audiosrc: "assets/audio/geek.wav"
    }];

//Global Variables:
//=================    
    var currentQuestion = 0;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var outOfTimeQuestions = 0;
    var number = 8;
    var intervalId;
    var question;
    var questionClass;
    var choiceList;
    var numChoices;
    var audio = new Audio();

//Srart the game on click and hide the button #start
//==================================================

$("#start").click(function() {
    $("#start").hide();
    reset();
 
});
// Conditions if correct answer ----> this happens || else ----> this happens. Give correct answer information.
//=============================================================================================================
    function game() {

            $(".list-group-item").click(function() {
                var value = $(".list-group-item").index(this);
                console.log(value);
                if (value === questions[currentQuestion].correct) {
                    stop();
                    console.log("clicked right answer!");
                    correctAnswers++;
                    breakTimeCorrect();
                }
                else {
                    stop();
                    console.log("clicked wrong answer");
                    incorrectAnswers++;
                    breakTimeIncorrect();
                };



            });
    };

    function playRight() {
        audio.src = questions[currentQuestion].audiosrc;
        console.log(audio);
        audio.load();
        audio.play();
    }
    function playWrong() {
        audio.src = "assets/audio/so_sad.wav";
        console.log(audio);
        audio.load();
        audio.play();
    }

    function breakTimeCorrect() {
        playRight();
        $(".timeLeft").html("Yes!!! Correct!");
        $(".question").html("<img src='" + questions[currentQuestion].image + "'/>");
        $(".choiceList").hide();
        setTimeout(function() {
            $(".timeLeft").html(number);
            $(".result").hide();
            $(".choiceList").show();
            nextQuestion();
        }, 3000);

    }

    function breakTimeIncorrect() {
        playWrong();
        var j = questions[currentQuestion].correct;
        $(".timeLeft").html("WRONG! Correct answer is " + questions[currentQuestion].choices[j]);
        $(".question").html("<img src='" + questions[currentQuestion].image + "'/>");
        $(".choiceList").hide();
        setTimeout(function() {
            $(".timeLeft").html(number);
            $(".result").hide();
            $(".choiceList").show();
            nextQuestion();
        }, 3000);
    };

    function nextQuestion() {
        $(".result").unbind();
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        }
        else {
            displayScore();
        };
    };

    function displayScore() {
        $(".timeLeft").empty();
        $(".question").html("<img src='assets/images/bg.1.gif'/>");
        $(".choiceList").hide();
        $("#start").html("Play Again").show().click(function() {
            reset();
            });
        $(".result").html("Correct answers: " + correctAnswers + "<br> Incorrect answers: " + incorrectAnswers + "<br>Unanswered Questions: " + outOfTimeQuestions);
        $(".result").show();
    };

    function reset() {
        currentQuestion = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        outOfTimeQuestions = 0;
        $(".choiceList").show();
        $(".timeLeft").show();
        $(".result").hide();
        $("#up").show();
        displayQuestion();
    }


    function displayQuestion() {
        $("#start").hide();
        timer();
        question = questions[currentQuestion].question;
        console.log("current question: " + question);
        questionClass = $(".quizContainer").find(".question");
        choiceList = $(".quizContainer").find(".choiceList");
        numChoices = questions[currentQuestion].choices.length;
        console.log("current answer index: " + questions[currentQuestion].correct);

        // Set the questionClass to the current question
        $(questionClass).html(question);

        // Remove all current <li> elements (if any)
        $(choiceList).find(".list-group-item").remove();

        var choice;
        for (i = 0; i < numChoices; i++) {
            choice = questions[currentQuestion].choices[i];
            $("<button type='button' class='list-group-item'>" + choice + "</button>").appendTo(choiceList);
        };
        game();

    }; 
// Seting timer time
//==================
    function timer() {
        intervalId = setInterval(decrement, 1000);

    };

    function decrement() {
        number--;
        $(".timeLeft").html("<h3>" + number + "</h3>");
        if (number === 0) {
            stop();
            number = 8;
            outOfTimeQuestions++;
            console.log("out of time");
            breakTimeIncorrect();
        };
    };
//Stop counting function
//======================
    function stop() {
        clearInterval(intervalId);
        number = 8;
    };
});  //ending document.ready

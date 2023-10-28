import data from './data.json' assert { type: 'json' };

$(document).ready(function () {
    console.log("ready!");

    // setup
    $("#question").hide();
    $("#wrong").hide();

    // add the bonus questions
    let questions = data.questions;
    const totalBlocks = data.width * data.height;

    while (questions.length < totalBlocks) {
        questions.push(
            {
                "question": "Bonus!",
                "answers": [
                    {
                        "correct": "true",
                        "text": "OK"
                    }
                ]
            })
    }
    shuffleArray(questions);

    // background image
    const w = 95;
    const h = 95;
    $("#container").css('width', w + 'vw');
    $("#container").css('height', h + 'vh');
    $("#container").css('background-size', 'cover');
    $("#container").css('background-position', 'center');
    $("#container").css('background-image', 'url(' + data.background + ')');


    // adding the question blocks
    for (let i = 0; i < totalBlocks; i++) {
        $("#container").append(
            $(`<div class='block' data-id='${i}'>`)
        );
    }




    // styling the question blocks
    const blockw = w / data.width;
    const blockh = h / data.height;
    $(".block").css('width', blockw + 'vw');
    $(".block").css('height', blockh + 'vh');
    $(".block").css('box-sizing', 'border-box');
    $(".block").css('background-color', data.color);
    $(".block").css('border', "2px solid black");

    // clicking on a block should show the question
    $(".block").click(function () {
        const id = $(this).attr("data-id");
        const q = questions[id];

        // show the question
        showQuestion();

        // make this one active
        $(this).css("background-color", data['active-color']);


        $("#question h1").text(q.question);

        // put the answer buttons in random order
        shuffleArray(q.answers);
        q.answers.forEach(a => {
            $("#answers").append(
                $("<div>")
                    .text(a.text)
                    .attr("class", "answer answer-button")
                    .attr("data-correct", a.correct)
                    .attr("data-id", id)
            )
        });

        // clicking on an answer
        $(".answer-button").click(function () {
            const id = $(this).attr("data-id");
            const correct = $(this).attr("data-correct");

            if (correct === "true") {
                hideBlock(id);
            } else {
                $(".answer").hide();
                $("#wrong").show();
                $("#answers").append(
                    $("<div>")
                        .text("Ok")
                        .attr("class", "answer close-button")
                )

                $(".close-button").click(function () {
                    console.log("closing")
                    hideQuestion()
                })
            }
        });

    })

    $(".close-button").click(function () {
        console.log("closing")
        hideQuestion()
    })

});

function showQuestion() {
    // empty the previous answers
    $(".answer").remove();
    // show the question box
    $("#question").show();
    // hide the feedback
    $("#wrong").hide();
    // make all blocks inactive
    $(".block").css("background-color", data['color']);
}

function hideQuestion() {
    // show the question box
    $("#question").hide();
    // make all blocks inactive
    $(".block").css("background-color", data['color']);
}

function hideBlock(id) {
    // hide the question
    $("#question").hide();
    // hide the block
    $(`*[data-id="${id}"]`).css("visibility", "hidden");
}


// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
import data from './data.json' assert { type: 'json' };

$( document ).ready(function() {
    console.log( "ready!" );

    $("#question").hide();

    // background image
    const w = 95;
    const h = 95;
    $("#container").css('width', w + 'vw');
    $("#container").css('height', h + 'vh');
    $("#container").css('background-size', 'cover');
    $("#container").css('background-position', 'center');
    $("#container").css('background-image', 'url(' + data.background + ')');


    // adding the question blocks

    $("#container").append(
        $("<div class='block'>")
    ).append(
        $("<div class='block'>")
    ).append(
        $("<div class='block'>")
    );

    // styling the question blocks
    const blockw =  w / data.width;
    const blockh = h / data.height;
    $(".block").css('width', blockw + 'vw');
    $(".block").css('height', blockh + 'vh');
    $(".block").css('box-sizing', 'border-box');
    $(".block").css('background-color', data.color);
    $(".block").css('border', "2px solid black");

    console.log(data.questions);

});
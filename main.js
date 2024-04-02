let song = null;
let leftWristX = null;
let leftWristY = null;
let rightWristX = null;
let rightWristY = null;
let scoreLeftWrist = null;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modeLoaded);
    poseNet.on("pose",getPoses)
}



function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modeLoaded() {
    console.log("Model Loaded");
}

function getPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of the left wrist : "+scoreLeftWrist)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("Left wrist x = "+leftWristX+"\n left Wrist y = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right wrist x = "+rightWristX+"\n right Wrist y = "+rightWristY);
    }
}

function draw() {
    image(video,0,0,600,500)

    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX, leftWristY, 20);

    if (scoreLeftWrist > 0.2) {
        inNumberLeftWristY = Number(leftWristY);
        removeDecimals = floor(leftWristY);
        volume = (removeDecimals/1000) * 2;

        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}
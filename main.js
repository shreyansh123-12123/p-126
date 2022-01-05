song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0; 
scoreRightwrist=0;

function setup(){
    canvas=createCanvas(600,400);
    canvas.position(430,270);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("model Loaded");
}
function draw(){
    image(video,0,0,600,400);
    fill("#ffff00");
    stroke("#ffff00");
    if (scoreRightwrist>0.2) {
    circle(rightWristX,rightWristY,15);
    if (rightWristY>0 && rightWristY<=100) {
      document.getElementById("speed").innerHTML="speed = 0.5x";
      song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }
    else if (rightWristY>300 && rightWristY<=400) {
        document.getElementById("speed").innerHTML=" speed = 2x";
        song.rate(2);
        
    }
    else if (rightWristY>400) {
        document.getElementById("speed").innerHTML=" speed = 2.5x";
        song.rate(2.5);
        
    }
        
     }
    if(scoreleftwrist>0.2){
    circle(leftWristX,leftWristY,15);
    inNumberLeftWristY=Number(leftWristY);
    removeDecimals=floor(inNumberLeftWristY);
    volume=removeDecimals/500;
    document.getElementById("volume").innerHTML= "volume = " + volume;
    song.setVolume(volume);
    }
}
function preload(){
    song= loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function pause(){
    song.pause();
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("score of left wrist = " + scoreleftwrist);
        scoreRightwrist=results[0].pose.keypoints[10].score;
        console.log("score of right wrist = " + scoreRightwrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristx = " + leftWristX + "leftWristy = " + leftWristY );
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristx = " + leftWristX + "rightWristy = " + rightWristY);
        
    }
    
    
}
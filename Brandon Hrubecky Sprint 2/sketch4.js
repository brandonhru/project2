let video 
let poseNet
let poses = [];
let moustanche
let cowboy
let shot


//*https://p5js.org/reference/#/p5/loadSound*//
function preload(){
  cowboy = loadSound('cowboy.mp3')
  shot = loadSound('shot.mp3')
  moustanche = createImg('moustache.png')
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}


function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}



function draw() {
    
    

 image(video, 0, 0, width, height);
    
    if (poses.length > 0) {
    const pose = poses[0].pose;
    console.log(pose);
    
    const rightWrist = pose.rightWrist;    
    const nose = pose.nose;
    moustanche.position(nose.x-65,nose.y+50)
    moustanche.size(150,150)  
    
  ellipse(rightWrist.x,rightWrist.y, 60)
    
//Move head to the left to play sound    
  if(nose.x < 200){
    if(!cowboy.isPlaying()){
      cowboy.play()
    }
  }
        
        
//Move right wrist up to play sound   
  if(rightWrist.y < 250){
    if(!shot.isPlaying()){
      shot.play()
    }
  }
}
}

function gotPose(poses){
  noseX = poses[0].pose.nose.x
  noseY = poses[0].pose.nose.y
  
  rightWristX = poses[0].pose.rightWrist.x
  rightWristY = poses[0].pose.rightWrist.y
}

function mouseClicked(){
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("getAudioContext().state" + getAudioContext().state);
  }
  };
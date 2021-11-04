let video 
let poseNet
let poses = [];
let moustanche
let hat


function preload(){
  moustanche = createImg('moustache.png')
  //Uncomment for Cowboy Hat
    //hat = createImg('hat.png')
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
    
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
    console.log(pose);

    // Create a pink ellipse for the nose
    //fill(213, 0, 143);
    //(nose.x, nose.y, 20, 20);
    const nose = pose.nose;
    moustanche.position(nose.x-65,nose.y+50)
    moustanche.size(150,150)  
      
      //COWBOY HAT OPTIONAL
        //hat.position(nose.x-120,nose.y-150)
        //hat.size(200,200)      
  }
}
    

function gotPose(poses){
  noseX = poses[0].pose.nose.x
  noseY = poses[0].pose.nose.y
}
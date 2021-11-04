/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    console.log(poses);
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  if (poses.length > 0) {    
    let nose = poses[0].pose.keypoints[0].position;
  	let leftEar = poses[0].pose.keypoints[3].position;
  	let rightEar = poses[0].pose.keypoints[4].position;
    fill(255, 64);
    ellipse(nose.x, nose.y,
            (rightEar.x - leftEar.x)*2,
            (rightEar.x - leftEar.x)*2);
  }
  
  // We can call both functions to draw all keypoints and the skeletons
  /*drawKeypoints();
  drawSkeleton();*/
}
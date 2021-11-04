let video;
let poseNet;

//varabiles for eye movements
let leftX = 0;
let leftY = 0;
let rightX = 0;
let rightY = 0;



function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);

	poseNet = ml5.poseNet(video, modelLoad);
	video.hide();
	poseNet.on('pose', gotPoses);
}



function gotPoses(poses) {
    
    
  //*https://editor.p5js.org/codingtrain/sketches/By8YLbXyE*//
	if (poses.length > 0) {
		let newLX = poses[0].pose.keypoints[1].position.x;
		let newLY = poses[0].pose.keypoints[1].position.y;
		let newRX = poses[0].pose.keypoints[2].position.x;
		let newRY = poses[0].pose.keypoints[2].position.y;
        
        //*https://p5js.org/reference/#/p5/lerp*//
        //*https://www.youtube.com/watch?v=8uLVnM36XUc*//
      //Lerp to calculate the transition when moving head around
		leftX = lerp(leftX, newLX, 0.5);
		leftY = lerp(leftY, newLY, 0.5);
		rightX = lerp(rightX, newRX, 1 );
		rightY = lerp(rightY, newRY, 0.5);
	}
}




function modelLoad() {
	console.log('model ready');
}



function draw() {
	image(video, 0, 0);
  //to scale the circles
  //distance between the eyes
//*https://p5js.org/reference/#/p5/dist*//    
	let space = dist(leftX, leftY, rightX, rightY)
	
    fill(255, 70, 255, 100);
    strokeWeight(0);
	ellipse(leftX, leftY, space - 10);
    
    noFill(0);
	strokeWeight(1);
	ellipse(leftX, leftY, space - 150);
    
    fill(0, 220, 125, 100);
	strokeWeight(0);
	ellipse(rightX, rightY, space - 50);
    
    noFill(0);
	strokeWeight(1);
	ellipse(rightX, rightY, space - 150);
 
}
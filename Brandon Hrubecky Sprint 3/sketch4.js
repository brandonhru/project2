let mic;

function setup() {
  createCanvas(500, 500);

  r = 255;
  g = 10;
  b = 300;
  strokeWeight(3);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {

  var micLevel = mic.getLevel();

  background(0);
  fill(255);

  fill(r, g, b);
  text("GIVE YOUR MUSIC/VOICE SOME LIFE!", 150, 15);

  
  rect(0, 500, 100, -100 - micLevel * 200);
  rect(100, 500, 100, -100 - micLevel * 500);
  rect(200, 500, 100, -100 - micLevel * 1500);
  rect(300, 500, 100, -100 - micLevel * 900);
  rect(400, 500, 100, -100 - micLevel * 1200);
}

function mousePressed() {
  r = random(256);
  g = random(256);
  b = random(256);
}

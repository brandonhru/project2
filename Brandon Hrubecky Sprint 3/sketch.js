let mic;

function setup() {
  createCanvas(500, 500);

  r = 255;
  g = 10;
  b = 300;
  strokeWeight(5);
    
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  var micLevel = mic.getLevel();
  background(0);
  fill(255);

  fill(r, g, b);
  ellipse(150, 300, 50 + micLevel * 1000);
  ellipse(350, 150, 100 + micLevel * 2000);
}

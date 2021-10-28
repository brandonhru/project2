
//BRANDON HRUBECKY


let osc;
let playing = false;
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let splitter;
let value1 = 0,
    value2 = 0,
    value3 = 0;

let osc1, osc2, osc3, fft;

let song, song2;
let num, num2, num3;

function setup() {

    createCanvas(windowWidth, windowHeight);

    ///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
    ///////////////////////////////////////////////////////////////////    

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results
    serial.list();
    console.log("serial.list()   ", serial.list());

    /////////////////////////////////////////////////////////////////////////////
    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("COM4");
    ////////////////////////////////////////////////////////////////////////////
    // Here are the callbacks that you can register

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port
    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);
    // OR
    //serial.onRawData(gotRawData);

    song = createAudio('assets/magic.mp3');
    song2 = createAudio('assets/halloween.mp3');

}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////

// We are connected and ready to go
function serverConnected() {
    console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    console.log("Serial Port is Open");
}

// Uh oh, here is an error, let's log it
function gotError(theerror) {
    console.log(theerror);
}

// There is data available to work with from the serial port
function gotData() {
    var currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    console.log("currentString  ", currentString); // println the string
    latestData = currentString; // save it for the draw method
    console.log("latestData" + latestData); //check to see if data is coming in
    splitter = split(latestData, ','); // split each number using the comma as a delimiter
    //console.log("splitter[0]" + splitter[0]); 
    value1 = splitter[0]; //put the first sensor's data into a variable
    value2 = splitter[1];
    value3 = splitter[2];
}

// We got raw data from the serial port
function gotRawData(thedata) {
    println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device


function draw() {
    
    //halloween song doesn't stop sorry
    if (value3 > 1) {
        
        background(value2, 120, value2);
        song2.stop;
    }
    
    //spooky halloween time
    if (value3 < 1) {
        
        background(0, 0, 0);
        
        
        playSpooky();
    }
    
//Circle moving around and changing colours
ellipse(value2, value2, value2, value2);
ellipseMode(RADIUS);
fill(value2,0,255);
    
    playMagic();
}

function playMagic() {
    
    if (value1 == 1) {
        
        song.loop();
        
        drawSquares();
    }
    if (value1 == 0) {
        
        
        song.stop();
    }
};

//*https://www.w3schools.com/js/js_random.asp*//
//*https://p5js.org/reference/#/p5/floor*//
//*https://p5js.org/reference/#/p5/random*//

//Examples from p5 editor
//*https://editor.p5js.org/aferriss/sketches/H1KNdXLdf*//
//*https://editor.p5js.org/allison.parrish/sketches/HyknCgw5b*//
function drawSquares() {
    
    for (let i = 0; i < 10; i++) {
        num = Math.floor(Math.random() * windowWidth + 260);
        
        num2 = Math.floor(Math.random() * windowHeight + 150);
        
        num3 = Math.floor(Math.random() * 300);
        fill(200, 75 + num2, 45 + num);
        
        
        noStroke();
        square(num, num2, num3);
    }
};


//Halloween song function
//I couldn't figure out how to stop the halloween song after you remove your hand from light sensor.
function playSpooky() {
    
    song2.play();
    
    fill(255);
    
    textSize(40);
    textAlign(CENTER);
    text("PLEASE REMOVE YOUR HAND ITS DARK AND SCARY", windowWidth / 2, windowHeight / 2);
    
    ellipseMode(RADIUS);    
 
    
    
};


//p5 canvas
let canvas;

//dom element
let webcam;

//vars
var e2e = 0;
var s2s = 0;
var a2a = 0;

var e2n = 0;
var e2s = 0;
var e2a = 0;

var s2n = 0;
var s2a = 0;
var s2e = 0;

var a2n = 0;

//tfjs-model
let poseNet;

//status
let isPosNetReady = false;
let isLoadingReady = false;

var isSave = false;

//function to load loaddscreen
function preload() {
    // https://gifimage.net/loading-gif-orange-11/
    loading = createImg('pics/loadingimg.gif', 'Loading', loadingLoaded);
    hat = loadImage('pics/hat.png');
    bcap = loadImage('pics/bcap.png');
    eyeframe0 = loadImage('pics/eyeframe0.png');
    eyeframe1 = loadImage('pics/eyeframe1.png');
    eyeframe2 = loadImage('pics/eyeframe2.png');    
    earring = loadImage('pics/earrings.png');
    necklace = loadImage('pics/necklace.png');
    nose = loadImage('pics/nose.png')
}

//non looping function
function setup() {
    //creating canvas
    canvas = createCanvas(windowWidth, windowHeight);
    //positioning dom element canvas
    canvas.position(0, 0);
    canvas.style('z-index', -1);
    
    //turning on webcam
    webcam = createCapture(VIDEO);
    // setting webcam
    webcam.size(width, height);
    // hiding webcam output
    webcam.hide();
    
    //loading posnet model
    poseNet = ml5.poseNet(webcam, poseNetReady);
    
    //if model encounters event "pose" it calls gotPosses
    poseNet.on('pose', encounteredPosses);
}

//looping function
function draw() {
    //if model is ready then use it
    if (isPosNetReady) {
        loading.hide();
        
        //bg of canvas
        background(255, 0);
        
        //putting webcam output in canvas
        image(webcam, 0, 0, width, height);
        
        //show dots and labels
        // showit();   
        //join dots
        // shapeit();

        if(isBcap) putBcap();
        if(isHat)puthat();
        if(isNecklace) putnecklace();
        if(isEarrings) putearrings();
        if(isNose) putnose();
        if(isEyeframe0) puteyeframe0();
        if(isEyeframe1) puteyeframe1();
        if(isEyeframe2) puteyeframe2();
        
    }
    // otherwise show loading screen
    else {
        //if loading screen ready then show it
        if (isLoadingReady) {
            background(0);
            loading.position((width / 2) - (loading.width / 2), (height / 2) - (loading.height / 2));
            // image(loading,(width/2)-(loading.width/2), (height/2)-(loading.height/2),loading.width,loading.height);
        } 
        // otherwise show black screen with loading text
        else {
            background(0);
            text('Loading...',width/2,height/2);
        }
    }
    updatedists();
}//end of draw

//function to check wheter model is ready to use or not
function poseNetReady() {
    isPosNetReady = true;
    console.log("model ready!!");
}

//func to check wheather load screen is ready or not
function loadingLoaded() {
    isLoadingReady = true;
    console.log('loading loaded!!')
}

function puthat(){
    image(hat, rsldX, rearY-1.6*e2s,s2s,1.5*e2s);
}

function putBcap(){
    image(bcap, rsldX, rearY-2*e2s,s2s,1.5*e2s);
}

function puteyeframe0(){
    image(eyeframe0, reyeX-e2e/2, reyeY-30, 2*e2e, 2*e2n);
}

function puteyeframe1(){
    image(eyeframe1, reyeX-e2e/2, reyeY-30, 2*e2e, 2*e2n);
}

function puteyeframe2(){
    image(eyeframe2, reyeX-e2e/2, reyeY-30, 2*e2e, 2*e2n);
}

function putearrings(){
    image(earring, learX-earring.width/2, learY-earring.height/6, earring.width, 2*a2s/3);
    image(earring, rearX-earring.width/2, rearY-earring.height/6, earring.width, 2*a2s/3);
}

function putnecklace(){
    image(necklace, rsldX, (rearY+rsldY)/2, s2s, e2s);
}

function putnose(){
    image(nose, noseX-e2e/4, noseY-e2e/4, e2e/2, e2e/2);
}

function updatedists(){
    e2e = dist(leyeX, leyeY, reyeX, reyeY);
    s2s = dist(lsldX, lsldY, rsldX, rsldY);
    a2a = dist(learX, learY, rearX, rearY);

    e2n = dist((leyeX+reyeX)/2,(leyeY+reyeY)/2, noseX, noseY);
    e2s = dist((leyeX+reyeX)/2,(leyeY+reyeY)/2, (lsldX+rsldX)/2, (lsldY+rsldY)/2);
    e2a = dist((leyeX+reyeX)/2,(leyeY+reyeY)/2, (learX+rearX)/2, (learY+rearY)/2);

    s2n = dist((lsldX+rsldX)/2, (lsldY+rsldY)/2, noseX, noseY);
    s2a = dist((lsldX+rsldX)/2, (lsldY+rsldY)/2, (learX+rearX)/2, (learY+rearY)/2);
    s2e = e2s;
    
    a2n = dist((learX+rearX)/2, (learY+rearY)/2, noseX, noseY);
    a2s = s2a;
    a2e = e2a
    
}
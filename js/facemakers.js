//nose position container
let noseX = 0;
let noseY = 0;

//left eye position container
let leyeX = 0;
let leyeY = 0;

//right eye position container
let reyeX = 0;
let reyeY = 0;

//left ear position container
let learX = 0;
let learY = 0;

//right ear position container
let rearX = 0;
let rearY = 0;

//left shoulder position container
let lsldX = 0;
let lsldY = 0;

//right shoulder position container
let rsldX = 0;
let rsldY = 0;


//function to initialize objects after  getting posses
function encounteredPosses(poses) {
    // console.log(poses);
    //to create objects there must be a pose!!
    if (poses.length > 0) {
        posit(poses);
    }
}


//func to render parts of poses
function showit() {
    noStroke();

    //to scale depth, using near nabours to estimate depth
    let d = dist(noseX, noseY, leyeX, leyeY) / 3;

    //nose
    fill(222, 2, 222);
    ellipse(noseX, noseY, d);
    fill(255);
    text('nose', noseX, noseY);

    //eyes
    fill(111, 1, 111)
    ellipse(leyeX, leyeY, d);
    ellipse(reyeX, reyeY, d);
    fill(255);
    text('left-eye', leyeX, leyeY);
    text('right-eye', reyeX, reyeY);

    //ears
    fill(22, 2, 22);
    ellipse(learX, learY, d);
    ellipse(rearX, rearY, d);
    fill(255);
    text('left-ear', learX, learY);
    text('right-ear', rearX, rearY);

    //shoulders
    fill(11, 1, 11);
    ellipse(lsldX, lsldY, d);
    ellipse(rsldX, rsldY, d);
    fill(255);
    text('left-shoulder', lsldX, lsldY);
    text('right-shoulder', rsldX, rsldY);
}

//func to connect parts of poses
function shapeit() {
    noFill();
    stroke(111);

    beginShape();
    vertex(noseX, noseY);
    vertex(leyeX, leyeY);
    vertex(reyeX, reyeY);
    vertex(noseX, noseY);
    endShape(CLOSE);
    beginShape();
    vertex(noseX, noseY);
    vertex(lsldX, lsldY);
    vertex(rsldX, rsldY);
    vertex(noseX, noseY);
    endShape(CLOSE);
    beginShape();
    vertex(learX, learY);
    vertex(noseX, noseY);
    vertex(rearX, rearY);
    endShape();
    beginShape();
    vertex(leyeX, leyeY);
    vertex(learX, learY);
    vertex(lsldX, lsldY);
    vertex(rsldX, rsldY);
    vertex(rearX, rearY);
    vertex(reyeX, reyeY);
    endShape(CLOSE);
}


//func to store identified parts of poses
function posit(poses) {
    //x,y pos of nose
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    //decreasing noise
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);

    //x,y pos of left eye
    let leX = poses[0].pose.keypoints[1].position.x;
    let leY = poses[0].pose.keypoints[1].position.y;
    //decreasing noice
    leyeX = lerp(leyeX, leX, 0.5);
    leyeY = lerp(leyeY, leY, 0.5);

    //x,y pos of right eye
    let reX = poses[0].pose.keypoints[2].position.x;
    let reY = poses[0].pose.keypoints[2].position.y;
    //decreasing noice
    reyeX = lerp(reyeX, reX, 0.5);
    reyeY = lerp(reyeY, reY, 0.5);

    //x,y pos of left ear
    let laX = poses[0].pose.keypoints[3].position.x;
    let laY = poses[0].pose.keypoints[3].position.y;
    //decreasing noice
    learX = lerp(learX, laX, 0.5);
    learY = lerp(learY, laY, 0.5);

    //x,y pos of right ear
    let raX = poses[0].pose.keypoints[4].position.x;
    let raY = poses[0].pose.keypoints[4].position.y;
    //decreasing noice
    rearX = lerp(rearX, raX, 0.5);
    rearY = lerp(rearY, raY, 0.5);

    //x,y pos of left shoulder
    let lsX = poses[0].pose.keypoints[5].position.x;
    let lsY = poses[0].pose.keypoints[5].position.y;
    //decreasing noice
    lsldX = lerp(lsldX, lsX, 0.5);
    lsldY = lerp(lsldY, lsY, 0.5);

    //x,y pos of right shoulder
    let rsX = poses[0].pose.keypoints[6].position.x;
    let rsY = poses[0].pose.keypoints[6].position.y;
    //decreasing noice
    rsldX = lerp(rsldX, rsX, 0.5);
    rsldY = lerp(rsldY, rsY, 0.5);
}
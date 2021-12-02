img="";
status="";
objects=[];
function preload(){
    img=loadImage('dog_cat.jpg');
    }
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
object_detector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded(){
console.log("your model is initialised");
status=true;
}
function gotResults(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
image(video,0,0,380,380);
if(status!=""){
r= random(255);
g= random(255);
b= random(255);
object_detector.detect(video,gotResults);
for(i=0; i<objects.length; i++){
document.getElementById("status").innerHTML="stats: Object Detected";
document.getElementById("number_of_objects").innerHTML="number of objects detected"+objects.length;
fill(r,g,b);
noFill();
stroke(r,g,b);
percent=floor(objects[i].confidence*100);
text(objects[i].label+ " "+percent+"%",objects[i].x+15,objects[i].y+15);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

}
}
}
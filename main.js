object=[];
status="";
function setup(){
canvas=createCanvas(500,400);
canvas.center();
video=createCapture(VIDEO);
video.size(500,400)
video.hide();
}
function Start(){
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status:Object Detecting";
objectDetected=document.getElementById("object_text").value;
}
function modelLoaded(){
console.log("Model Loaded!");
status=true;
}
function draw(){
image(video,0,0,500,400);
if(status!=""){
objectDetector.detect(video,gotresult);
for(i=0;i<object.length;i++){
document.getElementById("status").innerHTML="Status:Object Detected";
fill("#FF0000");
noFill();
stroke("#FF0000");
percent=floor(object[i].confidence*100);
text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
rect(object[i].x,object[i].y,object[i].width,object[i].height);
if(object[i].label==objectDetected){
video.stop();
objectDetector.detect(gotresult);
document.getElementById("object_status").innerHTML=objectDetected+" Found";
synth=window.speechSynthesis;
utterThis=new SpeechSynthesisUtterance(objectDetected+"found");
synth.speak(utterThis);
}
else{
document.getElementById("object_status").innerHTML=objectDetected+" Not found";
}
}
}
}
function gotresult(error,results){
if(error){
console.error(error);
}
else{
console.log(results);
object=results;
}
}
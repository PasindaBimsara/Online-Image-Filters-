var image = null;
var canvas = document.getElementById("can1");
var img = null;

function loadImage(){
  var finput = document.getElementById("imgfile");
  image = new SimpleImage(finput);
  image.drawTo(canvas);
}

function doclear(){
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetimage() {
  if(image == null || !image.complete()){
    alert("image not loaded!");
    return ;
  }
  doclear();
  loadImage();
}

function grayscale(){
  if(image == null || !image.complete()){
    alert("image not loaded!");
    return ;
  }
  var img = new SimpleImage(image);
  for(var pixel of img.values()){
    var g = pixel.getGreen();
    var r = pixel.getRed();
    var b = pixel.getBlue();
    var avg = (r + g + b)/3;
    pixel.setGreen(avg);
    pixel.setRed(avg);
    pixel.setBlue(avg);
  }
  img.drawTo(canvas);
}

function red(){
  if(image == null || !image.complete()){
    alert("image not loaded!");
    return ;
  }
  doclear();
  var img = new SimpleImage(image);
  for(var pixel of img.values()){
    var g = pixel.getGreen();
    var r = pixel.getRed();
    var b = pixel.getBlue();
    var avg = (r + g + b)/3;
    if(avg < 128) {
      pixel.setGreen(0);
      pixel.setRed(avg*2);
      pixel.setBlue(0);
    }
    else {
      pixel.setGreen(avg*2 - 255);
      pixel.setRed(255);
      pixel.setBlue(avg*2 - 255);
    }
  }
  img.drawTo(canvas);
}
function redpixel(pixel, avg){
  if(avg < 128) {
      pixel.setGreen(0);
      pixel.setRed(avg*2);
      pixel.setBlue(0);
    }
    else {
      pixel.setGreen(avg*2 - 255);
      pixel.setRed(255);
      pixel.setBlue(avg*2 - 255);
    }
  return pixel;
}

function orangepixel(pixel, avg){
  if(avg < 128) {
      pixel.setGreen(0.8*avg);
      pixel.setRed(avg*2);
      pixel.setBlue(0);
    }
    else {
      pixel.setGreen(avg*1.2 - 51);
      pixel.setRed(255);
      pixel.setBlue(avg*2 - 255);
    }
  return pixel;
}

function yellowpixel(pixel, avg){
  if(avg < 128) {
      pixel.setGreen(avg*2);
      pixel.setRed(avg*2);
      pixel.setBlue(0);
    }
    else {
      pixel.setGreen(255);
      pixel.setRed(255);
      pixel.setBlue(avg*2 - 255);
    }
  return pixel;
}

function greenpixel(pixel, avg){
  if(avg < 128) {
      pixel.setGreen(avg*2);
      pixel.setRed(0);
      pixel.setBlue(0);
    }
    else {
      pixel.setGreen(255);
      pixel.setRed(avg*2 - 255);
      pixel.setBlue(avg*2 - 255);
    }
  return pixel;
}

function bluepixel(pixel, avg){
  if(avg < 128) {
      pixel.setGreen(0);
      pixel.setRed(0);
      pixel.setBlue(avg*2);
    }
    else {
      pixel.setGreen(avg*2 - 255);
      pixel.setRed(avg*2 - 255);
      pixel.setBlue(255);
    }
  return pixel;
}

function indigopixel(pixel, avg){
  if(avg < 128) {
      pixel.setGreen(0);
      pixel.setRed(0.8*avg);
      pixel.setBlue(avg*2);
    }
    else {
      pixel.setGreen(avg*1.2 - 51);
      pixel.setRed(avg*2 - 255);
      pixel.setBlue(255);
    }
  return pixel;
}

function violetpixel(pixel, avg){
  if(avg < 128) {
      pixel.setGreen(0);
      pixel.setRed(1.6*avg);
      pixel.setBlue(avg*1.6);
    }
    else {
      pixel.setGreen(avg*2 - 255);
      pixel.setRed(avg*0.4 + 153);
      pixel.setBlue(avg*0.4 + 153);
    }
  return pixel;
}
function rainbow() {
  if(image == null || !image.complete()){
    alert("image not loaded!");
    return ;
  }
  var img = new SimpleImage(image);
  var ht = img.getHeight()/7;
  for(var pixel of img.values()) {
    var y = pixel.getY();
    var x = pixel.getX();
    var g = pixel.getGreen();
    var r = pixel.getRed();
    var b = pixel.getBlue();
    var avg = (r + g + b)/3;
    if(y < ht){
      pixel = redpixel(pixel,avg);
    }
    else if(y < 2*ht){
      pixel = orangepixel(pixel,avg);
    }
    else if(y < 3*ht){
      pixel = yellowpixel(pixel,avg);
    }
    else if(y < 4*ht){
      pixel = greenpixel(pixel,avg);
    }
    else if(y < 5*ht){
      pixel = bluepixel(pixel,avg);
    }
    else if(y < 6*ht){
      pixel = indigopixel(pixel,avg);
    }
    else{
      pixel = violetpixel(pixel,avg);
    }
  }
  img.drawTo(canvas);
}

function blurred(){
  if(image == null || !image.complete()){
    alert("image not loaded!");
    return ;
  }
  var img = new SimpleImage(image.getWidth(),image.getHeight());
  var w = img.getWidth();
  var h = img.getHeight();
  for(var pixel of image.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if(Math.random() < 0.5){
      img.setPixel(x,y,pixel);
    }
    else{
      var i = x + Math.floor(Math.random() * 21) - 10;
      var j = y + Math.floor(Math.random() * 21) - 10;
      if(i < 0 || j < 0 || i >= w || j >= h){
        img.setPixel(x,y,pixel);
      }
      else{
        img.setPixel(x, y, image.getPixel(i,j));
      }
    }
  }
  img.drawTo(canvas);
}
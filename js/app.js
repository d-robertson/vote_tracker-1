//client id: 23385f4af386c7a

//client secret: a9c40f8b08e0aa6995adfc90e6bfb415ef9c519a

//data.images[0]

'use strict';
$(document).ready(function(){

  var pics = [];
  var tracker;

$.ajax({
  url: 'https://api.imgur.com/3/album/DDoWy.json',
  method: 'GET',
  headers: {
    'Authorization': 'Client-ID 23385f4af386c7a'
  }
})
.done(function(res) {
  pics = res.data.images;
  console.log(pics);

  for (var i = 0; i < pics.length; i++) {
    photoArray[i] = new Photo(pics[i].link);
  }
  console.log(photoArray);
  tracker = new Tracker();

  catData[0].value = tracker.leftPhoto.vote;
  catData[1].value = tracker.rightPhoto.vote;

  rightPhoto.click(tracker.rightVote);
  leftPhoto.click(tracker.leftVote);
  $('#reset').click(tracker.reset);

  tracker.displayPhotos();
})
.fail(function(err) {
  console.log(err);
});


  var catData = [
    {
      value: 1,
      color: '#ff0000'
    },

    {
      value: 1,
      color: '#0000ff'
    }
  ];

  var catOptions = {
    segmentShowStroke : true,
    percentageInnerCutout: 50,
    animateScale : true
  };


  var cats = document.getElementById('catChart').getContext('2d');
  var catChart = new Chart(cats).Pie(catData, catOptions);

  var Photo = function(fileLocation){
    this.path = fileLocation;
    this.vote = 1;
  }

  //new objects
  // var pic1 = new Photo('img/1.jpg');
  // var pic2 = new Photo('img/2.jpg');
  // var pic3 = new Photo('img/3.jpg');
  // var pic4 = new Photo('img/4.jpg');
  // var pic5 = new Photo('img/5.jpg');
  // var pic6 = new Photo('img/6.jpg');
  // var pic7 = new Photo('img/7.jpg');
  // var pic8 = new Photo('img/8.jpg');
  // var pic9 = new Photo('img/9.jpg');
  // var pic10 = new Photo('img/10.jpg');
  // var pic11 = new Photo('img/11.jpg');
  // var pic12 = new Photo('img/12.jpg');
  // var pic13 = new Photo('img/13.jpg');
  // var pic14 = new Photo('img/14.jpg');

  var photoArray =[];

  var rightPhoto = $('#rightPhoto');

  var leftPhoto = $('#leftPhoto');

  var randomPic = function() {
    return Math.floor(Math.random()*(14 - 0));
  };

  var Tracker = function(){
    this.leftPhoto = photoArray[randomPic()];
    this.rightPhoto = photoArray[randomPic()];

    while (this.leftPhoto.path === this.rightPhoto.path) {
      this.rightPhoto = photoArray[randomPic()];
    }
  };

  Tracker.prototype.rightVote = function(){
    tracker.rightPhoto.vote++
    //console.log(tracker.rightPhoto.vote);
    catChart.segments[0].value = tracker.rightPhoto.vote;
    catChart.update();
     $("#reset").show();
  };

  Tracker.prototype.leftVote = function(){
    tracker.leftPhoto.vote++
    //console.log(tracker.leftPhoto.vote);
    catChart.segments[1].value = tracker.leftPhoto.vote;
    catChart.update();
    $("#reset").show();
  };

  Tracker.prototype.reset = function(){
    tracker.leftPhoto = photoArray[randomPic()];
    tracker.rightPhoto = photoArray[randomPic()];
    catChart.segments[0].value = tracker.rightPhoto.vote;
    catChart.segments[1].value = tracker.leftPhoto.vote;
    tracker.displayPhotos();
    catChart.update();

    if (tracker.leftPhoto.path === tracker.rightPhoto.path) {
      tracker.reset();
    }

  };

  Tracker.prototype.displayPhotos = function() {
    var rightContent = '<img src="' + this.rightPhoto.path + '" />';
    var leftContent = '<img src="' + this.leftPhoto.path + '" />';
    rightPhoto.html(rightContent);
    leftPhoto.html(leftContent);
    $("#reset").hide();
  }






});

'use strict';
$(document).ready(function(){


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
    segmentShowStroke : false,
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
  var pic1 = new Photo('img/1.jpg');
  var pic2 = new Photo('img/2.jpg');
  var pic3 = new Photo('img/3.jpg');
  var pic4 = new Photo('img/4.jpg');
  var pic5 = new Photo('img/5.jpg');
  var pic6 = new Photo('img/6.jpg');
  var pic7 = new Photo('img/7.jpg');
  var pic8 = new Photo('img/8.jpg');
  var pic9 = new Photo('img/9.jpg');
  var pic10 = new Photo('img/10.jpg');
  var pic11 = new Photo('img/11.jpg');
  var pic12 = new Photo('img/12.jpg');
  var pic13 = new Photo('img/13.jpg');
  var pic14 = new Photo('img/14.jpg');

  var photoArray =[pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10,pic11,pic12,pic13,pic14];

  var rightPhoto = $('#rightPhoto');

  var leftPhoto = $('#leftPhoto');

  var randomPic = function() {
    return Math.floor(Math.random()*(14 - 0));
  };

  var Tracker = function(){
    this.leftPhoto = photoArray[randomPic()];
    this.rightPhoto = photoArray[randomPic()];
    console.log(this.leftPhoto);
    console.log(this.rightPhoto);

    while (this.leftPhoto.path === this.rightPhoto.path) {
      this.rightPhoto = photoArray[randomPic()];
    }
  };

  var tracker = new Tracker();
  catData[0].value = tracker.leftPhoto.vote;
  catData[1].value = tracker.rightPhoto.vote;

  Tracker.prototype.rightVote = function(){
    tracker.rightPhoto.vote++
    //console.log(tracker.rightPhoto.vote);
    catChart.segments[0].value = tracker.rightPhoto.vote;
    catChart.update();
  };

  Tracker.prototype.leftVote = function(){
    tracker.leftPhoto.vote++
    //console.log(tracker.leftPhoto.vote);
    catChart.segments[1].value = tracker.leftPhoto.vote;
    catChart.update();
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
  }

  rightPhoto.click(tracker.rightVote);
  leftPhoto.click(tracker.leftVote);
  $('#reset').click(tracker.reset);


  tracker.displayPhotos();

});

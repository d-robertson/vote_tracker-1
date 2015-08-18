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
    percentageInnerCutout: 75,
    animateScale : true
  };
//Chart
  var cats = document.getElementById('catChart').getContext('2d');
  var catChart = new Chart(cats).Pie(catData, catOptions);
 //Constructor Function
   var Photo = function(fileLocation){//  constructor
    this.path = fileLocation;
    this.vote = 0;
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

   var rightPhoto = document.getElementById('rightPhoto');

   var leftPhoto = document.getElementById('leftPhoto');

   var reset = document.getElementById('reset');

//Connects all the functions
var cat = function(){
  //hides reset button
  $('#reset').hide();
  //Generates Random Number to choose which number in the array
    var randomPic = function() {
      return Math.floor(Math.random()*(14 - 0));
    };
  //Chooses Photo for left and right from the array
    var Tracker = function(){
      this.leftPhoto = photoArray[randomPic()];
      this.rightPhoto = photoArray[randomPic()];
      console.log(this.leftPhoto);
      console.log(this.rightPhoto);
  //Makes it find a new photo if the right and the left images are the same
      while (this.leftPhoto === this.rightPhoto) {
        this.rightPhoto = photoArray[randomPic()];
      }
    };
  //define the value of both sides of the graph
     var tracker = new Tracker();
     catData[0].value = tracker.leftPhoto.vote;
     catData[1].value = tracker.rightPhoto.vote;
  //Function registered if right pic is clicked
    Tracker.prototype.rightVote = function(){
      catChart.segments[0].value++
      catChart.update();
      };
      //show reset
      $('#reset').show();


  //Function registered if left pic is clicked
    Tracker.prototype.leftVote = function(){
      catChart.segments[1].value++
      catChart.update();
      //show reset
      $('#reset').show();

    };

      Tracker.prototype.addVote = function(selected) {
        console.log(selected);
        for(var i = 0; i < photoArray.length; i++) {
          if(selected === photoArray[i].path) {
            photoArray[i].vote++;
            console.log(photoArray[i].vote);
            return;

          }
        }
      }
  //Resets the score of the graph and picks a new image
      Tracker.prototype.reset = function(){
    catChart.segments[0].value = 1;
    catChart.segments[1].value = 1;
    catChart.update();
    //hide reset
    cat();
    };


    // Tracker.prototype.addVote = function(selected) {
    //   console.dir(selected);
    // }


  //displays the Photos
    Tracker.prototype.displayPhotos = function() {
      var rightContent = '<img src="' + this.rightPhoto.path + '" />';
      var leftContent = '<img src="' + this.leftPhoto.path + '" />';
      rightPhoto.innerHTML = rightContent;
      leftPhoto.innerHTML = leftContent;
    }
    rightPhoto.addEventListener('click', function(e){
      console.dir(e);
      tracker.rightVote();
      tracker.addVote(e.target.attributes[0].value)
    });
    leftPhoto.addEventListener('click',tracker.leftVote);
    reset.addEventListener('click',tracker.reset);



    tracker.displayPhotos();
  }




cat();

});

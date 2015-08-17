'use strict';



 var Photo = function(fileLocation){//	constructor
 	this.path = fileLocation;
 	this.vote = 1;
 }

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

var randomPic = function() {
	return Math.floor(Math.random()*(14 - 0));

};

 var Tracker = function(){
 	this.leftPhoto = photoArray[randomPic()];
 	this.rightPhoto = photoArray[randomPic()];
 	console.log(this.leftPhoto);
 	console.log(this.rightPhoto);
 	while (this.leftPhoto === this.rightPhoto) {
 		this.rightPhoto = photoArray[randomPic()];
 	} 
 }

 var tracker = new Tracker();

Tracker.prototype.receiveVote = function() {
	// receive the click
	// increment the vote count
	// highlight()
	// drawthechart()
	// giveUseroptiontovoteAgain()
};

Tracker.prototype.rightVote = function(){
	console.log	(this.rightPhoto.vote); 
}


Tracker.prototype.leftVote = function(){
	console.log	('left photo');

}
	 	
	
Tracker.prototype.displayPhotos = function() {
  var rightContent = '<img src="' + this.rightPhoto.path + '" />';
  var leftContent = '<img src="' + this.leftPhoto.path + '" />';
  rightPhoto.innerHTML = rightContent;
  leftPhoto.innerHTML = leftContent;
}

rightPhoto.addEventListener('click',tracker.rightVote);
leftPhoto.addEventListener('click',tracker.leftVote);



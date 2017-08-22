// Code Planning
// 1. Create HTML slots for photos to appear
// 2. Create constructor function and push all objects to an array
// 3. Create function to randomize images - global variables for pictures 1, 2, and 3
// 4. Ensure that variables are reset at beginning of function, and that function repeats until picture 2 is not the same as 1, and 3 is not the same as 1 or 2
// 5. Make sure on further iterations that pictures do not match any of the pictures from the previous set - alternating set of variables?
// 6. Set up event listener to "listen" for clicks on each image
// 7. "Score" how many times a picture is displayed (variable in constructor function?) and how many times it is clicked.

var itemArray = [];

function TestItem (name, filePath, itemID) {
  this.name = name;
  this.filePath = filePath;
  this.itemID = itemID;
  this.timesShown = 0;
  this.timesVoted = 0;
  itemArray.push(this);
}

var bag = new TestItem ('rolling R2D2 suitcase', 'img/bag.jpg', 'bag');
var banana = new TestItem ('banana slicer', 'img/banana.jpg', 'banana');
var bathroom = new TestItem ('tablet & toilet paper holder', 'img/bathroom.jpg', 'bathroom');
var boots = new TestItem ('yellow rain boots', 'img/boots.jpg', 'boots');
var breakfast = new TestItem ('multi-breakfast cooker', 'img/breakfast.jpg', 'breakfast');
var bubblegum = new TestItem ('meatball bubblegum', 'img/bubblegum.jpg', 'bubblegum');
var chair = new TestItem ('red chair', 'img/chair.jpg', 'chair');
var cthulhu = new TestItem ('cthulhu action figure', 'img/cthulhu.jpg', 'cthulhu');

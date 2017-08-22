// Code Planning
// 1. Create HTML slots for photos to appear
// 4. Ensure that variables are reset at beginning of function, and that function repeats until picture 2 is not the same as 1, and 3 is not the same as 1 or 2
// 5. Make sure on further iterations that pictures do not match any of the pictures from the previous set - alternating set of variables?
// 6. Set up event listener to "listen" for clicks on each image
// 7. "Score" how many times a picture is displayed (variable in constructor function?) and how many times it is clicked.

// 2. Create constructor function and push all objects to an array

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
var dogDuck = new TestItem ('dog ducklips', 'img/dog-duck.jpg', 'dogDuck');
var dragon = new TestItem ('dragon meat', 'img/dragon.jpg', 'dragon');
var pen = new TestItem ('pen utensils', 'img/pen.jpg', 'pen');
var petSweep = new TestItem ('pet sweeper shoes', 'img/pet-sweep.jpg', 'petSweep');
var scissors = new TestItem ('pizza scissors', 'img/scissors.jpg', 'scissors');
var shark = new TestItem ('shark sleeping bag', 'img/shark.jpg', 'shark');
var sweep = new TestItem ('baby sweeper suit', 'img/sweep.png', 'sweep');
var tauntaun = new TestItem ('tauntaun sleeping bag', 'img/tauntaun.jpg', 'tauntaun');
var unicorn = new TestItem ('unicorn meat', 'img/unicorn.jpg', 'unicorn');
var usb = new TestItem ('tentacle usb drive', 'img/usb.gif', 'usb');
var waterCan = new TestItem ('self-watering can', 'img/water-can.jpg', 'waterCan');
var wineGlass = new TestItem ('wine glass', 'img/wine-glass.jpg', 'wineGlass');

// 3. Create function to randomize images - global variables for pictures 1, 2, and 3

var p1 = 0;
var p2 = 0;
var p3 = 0;
var p4 = 0;
var p5 = 0;
var p6 = 0;

var randomPhoto = function() {
  p1 = math.floor(math.random() * (itemArray.length));
  p2 = math.floor(math.random() * (itemArray.length));
  if (p2 === p1) {
    p2 = math.floor(math.random() * (itemArray.length));
  }
  else {
    p3 = math.floor(math.random() * (itemArray.length));
    if (p3 === p2 || p3 === p1) {
      p3 = math.floor(math.random() * (itemArray.length));
    };
  };
};

var photo1 = document.getElementById('photo1');
var img1 = document.createElement('img');
img1.src = itemArray[p1].filePath;

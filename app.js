'use strict';

var maxClicks = 2;
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

var p1 = 0;
var p2 = 0;
var p3 = 0;
var previousPics = [];

var randomPhoto = function() {
  var photo1 = document.getElementById('photo1');
  var img1 = photo1.children[0];
  p1 = Math.floor(Math.random() * itemArray.length);
  while (previousPics.includes(p1)) {
    p1 = Math.floor(Math.random() * itemArray.length);
  }
  img1.src = itemArray[p1].filePath;
  img1.setAttribute('itemIndex', p1);
  var photo2 = document.getElementById('photo2');
  var img2 = photo2.children[0];
  p2 = Math.floor(Math.random() * itemArray.length);
  while (p2 === p1 || previousPics.includes(p2)) {
    p2 = Math.floor(Math.random() * itemArray.length);
  }
  img2.src = itemArray[p2].filePath;
  img2.setAttribute('itemIndex', p2);;
  var photo3 = document.getElementById('photo3');
  var img3 = photo3.children[0];
  p3 = Math.floor(Math.random() * itemArray.length);
  while (p3 === p2 || p3 === p1 || previousPics.includes(p3)) {
    p3 = Math.floor(Math.random() * itemArray.length);
  }
  img3.src = itemArray[p3].filePath;
  img3.setAttribute('itemIndex', p3);
  previousPics = [];
  previousPics.push(p1, p2, p3);
  itemArray[p1].timesShown += 1;
  itemArray[p2].timesShown += 1;
  itemArray[p3].timesShown += 1;
};

var voteOne = document.getElementById('img1');
var voteTwo = document.getElementById('img2');
var voteThree = document.getElementById('img3');
voteOne.addEventListener('click', voteCounter);
voteTwo.addEventListener('click', voteCounter);
voteThree.addEventListener('click', voteCounter);
var clickCounter = 0;

randomPhoto();
function voteCounter(event) {
  var itemIndex = parseInt(event.target.getAttribute('itemIndex'));
  var clickedItem = itemArray[itemIndex];
  clickedItem.timesVoted++;
  clickCounter++;
  if (clickCounter < maxClicks) {
    randomPhoto();
  }
  if (clickCounter === maxClicks) {
    chartVotes();
    voteOne.removeEventListener('click', voteCounter);
    voteTwo.removeEventListener('click', voteCounter);
    voteThree.removeEventListener('click', voteCounter);
  }
};

var voteList = document.getElementById('voteList');

var showVotes = function() {
  for (var i = 0; i < itemArray.length; i++) {
    if (itemArray[i].timesShown > 0) {
      var listItem = document.createElement('li');
      listItem.innerText = 'Voted for ' + itemArray[i].name + ' ' + parseInt(((itemArray[i].timesVoted / itemArray[i].timesShown) * 100)) + '% of times shown.';
      voteList.appendChild(listItem);
    }
    else if (itemArray[i].timesShown === 0) {
      var listItem = document.createElement('li');
      listItem.innerText = 'The ' + itemArray[i].name + ' was not shown.';
      voteList.appendChild(listItem);
    }
  }
};

var chartLabels = [];
var chartData = [];
var votedArray = [];
var shownArray = [];

var chartVotes = function() {
  for (var i = 0; i < itemArray.length; i++) {
    votedArray.push(itemArray[i].timesVoted);
    shownArray.push(itemArray[i].timesShown);
    if (itemArray[i].timesShown > 0) {
      chartLabels.push(itemArray[i].itemID);
      chartData.push(parseInt(((itemArray[i].timesVoted / itemArray[i].timesShown) * 100)));
    }
  }
  var ctx = document.getElementById('barChart').getContext('2d');
  var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: '# of Votes',
        data: chartData,
        backgroundColor: [
        ],
        borderColor: [
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
  storeData();
};
var storeData = function() {
  localStorage.setItem('votes', JSON.stringify(votedArray));
  localStorage.setItem('shown', JSON.stringify(shownArray));
};

if (localStorage.getItem('votes')) {
  var previousVotes = JSON.parse(localStorage.getItem('votes'));
  for (var i = 0; i < itemArray.length; i++) {
    itemArray[i].timesVoted = previousVotes[i];
  }
}
if (localStorage.getItem('shown')) {
  var previousShown = JSON.parse(localStorage.getItem('shown'));
  for (var i = 0; i < itemArray.length; i++) {
    itemArray[i].timesShown = previousShown[i];
  }
}

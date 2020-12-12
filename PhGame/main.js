const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
var modal = document.getElementById("myModal");
var btn = document.getElementById("question-btn");
var playAgainBtn = document.getElementById('play-again-btn')
var span = document.getElementsByClassName("close")[0];
var numberOfMatches = 0;

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

draggableElements.forEach((elem) => {
  elem.addEventListener("dragstart", dragStart);
});

droppableElements.forEach((elem) => {
  elem.addEventListener("dragenter", dragEnter);
  elem.addEventListener("dragover", dragOver);
  elem.addEventListener("dragleave", dragLeave);
  elem.addEventListener("drop", drop);
});


function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if (!event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function dragLeave(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function checkPlayAgain() {
  console.log(numberOfMatches);
  if(numberOfMatches == 5)
    playAgainBtn.style.display = "block";
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text");
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;
  if (isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped");
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
    numberOfMatches++;
    checkPlayAgain();
  }  
}

console.log(numberOfMatches);




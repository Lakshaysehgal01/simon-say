let gameSeq = [];
let userSeq = [];
let level = 0;
let color = ["yellow", "green", "red", "purple"];
let body = document.querySelector("body");
let h2 = document.querySelector("h2");
let started = false;
let highscore = [];
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;

    levelUp();
  }
});
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}
function levelUp() {
  level++;
  userSeq = [];
  h2.innerText = `level ${level}`;
  let randInt = Math.floor(Math.random() * 4);
  let randColor = color[randInt];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);
}
let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
function btnPress() {
  let btn = this;
  gameFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}
function checkAns(indx) {
  if (userSeq[indx] === gameSeq[indx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    highscore.push(level);
    let highestscore = 0;
    for (const high of highscore) {
      if (highestscore < high) {
        console.log(high);
        highestscore = high;
        h2.innerHTML = `Game over!! your score is <b>${level} </b><br>highest score was <b>${high}</b><br> press any key to start`;
      }
    }
    reset();
  }
}
function reset() {
  body.style.backgroundColor = "red";
  setTimeout(() => {
    body.style.backgroundColor = "white";
  }, 200);
  level = 0;
  started = false;
  gameSeq = [];
  userSeq = [];
}

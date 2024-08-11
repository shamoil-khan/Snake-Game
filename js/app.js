//? Game Constants & Variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
// const musicSound = new Audio("music/music.mp3");
const musicSound = new Audio("music/rest music.mp3");
// try {
// } catch (error) {
//   console.log(error);
// }
// const musicSound = new Audio("music/Awake.mp3");
let speed = 10;
let score = 0;
let lasPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// speedInput.addEventListener("keydown", () => {
//   speed = speedInput.value;
// });
//? Game Functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lasPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lasPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  //? If you bump into yourself

  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  //? If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  //? Part 1 : Updating The Snake Array & Food

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    try {
      musicSound.pause();
    } catch (error) {
      console.log(error);
    }
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press ok to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.currentTime = 0;
    musicSound.play();
    score = 0;
    scoreBox.innerHTML = "Score:" + score;
  }

  //? If you have eaten the food, increment the score and regenerate the food

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscore) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score:" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //? Movig The Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //? Part 2 : Display The Snake  & Food
  //? Display The Snake

  board.innerHTML = "";

  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //? Display The Food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//? Main Logic Starts here

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  let hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  //   inputDir = { x: 0, y: 1 }; //? Start The Game

  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      try {
        musicSound.play();
      } catch (error) {
        console.log(error);
      }

      try {
        musicSound.addEventListener("ended", () => {
          musicSound.play();
        });
      } catch (error) {
        console.log(error);
      }

      arrowUp.classList.add("clicked");

      arrowUp.addEventListener("transitionend", () => {
        arrowUp.classList.remove("clicked");
      });

      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      try {
        musicSound.play();
      } catch (error) {
        console.log(error);
      }
      try {
        musicSound.addEventListener("ended", () => {
          musicSound.play();
        });
      } catch (error) {
        console.log(error);
      }

      arrowDown.classList.add("clicked");

      arrowDown.addEventListener("transitionend", () => {
        arrowDown.classList.remove("clicked");
      });

      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      try {
        musicSound.play();
      } catch (error) {
        console.log(error);
      }
      try {
        musicSound.addEventListener("ended", () => {
          musicSound.play();
        });
      } catch (error) {
        console.log(error);
      }

      arrowLeft.classList.add("clicked");

      arrowLeft.addEventListener("transitionend", () => {
        arrowLeft.classList.remove("clicked");
      });
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      try {
        musicSound.play();
      } catch (error) {
        console.log(error);
      }
      try {
        musicSound.addEventListener("ended", () => {
          musicSound.play();
        });
      } catch (error) {
        console.log(error);
      }

      arrowRight.classList.add("clicked");

      arrowRight.addEventListener("transitionend", () => {
        arrowRight.classList.remove("clicked");
      });

      break;

    default:
      break;
  }
});

const arrowUp = document.querySelector(".arrowUp");
const arrowLeft = document.querySelector(".arrowLeft");
const arrowDown = document.querySelector(".arrowDown");
const arrowRight = document.querySelector(".arrowRight");

arrowUp.addEventListener("click", (e) => {
  inputDir.x = 0;
  inputDir.y = -1;
  musicSound.play();

  musicSound.addEventListener("ended", () => {
    musicSound.play();
  });
  e.target.classList.add("clicked");

  e.target.addEventListener("transitionend", () => {
    e.target.classList.remove("clicked");
  });
});
arrowLeft.addEventListener("click", (e) => {
  inputDir.x = -1;
  inputDir.y = 0;
  musicSound.play();
  musicSound.addEventListener("ended", () => {
    musicSound.play();
  });

  e.target.classList.add("clicked");

  e.target.addEventListener("transitionend", (e) => {
    e.target.classList.remove("clicked");
  });
});
arrowRight.addEventListener("click", (e) => {
  inputDir.x = 1;
  inputDir.y = 0;
  musicSound.play();
  musicSound.addEventListener("ended", () => {
    musicSound.play();
  });
  e.target.classList.add("clicked");

  e.target.addEventListener("transitionend", () => {
    e.target.classList.remove("clicked");
  });
});
arrowDown.addEventListener("click", (e) => {
  inputDir.x = 0;
  inputDir.y = 1;
  musicSound.play();
  musicSound.addEventListener("ended", () => {
    musicSound.play();
  });
  e.target.classList.add("clicked");

  e.target.addEventListener("transitionend", () => {
    e.target.classList.remove("clicked");
  });
});

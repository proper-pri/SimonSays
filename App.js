let userSeq = [];
let gameSeq = [];
let started = false;
let level = 0;

let btns = ["yellow", "green", "purple", "red"];
let h2 = document.querySelector("h2");
let leaderboard = []; // Array to store leaderboard entries

document.addEventListener("keypress", (e) => {
    if (!started) {
        console.log(e.key);
        started = true;
        levelUp();
    }
    console.log(e.key);
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userbtnFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level: ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    // Choose random button
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        console.log("same value");
        if (userSeq.length === gameSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    } else {
        h2.innerText = `Game Over. Your score Was : ${level}`;
        promptForScore();
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userbtnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
    console.log(userSeq);
}

let allBtn = document.querySelectorAll(".btn");

for (let btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
}

function promptForScore() {
    let name = prompt("Game Over! Enter your name to save your score:");
    if (name) {
        leaderboard.push({ name, score: level });
        updateLeaderboard();
    }
}

function updateLeaderboard() {
    // Sort leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    let leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = ""; // Clear existing entries

    // Display top 5 scores
    leaderboard.slice(0, 5).forEach(entry => {
        let li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(li);
    });
}

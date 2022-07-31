const canvas = document.getElementById('gameSnake');
const ctx = canvas.getContext('2d');
let titleCount = 20;
let sizeBoard = 25;
let titleSize = titleCount -2;
let headX = 10;
let headY = 10;
let xvelocity = 0;
let yvelocity = 0;
let xFood = 5;
let yFood = 5;
let speed = 5;
var snakeParts = [];
let tailLength = 2;
let score = 0;
let check = true;
let highScore = 0;
var map2 = false;
var map3 = false;
var map4 = false;
let gameEnd = false;

const tingSound = new Audio('ting.mp3');
const overSound = new Audio('gameover.wav');
const music = new Audio('music.mp3');
music.loop = true;

class snakePart{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// Thiết đặt trò chơi  
var colorMode;
var playMode;
var levelMode;
var mapMode;
function setMode() {
    localStorage.setItem('colorMode', JSON.stringify(colorMode));
    localStorage.setItem('playMode', JSON.stringify(playMode));
    localStorage.setItem('levelMode', JSON.stringify(levelMode));
    localStorage.setItem('mapMode', JSON.stringify(mapMode));
    localStorage.setItem('highScore', JSON.stringify(highScore));
}

function getMode() {
    var dataColorMode = localStorage.getItem('colorMode');
    var dataPlayMode = localStorage.getItem('playMode');
    var dataLevelMode = localStorage.getItem('levelMode');
    var dataMapMode = localStorage.getItem('mapMode');
    var dataHighScore = localStorage.getItem('highScore');
    if (dataColorMode) {
        colorMode = JSON.parse(dataColorMode);
    }else {
        colorMode = '#250707';
    }
    if (dataPlayMode) {
        playMode = JSON.parse(dataPlayMode);
    } else {
        playMode = false;
    }
    if (dataLevelMode) {
        levelMode = JSON.parse(dataLevelMode);
    } else {
        levelMode = 5;
    }
    if (dataMapMode) {
        mapMode = JSON.parse(dataMapMode);
    } else {
        mapMode = [false,false,false];
    }
    if (dataHighScore) {
        highScore = JSON.parse(dataHighScore);
        document.getElementById('newScore').innerText = highScore;
    }
        
    map2 = mapMode[0];
    map3 = mapMode[1];
    map4 = mapMode[2];
    
    if (colorMode == '#250707') {
        document.querySelector('#dark').classList.remove('click');
        document.querySelector('#light').classList.add('click');
    } else {
        document.querySelector('#dark').classList.add('click');
        document.querySelector('#light').classList.remove('click');
    }
    if (playMode) {
        document.querySelector('#boxMode').classList.add('click');
        document.querySelector('#gameSnake').classList.add('bold');
        document.querySelector('#noBoxMode').classList.remove('click');
    } else {
        document.querySelector('#noBoxMode').classList.add('click');
        document.querySelector('#gameSnake').classList.remove('bold');
        document.querySelector('#boxMode').classList.remove('click');
    }
    if (levelMode == 5) {
        speed = 5;
        document.querySelector('#easy').classList.add('click');
        document.querySelector('#medium').classList.remove('click');
        document.querySelector('#hard').classList.remove('click');
        document.querySelector('#veryHard').classList.remove('click');
    } else if (levelMode == 8) {
        speed = 8;
        document.querySelector('#medium').classList.add('click');
        document.querySelector('#easy').classList.remove('click');
        document.querySelector('#hard').classList.remove('click');
        document.querySelector('#veryHard').classList.remove('click');
    } else if (levelMode == 11) {
        speed = 11;
        document.querySelector('#hard').classList.add('click');
        document.querySelector('#medium').classList.remove('click');
        document.querySelector('#easy').classList.remove('click');
        document.querySelector('#veryHard').classList.remove('click');
    } else {
        speed = 15;
        document.querySelector('#veryHard').classList.add('click');
        document.querySelector('#medium').classList.remove('click');
        document.querySelector('#hard').classList.remove('click');
        document.querySelector('#easy').classList.remove('click');
    }
    if (mapMode[0]) {
        document.querySelector('#map2').classList.add('click');
        document.querySelector('#map1').classList.remove('click');
        document.querySelector('#map3').classList.remove('click');
        document.querySelector('#map4').classList.remove('click');
    } else if (mapMode[1]) {
        document.querySelector('#map3').classList.add('click');
        document.querySelector('#map2').classList.remove('click');
        document.querySelector('#map1').classList.remove('click');
        document.querySelector('#map4').classList.remove('click');
    } else if (mapMode[2]) {
        document.querySelector('#map3').classList.remove('click');
        document.querySelector('#map2').classList.remove('click');
        document.querySelector('#map1').classList.remove('click');
        document.querySelector('#map4').classList.add('click');
    } else {
        document.querySelector('#map1').classList.add('click');
        document.querySelector('#map2').classList.remove('click');
        document.querySelector('#map3').classList.remove('click');
        document.querySelector('#map4').classList.remove('click');
    }
}

getMode();

// Chế độ cài đặt

//Chức năng tối_sáng
function darkMode() {
    colorMode = "#100108";
    setMode();
    document.querySelector('#dark').classList.add('click');
    document.querySelector('#light').classList.remove('click');
}
function lightMode() {
    colorMode = "#250707";
    setMode();
    document.querySelector('#dark').classList.remove('click');
    document.querySelector('#light').classList.add('click');
}
// Chức năng có viền_tràn viền
function playMode1() {
    playMode = true;
    setMode();
    document.querySelector('#boxMode').classList.add('click');
    document.querySelector('#gameSnake').classList.add('bold');
    document.querySelector('#noBoxMode').classList.remove('click');
}
function playMode2() {
    playMode = false;
    setMode();
    document.querySelector('#noBoxMode').classList.add('click');
    document.querySelector('#gameSnake').classList.remove('bold');
    document.querySelector('#boxMode').classList.remove('click');
}
// Chức năng mức độ chơi
function easyMode() {
    speed = 5;
    levelMode = 5;
    setMode();
    document.querySelector('#easy').classList.add('click');
    document.querySelector('#medium').classList.remove('click');
    document.querySelector('#hard').classList.remove('click');
    document.querySelector('#veryHard').classList.remove('click');
}
function mediumMode() {
    speed = 8;
    levelMode = 8;
    setMode();
    document.querySelector('#medium').classList.add('click');
    document.querySelector('#easy').classList.remove('click');
    document.querySelector('#hard').classList.remove('click');
    document.querySelector('#veryHard').classList.remove('click');
}
function hardMode() {
    speed = 11;
    levelMode = 11;
    setMode();
    document.querySelector('#hard').classList.add('click');
    document.querySelector('#medium').classList.remove('click');
    document.querySelector('#easy').classList.remove('click');
    document.querySelector('#veryHard').classList.remove('click');
}
function veryHardMode() {
    speed = 15;
    levelMode = 15;
    setMode();
    document.querySelector('#veryHard').classList.add('click');
    document.querySelector('#medium').classList.remove('click');
    document.querySelector('#hard').classList.remove('click');
    document.querySelector('#easy').classList.remove('click');
}
// Chức năng map
function map1Mode() {
    map2 = false;
    map3 = false;
    map4 = false;
    mapMode = [false,false,false];
    setMode();
    document.querySelector('#map1').classList.add('click');
    document.querySelector('#map2').classList.remove('click');
    document.querySelector('#map3').classList.remove('click');
    document.querySelector('#map4').classList.remove('click');
}
function map2Mode() {
    map2 = true;
    map3 = false;
    map4 = false;
    mapMode = [true,false,false];
    setMode();
    document.querySelector('#map2').classList.add('click');
    document.querySelector('#map1').classList.remove('click');
    document.querySelector('#map3').classList.remove('click');
    document.querySelector('#map4').classList.remove('click');

}
function map3Mode() {
    map2 = false;
    map3 = true;
    map4 = false;
    mapMode = [false,true,false];
    setMode();
    document.querySelector('#map3').classList.add('click');
    document.querySelector('#map2').classList.remove('click');
    document.querySelector('#map1').classList.remove('click');
    document.querySelector('#map4').classList.remove('click');

}
function map4Mode() {
    map2 = false;
    map3 = false;
    map4 = true;
    mapMode = [false,false,true];
    setMode();
    document.querySelector('#map3').classList.remove('click');
    document.querySelector('#map2').classList.remove('click');
    document.querySelector('#map1').classList.remove('click');
    document.querySelector('#map4').classList.add('click');
}

// Thiết đặt menu
var player;
var playerScore;
var playerCheck;

function getMenu() {  
    var dataPlayer = localStorage.getItem('player');
    var dataPlayerScore = localStorage.getItem('playerScore');
    var dataPlayerCheck = localStorage.getItem('playerCheck');
    if (dataPlayer) {
        player = JSON.parse(dataPlayer);
    } else {
        player = [];
    }
    if (dataPlayerScore) {
        playerScore = JSON.parse(dataPlayerScore);
    } else {
        playerScore = [];
    }
    if (dataPlayerCheck) {
        playerCheck = JSON.parse(dataPlayerCheck);
    } else {
        playerCheck = [];
    }
}
function setMenu() {
    localStorage.setItem('player',JSON.stringify(player));
    localStorage.setItem('playerScore',JSON.stringify(playerScore));
    localStorage.setItem('playerCheck',JSON.stringify(playerCheck));
}

function drawMenu() {
    getMenu();
    let menu = `<table>
                    <tbody>
                        <tr >
                            <th class="table2-th" colspan="3"> MENU</th>
                        </tr>
                        <tr class="table2-tr1">
                            <td colspan="2">NGƯỜI CHƠI</td>
                            <td>ĐIỂM</td>
                        </tr>`;
    let j = 1;
    for (let i = 0; i < player.length ; i++) {
        menu += `<tr id='row${i}' onclick='choosePlayer(${i})' class="table2-tr">
                    <td class='table2-stt' >${i+1}</td>
                    <td class='table2-name' >${player[i]}</td>
                    <td>${playerScore[i]}</td>
                </tr>`;
        j++;
    }
    for (let q = j; q < j + 3; q++) {
        menu += `<tr class="table2-tr">
                    <td class='table2-stt'>${q}</td>
                    <td class='table2-name'></td>
                    <td></td>
                </tr>`;
    }
    menu += `<tr class="table2-trlast">
                <td colspan="3">
                    <button id='btnAdd' class='btnMenu'onclick='addPlayer()'>Tên mới</button>
                    <button id='add' onclick='add()' class='d-none btnMenu'>Thêm</button>
                    <button id='cancel' onclick='cancel()' class='d-none btnMenu'>Bỏ qua</button>
                </td>
                
            </tr>
            <tr id='table2-tr-last' class="table2-tr d-none">
                    <td colspan="3">
                        <input id='newName' type="text"></input>
                    </td>
                </tr>
            </tbody>
            </table>`;
    document.querySelector('.containTable2').innerHTML = menu;
    for (i = 0; i < playerCheck.length; i++) {
        if (playerCheck[i]) {
            choosePlayer(i);
        }
    }
}

// Thêm người chơi
function addPlayer() {
    document.querySelector('#btnAdd').classList.add('d-none');
    document.querySelector('#add').classList.remove('d-none');
    document.querySelector('#cancel').classList.remove('d-none');
    document.querySelector('#table2-tr-last').classList.remove('d-none');
    let element = document.querySelector('#newName');
    element.focus();
    element.addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
            add();
        };
    } )
}
function cancel() {
    document.querySelector('#btnAdd').classList.remove('d-none');
    document.querySelector('#add').classList.add('d-none');
    document.querySelector('#cancel').classList.add('d-none');
    document.querySelector('#table2-tr-last').classList.add('d-none');
}
function choosePlayer(index) {
    for (let i = 0; i < playerCheck.length; i++ ) {
        if (i == index) {
            document.getElementById(`row${i}`).classList.add('checked');
            playerCheck[i] = true;
        } else {
            playerCheck[i] = false;
            document.getElementById(`row${i}`).classList.remove('checked');
        }
    }
    setMenu();
}
function add() {
    let name =  document.querySelector('#newName').value;
    if (name == '' || name == null) {
        alert('Vui lòng nhập tên!');
    } else {
        player.push(name);
        playerScore.push(0);
        for (let i = 0; i < playerCheck.length; i++ ) {
            playerCheck[i] = false;
        }
        playerCheck.push(true);
        setMenu();
        drawMenu();
    }
}

drawMenu();
// Main game
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        gameEnd = result;
        return;
    }
    
    clearScreen();
    drawSnake();
    drawFood();
    checkCollision();
    drawScore();
    check = true;
    if (xvelocity == 0 && yvelocity == 0) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f9e5ad';
        ctx.font = '20px verdana';
        ctx.fillText('Press Arrow key to play!', canvas.clientWidth/4.5, canvas.clientHeight/2 + 30);
    }
    myVar = setTimeout(drawGame,1000/speed);

}
// map 2
let wall = [];
var xObstacle1 = 7;
var yObstacle1 = 3;
var xObstacle2 = 7;
var yObstacle2 = 20;

for (let i = 0; i< 10; i++) {
    wall.push(new snakePart(xObstacle1,yObstacle1));
    xObstacle1++;
}
for (let i = 0; i< 10; i++) {
    wall.push(new snakePart(xObstacle2,yObstacle2));
    xObstacle2++;
}
// map 3
let wall1 = [];
var xObstacle1 = 3;
var yObstacle1 = 7;
var xObstacle2 = 21;
var yObstacle2 = 7;

for (let i = 0; i< 10; i++) {
    wall1.push(new snakePart(xObstacle1,yObstacle1));
    yObstacle1++;
}
for (let i = 0; i< 10; i++) {
    wall1.push(new snakePart(xObstacle2,yObstacle2));
    yObstacle2++;
}
// map4
let wall2 = wall.concat(wall1);
// Vẽ map
function drawObstacles() {
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'white';
    if (map2 || score > 2 && score <=4) {
        ctx.fillRect(titleCount * 7,titleCount*3,titleCount * 10, titleCount);
        ctx.fillRect(titleCount * 7,titleCount*20,titleCount * 10, titleCount);
    }
    if (map3 || score > 4 && score <=6) {
        ctx.fillRect(titleCount * 3,titleCount*7,titleCount, titleCount * 10);
        ctx.fillRect(titleCount * 21,titleCount*7,titleCount, titleCount * 10);
    }
    if (map4 || score > 6) {
        ctx.fillRect(titleCount * 7,titleCount*3,titleCount * 10, titleCount);
        ctx.fillRect(titleCount * 7,titleCount*20,titleCount * 10, titleCount);
        ctx.fillRect(titleCount * 3,titleCount*7,titleCount, titleCount * 10);
        ctx.fillRect(titleCount * 21,titleCount*7,titleCount, titleCount * 10);
    }
    
}
// Vẽ lại màn hình
function clearScreen() {
    ctx.fillStyle = `${colorMode}`;
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc((headX + 0.4) * titleCount, (headY + 0.4)* titleCount,11, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    
    if (map2 || map3 || map4 || score > 2) {
        drawObstacles();
    }
}
 // Vẽ rắn
function drawSnake() {
    ctx.shadowBlur = 20;
    ctx.shadowColor = "white";
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * titleCount, part.y * titleCount, titleSize, titleSize);
    }
    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.shadowBlur = 20;
    ctx.shadowColor = "white";
    ctx.fillStyle = 'orange';
    // ctx.fillRect(headX * titleCount, headY * titleCount, titleSize, titleSize);
    ctx.arc((headX + 0.4) * titleCount, (headY + 0.4)* titleCount,11, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'black';
    if (xvelocity <0 && yvelocity == 0) {
        ctx.arc((headX + 0.3) * titleCount, (headY + 0.6)* titleCount,2, 0, 2 * Math.PI);
        ctx.arc((headX + 0.3) * titleCount, (headY + 0.2)* titleCount,2, 0, 2 * Math.PI);
    } else if (xvelocity >0 && yvelocity == 0){
        ctx.arc((headX + 0.6) * titleCount, (headY + 0.6)* titleCount,2, 0, 2 * Math.PI);
        ctx.arc((headX + 0.6) * titleCount, (headY + 0.2)* titleCount,2, 0, 2 * Math.PI);
    }else if (yvelocity < 0){
        ctx.arc((headX + 0.2) * titleCount, (headY + 0.3)* titleCount,2, 0, 2 * Math.PI);
        ctx.arc((headX + 0.6) * titleCount, (headY + 0.3)* titleCount,2, 0, 2 * Math.PI);
    } else {
        ctx.arc((headX + 0.2) * titleCount, (headY + 0.6)* titleCount,2, 0, 2 * Math.PI);
        ctx.arc((headX + 0.6) * titleCount, (headY + 0.6)* titleCount,2, 0, 2 * Math.PI);
    }
    ctx.fill();
}
// Vẽ thức ăn
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(xFood * titleCount, yFood * titleCount, titleSize, titleSize);
}
// Kiểm tra vị trí sinh ra thức ăn mới
function checkCollision() {
    if (xFood == headX && yFood == headY) {
        tailLength++;
        tingSound.play();
        score++;
        if (speed < 20) {
            speed += 0.1;
        }
        xFood = Math.floor(Math.random() * sizeBoard);
        yFood = Math.floor(Math.random() * sizeBoard);

        for (let i = 0; i < wall.length ; i++) {
            let part = wall[i];
            if (xFood == part.x && yFood == part.y) {
                yFood +=1;
                break;
            }
        }
        for (let i = 0; i < wall1.length ; i++) {
            let part = wall1[i];
            if (xFood == part.x && yFood == part.y) {
                xFood +=1;
                break;
            }
        }
    }
    
}
// Ghi điểm
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '15px verdena';
    ctx.fillText("Score: " + score, canvas.clientWidth - 70, 15);
}
// Kiểm tra va chạm
function isGameOver() {
    let gameOver = false;
    if (xvelocity == 0 && yvelocity ==0) {
        return false;
    }
    if (playMode) {
        if (headX < 0) {
            gameOver = true;
        } else if (headX === sizeBoard) {
            gameOver = true;
        } else if (headY < 0) {
            gameOver = true;
        } else if (headY === sizeBoard) {
            gameOver = true;
        }
    }

    for (let i = 0; i < snakeParts.length ; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
    if (map2 || score > 2 && score <=4) {
        for (let i = 0; i < wall.length ; i++) {
            let part = wall[i];
            if (part.x === headX && part.y === headY) {
                gameOver = true;
                break;
            }
        }
    }
    if (map3 || score > 4 && score <=6) {
        for (let i = 0; i < wall1.length ; i++) {
            let part = wall1[i];
            if (part.x === headX && part.y === headY) {
                gameOver = true;
                break;
            }
        }
    }
    if (map4 || score > 6) {
        for (let i = 0; i < wall2.length ; i++) {
            let part = wall2[i];
            if (part.x === headX && part.y === headY) {
                gameOver = true;
                break;
            }
        }
    }
    if (gameOver) {
        music.currentTime = 0;
        music.pause();
        overSound.play();
        getMode();
        document.querySelector('#gameSnake').classList.add('gameOver');
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
        ctx.fillStyle = 'white';
        ctx.font = '45px verdana';
        ctx.fillText('Game Over!', canvas.clientWidth/4.5, canvas.clientHeight/2);
        ctx.fillStyle = '#e34514';
        ctx.font = '20px verdana';
        ctx.fillText('Press Space to play again!', canvas.clientWidth/4.5, canvas.clientHeight/2 + 30);
        if (score > highScore) {
            highScore = score;
            setMode();
            document.getElementById('newScore').innerText = highScore;
        }
        for (let i = 0; i < playerScore.length; i++) {
            if (playerCheck[i]) {
                if (score > playerScore[i]) {
                    playerScore[i] = score;
                    setMenu();
                    drawMenu();
                }
            }
            
        }
        
    }
    return gameOver;
}
// Khởi tạo phím tương tác
document.body.addEventListener('keydown',keyDown);
document.onkeydown = function(e) {
    if (e.which == 32) { 
        headX = 10;
        headY = 10;
        xvelocity = 0;
        yvelocity = 0;
        xFood = 5;
        yFood = 5;
        if (speed >= 15) {
            speed = 15
        } else if (speed >= 11) {
            speed = 11;
        } else if (speed >= 8) {
            speed = 8;
        } else {
            speed = 5;
        }
        tailLength = 2;
        score = 0;
        check = true;
        snakeParts = [];
        gameEnd = false;
        getMode();
        document.querySelector('#gameSnake').classList.remove('gameOver');
        clearTimeout(myVar);
        drawGame();
    }
    if (e.which == 27) {
        getMode();
        document.location.reload();
    }
}
// Khởi tạo phím chơi game
function keyDown(event) {
// move up
    if (event.keyCode == 38) {
        if (yvelocity <= 0 && check) {
            xvelocity = 0;
            yvelocity = -1;
            check = false;
        }
        if (gameEnd == false) {
            music.play();
        }
    } else
// move down
    if (event.keyCode == 40) {
        if (yvelocity >= 0 && check) {
            xvelocity = 0;
            yvelocity = 1;
            check = false;
        }
        if (gameEnd == false) {
            music.play();
        }
    } else 
// move left
    if (event.keyCode == 37) {
        if (xvelocity <=0 && check) {
            xvelocity = -1;
            yvelocity = 0;
            check = false;
        }
        if (gameEnd == false) {
            music.play();
        }
    } else
// move down
    if (event.keyCode == 39) {
        if (xvelocity >= 0 && check) {
            xvelocity = 1;
            yvelocity = 0;
            check = false;
        }
        if (gameEnd == false) {
            music.play();
        }
    }
}
// Hàm di chuyển con rắn
function changeSnakePosition() {
    headX += xvelocity;
    headY += yvelocity; 
    if (playMode == false) {
        if (headX < 0) {
            headX = sizeBoard - 1;
         }
         if (headX > sizeBoard -1) {
             headX = 0;
         } 
         if (headY < 0) {
             headY = sizeBoard - 1;
         } 
         if (headY > sizeBoard -1) {
             headY = 0;
         }
    }
}

drawGame();



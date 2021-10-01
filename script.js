
var ctx = null

var fpsCounter = {
    savedSecond: 0,
    framesLastSecond: 0,
    framesCounter: 0
}

var map = {
    width: 8,
    height: 8,

    tile: {
        width: 50,
        height: 50
    },
    
    matrix: [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 2, 3, 4, 5, 0, 0, 0,
        0, 0, 0, 0, 6, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 0,
        0, 0, 1, 1, 1, 0, 1, 0,
        0, 0, 0, 0, 1, 0, 1, 0,
        0, 0, 0, 0, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    ],
}

function drawMap() {
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            
            switch(map.matrix[(y * map.width) + x]) {
                case 1:
                    ctx.fillStyle = "#10ee05"
                    break;
                default: // 0
                    ctx.fillStyle = "#000000"
            }
            
            ctx.fillRect(x * map.tile.width, y * map.tile.height, map.tile.width, map.tile.height)
        }
    }
}

function drawFrameCounter() {
    let currentSecond = Math.floor(Date.now() / 1000)

    if (currentSecond != fpsCounter.savedSecond) {
        fpsCounter.savedSecond = currentSecond
        fpsCounter.framesLastSecond = fpsCounter.framesCounter
        fpsCounter.framesCounter = 1;
    } else { fpsCounter.framesCounter++ }

    ctx.fillStyle = "#ff0000"
    ctx.fillText("FPS: " + fpsCounter.framesLastSecond, 50, 50)
}

function drawGame() {
    if (ctx == null) { return }

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, 500, 500)

    drawMap()
    drawFrameCounter()

    requestAnimationFrame(drawGame)
}

window.onload = () => {
    ctx = document.getElementById("game").getContext("2d")
    requestAnimationFrame(drawGame)
}
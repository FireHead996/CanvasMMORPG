
var ctx = null

var savedSecond = 0, framesLastSecond = 0, framesCounter = 0

function drawFrameCounter() {
    let currentSecond = Math.floor(Date.now() / 1000)

    if (currentSecond != savedSecond) {
        savedSecond = currentSecond
        framesLastSecond = framesCounter
        framesCounter = 1;
    } else { framesCounter++ }

    ctx.fillStyle = "#ff0000"
    ctx.fillText("FPS: " + framesLastSecond, 50, 50)
}

function drawGame() {
    if (ctx == null) { return }

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, 500, 500)

    drawFrameCounter()

    requestAnimationFrame(drawGame)
}

window.onload = () => {
    ctx = document.getElementById("game").getContext("2d")
    requestAnimationFrame(drawGame)
}
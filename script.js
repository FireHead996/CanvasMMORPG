var map = {
    width: 8,
    height: 8,

    tile: {
        width: 50,
        height: 50
    },
    
    matrix: [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 0,
        0, 0, 1, 1, 1, 0, 1, 0,
        0, 0, 0, 0, 1, 0, 1, 0,
        0, 0, 0, 0, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    ],
}

function drawMap(ctx) {
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            
            switch(map.matrix[(y * map.width) + x]) {
                case 1:
                    ctx.fillStyle = "#10ee05"
                    break;
                default: // 0
                    ctx.fillStyle = "#000088"
            }
            
            ctx.fillRect(x * map.tile.width, y * map.tile.height, map.tile.width, map.tile.height)
        }
    }
}

class FrameCounter {

    constructor() {
        this.label = document.querySelector('#fpsCounter')
        this.savedSecond = 0
        this.framesLastSecond = 0
        this.framesCounter = 0
    }

    draw = () => {
        this.label.innerHTML = this.framesLastSecond
    }

    update = () => {
        let currentSecond = Math.floor(Date.now() / 1000)

        if (currentSecond != this.savedSecond) {
            this.savedSecond = currentSecond
            this.framesLastSecond = this.framesCounter
            this.framesCounter = 1;
        } else { this.framesCounter++ }
    }
}

class Engine {

    constructor() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight

        this.fpsCounter = new FrameCounter()
    }

    drawGame = () => {
        requestAnimationFrame(engine.drawGame)

        // --- Updates and calculations below ---

        this.fpsCounter.update()
        
        // --- Drawing below ---

        if (this.ctx == null) { return }

        this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        drawMap(this.ctx)

        this.fpsCounter.draw()
    }

}

// Main Loop

const engine = new Engine()

window.onload = () => {
    requestAnimationFrame(engine.drawGame)
}
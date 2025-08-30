document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    let isGameOver = false

    function control(e) {
        if (e.code === "Space" && !isJumping) {
            jump()
        }
    }

    document.addEventListener('keydown', control)


    let isJumping = false;
    let position = 0
    const ground = 0    //chão

    function jump() {
        isJumping = true
        let count = 0
        let upInterval = setInterval(function () {
            // move cima
            if (count >= 15) {
                clearInterval(upInterval)
                let downTimerId = setInterval(function () {
                    if (position <= ground) {
                        clearInterval(downTimerId)
                        position = ground
                        dino.style.bottom = position + 'px'
                        isJumping = false  // voltou para o chão
                    }else {
                    position -= 25
                    dino.style.bottom = position + 'px'
                    }
                }, 25)
            }else {
                // subir
                position += 25
                count++
                dino.style.bottom = position + 'px'
            }
        }, 35)
    }

    function generateObstacles() {
        if (!isGameOver) {
            let randomTime = Math.random() * 4000
            let obstaclePosition = 2000
            const obstacle = document.createElement('div')
            obstacle.classList.add('obstacle')
            grid.appendChild(obstacle)
            obstacle.style.left = obstaclePosition + 'px'
    
            let timerId = setInterval(function() {
                if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                    clearInterval(timerId)
                    alert.innerHTML = 'Game Over'
                    isGameOver = true
                    //remover
                    while (grid.firstChild) {
                        grid.removeChild(grid.lastChild)
                    }
                }
                obstaclePosition -=10
                obstacle.style.left = obstaclePosition + 'px'
            }, 20)
            setTimeout(generateObstacles, randomTime)
        }
    }
    generateObstacles()
});
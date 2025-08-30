document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    let isGameOver = false

    // Variáveis físicas
    let isJumping = false
    let position = 0
    let gravity = 2       // força da gravidade
    let velocity = 0      // velocidade
    let jumpForce = 32     // força do pulo
    const ground = 0      // chão

    // Função de pulo
    function jump() {
        if (!isJumping) {
            isJumping = true
            velocity = jumpForce
        }
    }

    // Controle do teclado
    function control(e) {
        if (e.code === "Space" && !isJumping) {
            jump()
        }
    }
    document.addEventListener('keydown', control)

    // Loop de atualização (aplica gravidade e movimento)
    setInterval(() => {
        if (isJumping || position > ground) {
            position += velocity
            velocity -= gravity

            if (position <= ground) {
                position = ground
                isJumping = false
            }

            dino.style.bottom = position + "px"
        }
    }, 20)

    // Geração de obstáculos
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
                obstaclePosition -= 10
                obstacle.style.left = obstaclePosition + 'px'
            }, 20)
            setTimeout(generateObstacles, randomTime)
        }
    }
    generateObstacles()
})

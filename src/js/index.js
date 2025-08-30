document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    let maxHeight = 370  // altura máxima do pulo
    let isGameOver = false

    // Variáveis físicas
    let isJumping = false
    let position = 0
    let gravity = 1.2       // força da gravidade
    let velocity = 0        // velocidade vertical
    let jumpForce = 20      // impulso inicial
    let jumpHeld = false    // se a tecla está sendo segurada
    const ground = 0        // chão

    function jump() {
        if (!isJumping) {
            isJumping = true
            velocity = jumpForce
        }
    }

    // Controle do teclado
    function controlDown(e) {
        if (e.code === "Space") {
            if (!isJumping) {
                jump()
            }
            jumpHeld = true // segurando espaço
        }
    }

    function controlUp(e) {
        if (e.code === "Space") {
            jumpHeld = false // soltou espaço
        }
    }

    document.addEventListener('keydown', controlDown)
    document.addEventListener('keyup', controlUp)

    // Loop de atualização (aplica gravidade e movimento)
    setInterval(() => {
        if (isJumping || position > ground) {
            // Se estiver segurando espaço, aplica mais impulso extra
            if (jumpHeld && velocity > 0) {
                velocity -= 0.3   // controla quanto tempo continua subindo
            } else {
                velocity -= gravity
            }

            position += velocity

            // Limite de altura
        if (position >= maxHeight) {
            position = maxHeight
            velocity = 0   // força queda depois do teto
        }

        if (position <= ground) {
            position = ground
            isJumping = false
            velocity = 0
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

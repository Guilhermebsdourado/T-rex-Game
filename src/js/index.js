document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')


    function control(e) {
        if (e.code === "Space" && !isJumping) {
            jump()
        }
    }
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
        const obstacle = document.createElement('div')
    }
    generateObstacles()


    document.addEventListener('keydown', control)
});
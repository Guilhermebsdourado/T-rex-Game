document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')


    function control(e) {
        if (e.code === "Space") {
            jump()
        }
    }
    let isJumping = false;
    let position = 0
    function jump() {
        let count = 0
        let timeId = setInterval(function () {
            // move down
            if (count === 15) {
                clearInterval(timeId)
                let downTimerId = setInterval(function () {
                    position -= 5
                    count++
                    position = position * gravity
                    dino.style.bottom = position + 'px'

                }, 20);
            }
            // move up
            position += 30
            count++
            position = position * gravity
            dino.style.bottom = position + 'px'
        }, 20)
    }

    document.addEventListener('keydown', control)
});
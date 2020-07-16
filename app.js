;
(function() {
    // load global variables
    let canvas,
        ctx,
        gravity,
        ball,
        ballColor,
        friction;
    var bounceBtn = document.querySelector('.bounce-btn');
    var colorBtn = document.querySelector('.color-btn');

    const colors = ['red', 'blue', 'green', 'purple', 'orange'];

    // change ball color
    function getRandomColor() {
        return colors[(Math.floor(Math.random() * colors.length))];

    }

    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext("2d");

        canvas.width = 400;
        canvas.height = 400;

        //world settings
        gravity = 0.30;
        friction = 0.98;
        ballColor = getRandomColor();

        // create ball
        ball = {
            bounce: 0.75,
            radius: 30,
            x: canvas.width / 2,
            y: canvas.height / 2,
            velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
            velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
        };

        // start update loop
        window.requestAnimationFrame(update);
    }

    // for bounce button
    function bounce() {
        ball.velX = (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1);
        ball.velY = (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1);
    }

    function draw() {
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw Ball
        ctx.beginPath();
        ctx.fillStyle = ballColor;
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    function update() {
        window.requestAnimationFrame(update);

        // bottom canvas
        if (ball.y + ball.radius >= canvas.height) {
            ball.velY *= -ball.bounce;
            ball.y = canvas.height - ball.radius;
            ball.velX *= friction;
        }

        // top canvas
        if (ball.y - ball.radius <= 0) {
            ball.velY *= -ball.bounce;
            ball.y = ball.radius;
            ball.velX *= friction;
        }

        // left canvas
        if (ball.x - ball.radius <= 0) {
            ball.velX *= -ball.bounce;
            ball.x = ball.radius;
        }

        // right of canvas
        if (ball.x + ball.radius >= canvas.width) {
            ball.velX *= -ball.bounce;
            ball.x = canvas.width - ball.radius;
        }

        // reset to 0
        if (ball.velX < 0.01 && ball.velX > -0.01) {
            ball.velX = 0
        }
        if (ball.velY < 0.01 && ball.velY > -0.01) {
            ball.velY = 0
        }

        // add gravity
        ball.velY += gravity;

        // update ball position
        ball.x += ball.velX;
        ball.y += ball.velY;

        draw();
    }

    // button listeners
    bounceBtn.addEventListener('click', bounce);
    colorBtn.addEventListener('click', function() {
        ballColor = getRandomColor();
    });

    document.addEventListener('DOMContentLoaded', init);
})()

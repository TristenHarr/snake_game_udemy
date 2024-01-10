import init, {World} from "snake_game";

init().then(_ => {
    const CELL_SIZE = 30;

    const world = World.new();
    const worldWidth = world.width();

    const canvas = document.getElementById("snake-canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = worldWidth*CELL_SIZE;
    canvas.width = worldWidth*CELL_SIZE;

    function drawWorld(){
        ctx.beginPath();
        for (let x = 0; x < worldWidth + 1; x++){
            ctx.moveTo(CELL_SIZE*x, 0);
            ctx.lineTo(CELL_SIZE*x, worldWidth*CELL_SIZE);
        }

        for (let y = 0; y<worldWidth+1; y++){
            ctx.moveTo(0, CELL_SIZE * y);
            ctx.lineTo(worldWidth*CELL_SIZE, y*CELL_SIZE);
        }
        ctx.stroke();
    }

    function drawSnake() {
        const snakeIdx = world.snake_head_idx();
        const col = snakeIdx % worldWidth;
        const row = Math.floor(snakeIdx / worldWidth);
        ctx.beginPath();
        ctx.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
        ctx.stroke();
    }

    function paint() {
        drawWorld();
        drawSnake();
    }

    let ctr = 0;
    let timeoutId;
    function update() {
        // if (ctr > 100){
        //     console.log("DONE");
        //     return null;
        // }

        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawWorld();
            drawSnake();
            world.update();
            // The method request animation frame takes a callback to be invoked before the next repaint.
            requestAnimationFrame(update);
            console.log(world.snake_head_idx());
            ctr += 1;
            console.log("Frame ", ctr);
        }, 100);
    }

    paint();
    update();
})
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const fps = 60;

const image = new Image();
image.src = 'shadow_dog.png';

let state = 'idle';
const staggerFrame = 100;

const frameWidth = 575; // width ÷ columns 
const frameHeight = 523; // height ÷ rows
const spriteAnimation = [];
const animationState = [
    // {
    //     name: 'name',  // give a name of the sprite sheet in the row 
    //     frames: 'length' // set the number of sprites in the row
    // },
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'hit',
        frames: 4
    },
];

// convert animationState array to easy to use spriteAnimation array
// each frame with its x and y coordinates
const result = animationState.forEach((state, row) => {
    const frames = { loc: [] };

    for (let col = 0; col < state.frames; col++) {
        const positionX = col * frameWidth;
        const positionY = row * frameHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }

    spriteAnimation[state.name] = frames;
});

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const position = Math.floor(timestamp / staggerFrame) % spriteAnimation[state].loc.length;
    const frameX = spriteAnimation[state].loc[position].x;
    const frameY = spriteAnimation[state].loc[position].y;

    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); s <=> source; d <=> destination
    ctx.drawImage(image, frameX, frameY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000 / fps);
}

document.getElementById('animations').addEventListener('change', (e) => state = e.target.value);
window.addEventListener('DOMContentLoaded', animate(0))
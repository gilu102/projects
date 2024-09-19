document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    const startScreen = document.querySelector('.start-screen');
    const startButton = document.querySelector('.start-button');
    const changeDifficultyButton = document.querySelector('.change-difficulty-button');
    const newGameButton = document.querySelector('.new-game-button');
    const difficultySelect = document.querySelector('.difficulty-select');
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let score = 0;
    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    const gravity = 0.9;
    let isJumping = true;
    let moveTimerId;
    let platformMoveTimerId;
    let platformSpeed = 4;
    let movingPlatformProbability = 0.5;
    let backgroundPositionY = 0;


    class Platform {
        constructor(newPlatBottom, isMoving = false) {
            this.left = Math.random() * (grid.offsetWidth - 85);
            this.bottom = newPlatBottom;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            if (isMoving) visual.classList.add('moving-platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function adjustDifficulty() {
        const difficulty = difficultySelect.value;
        switch (difficulty) {
            case 'easy':
                platformSpeed = 2;
                platformCount = 5;
                movingPlatformProbability = 0.2;
                break;
            case 'medium':
                platformSpeed = 4;
                platformCount = 7;
                movingPlatformProbability = 0.5;
                break;
            case 'hard':
                platformSpeed = 6;
                platformCount = 6;
                movingPlatformProbability = 0.8;
                break;
        }
    }

    function createPlatforms() {
        adjustDifficulty();
        for (let i = 0; i < platformCount; i++) {
            let platGap = grid.offsetHeight / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let isMoving = Math.random() < movingPlatformProbability;
            let newPlatform = new Platform(newPlatBottom, isMoving);
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= platformSpeed;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

                if (platform.bottom < -15) {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    platforms.shift();
                    score++;
                    let newPlatform = new Platform(grid.offsetHeight, Math.random() < movingPlatformProbability);
                    platforms.push(newPlatform);
                }
            });
        }
    }

    function moveDoodler() {
        clearInterval(moveTimerId);
        moveTimerId = setInterval(() => {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace <= 0) {
                gameOver();
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= (platform.bottom + 15)) &&
                    ((doodlerLeftSpace + doodler.offsetWidth) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + platform.visual.offsetWidth)) &&
                    !isJumping
                ) {
                    startPoint = doodlerBottomSpace;
                    jump();
                    isJumping = true;
                }
            });

            if (doodlerBottomSpace > 200) {
                let gridMove = startPoint - doodlerBottomSpace;
                backgroundPositionY += gridMove / 10;
                grid.style.backgroundPositionY = `${backgroundPositionY}px`;
            }
        }, 20);
    }

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';

        grid.addEventListener('mousemove', (e) => {
            let gridRect = grid.getBoundingClientRect();
            let mouseX = e.clientX - gridRect.left;
            doodlerLeftSpace = Math.min(Math.max(0, mouseX - doodler.offsetWidth / 2), grid.offsetWidth - doodler.offsetWidth);
            doodler.style.left = doodlerLeftSpace + 'px';
        });
    }

    function jump() {
        clearInterval(moveTimerId);
        isJumping = true;
        moveTimerId = setInterval(() => {
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace > (startPoint + 200)) {
                moveDoodler();
                isJumping = false;
            }
        }, 30);
    }

    function gameOver() {
        isGameOver = true;
        clearInterval(moveTimerId);
        clearInterval(platformMoveTimerId);
        newGameButton.classList.remove('hidden');
        changeDifficultyButton.classList.remove('hidden');
        difficultySelect.classList.remove('hidden');
        grid.innerHTML = `Score: ${score}`;
    }

    function start() {
        if (!isGameOver) {
            newGameButton.classList.add('hidden');
            changeDifficultyButton.classList.add('hidden');
            difficultySelect.classList.add('hidden');
            createPlatforms();
            createDoodler();
            moveDoodler();
            platformMoveTimerId = setInterval(movePlatforms, 30);
            jump(startPoint);
        }
    }

    startButton.addEventListener('click', () => {
        startScreen.remove();
        start();
    });

    changeDifficultyButton.addEventListener('click', () => {
        difficultySelect.classList.toggle('hidden');
    });

    difficultySelect.addEventListener('change', () => {
        adjustDifficulty();
        grid.innerHTML = '';
        isGameOver = false;
        score = 0;
        platforms = [];
        doodlerBottomSpace = startPoint;
        start();
    });

    newGameButton.addEventListener('click', () => {
        grid.innerHTML = '';
        isGameOver = false;
        score = 0;
        platforms = [];
        doodlerBottomSpace = startPoint;
        start();
    });
});

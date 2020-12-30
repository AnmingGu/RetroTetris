document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartButton = document.querySelector('#start-button')
    // make more query selectors for types and stuff
    const width = 10
    let nextRandom = 0

    // Tetrominos (make sure they spawn the correct way, spawn in the correct location)
    const jTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const lTetromino = [
        [1, width + 2, width * 2 + 2, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2 + 2],
        [width * 2, width, width + 1, width + 2]
    ]

    const sTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const zTetromino = [
        [1, width + 1, width, width * 2],
        [width, width + 1, width * 2 + 1, width * 2 + 2],
        [1, width + 1, width, width * 2],
        [width, width + 1, width * 2 + 1, width * 2 + 2]
    ]
    
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]
    
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]
    
    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    // change this to 7bag, 14bag, (vars) random variations (const) (later)
    const theTetrominoes = [lTetromino, jTetromino, zTetromino, sTetromino, oTetromino, iTetromino, tTetromino]

    let currentPosition = 4
    let currentRotation = 0
    
    // randomly select an index
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]
    console.log(theTetrominoes)

    // draw the Tetromino
    function draw(){
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    // undraw the Tetromino
    function undraw(){
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    // make the Tetromino move down every time period
    // something with level too
    var timeFrame = (1000 / 60) * 15 // frame timer (change later)
    timerId = setInterval(moveDown, timeFrame)


    // assign functions to keyCodes
    // change the keyCodes later
    function control(e) {
        if (e.keyCode === 37){
            moveLeft()
        }
        else if (e.keyCode == 38){
            rotate()
        }
        else if (e.keyCode == 39){
            moveRight()
        }
        else if (e.keyCode == 40){
            //moveDown()
        }
    }
    document.addEventListener('keyup', control)


    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze(){
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            
        }
    }
 
    function moveLeft(){
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        // need to check diagonals
        // change the movement mechanics too
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        } 
        draw()
    }

    function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        // need to check diagonals
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1
        } 
        draw()
    }

    // will need to do rotate left, rotate right
    // need to check if rotation is possible too
    function rotate(){
        undraw()
        currentRotation = (currentRotation + 1) % current.length
        current = theTetrominoes[random][currentRotation]
        draw()
    }


    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 0

    // lTetromino, jTetromino, zTetromino, sTetromino, oTetromino, iTetromino, tTetromino
    // update these later
    const upNextTetrominoes = [ 
        [2, displayWidth + 3, displayWidth * 2 + 3, 2], // L piece
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // J piece
        [1, displayWidth + 1, displayWidth, displayWidth * 2], // Z piece
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // S piece
        [0, 1, displayWidth, displayWidth + 1], // O piece
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // I piece
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // T piece
    ]

    // display shape in mini-grid display
    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        
        upNextTetrominoes[nextRandom].forEach(index =>{
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }
    
    

    
    
})
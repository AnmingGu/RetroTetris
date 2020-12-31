document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    // make more query selectors for types and stuff
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0
      // [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    const colors = ['orange', 'blue', 'green', 'red', 'purple', 'yellow', 'cyan']




    // put important stuff here
    // more query selectors
    
    // hard drop
    // move around stuff
    // need timer + update time
    // implement other buttons
    // levels
    // allow stickiness for spins
    









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
    const theTetrominoes = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

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
            squares[currentPosition + index].style.backgroundColor = colors[random]
             
        })
    }
    // undraw the Tetromino
    function undraw(){
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    // make the Tetromino move down every time period
    // something with level too
    var timeFrame = (1000 / 60) * 20 // frame timer (change later)
    // timerId = setInterval(moveDown, timeFrame)


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
            moveDown()
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
            addScore()
            gameOver()
            
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

    function isAtRight() {
        return current.some(index=> (currentPosition + index + 1) % width === 0)  
    }
      
    function isAtLeft() {
        return current.some(index=> (currentPosition + index) % width === 0)
    }

    function checkRotatedPosition(P){
        P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
        if ((P+1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
            if (isAtRight()){            //use actual position to check if it's flipped over to right side
                currentPosition += 1    //if so, add one to wrap it back around
                checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
            }
        }
        else if (P % width > 5) {
            if (isAtLeft()){
                currentPosition -= 1
                checkRotatedPosition(P)
            }
        }
    }

    // will need to do rotate left, rotate right
    // need to check if rotation is possible too
    function rotate(){
        undraw()
        currentRotation = (currentRotation + 1) % current.length
        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition()
        draw()
    }


    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 0

  
    const upNextTetrominoes = [ 
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // J piece
        [1, displayWidth + 2, displayWidth * 2 + 2, 2], // L piece
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // S piece
        [1, displayWidth + 1, displayWidth, displayWidth * 2], // Z piece
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // T piece
        [0, 1, displayWidth, displayWidth + 1], // O piece
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // I piece
        
    ]

    // display shape in mini-grid display
    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        
        upNextTetrominoes[nextRandom].forEach(index =>{
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }


    startButton.addEventListener('click', () =>{
        if (timerId){
            clearInterval(timer)
            timerId = null
        }
        else{
            draw()
            timerId = setInterval(moveDown, timeFrame)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })
    
    function addScore(){
        var count = 0
        for (let i = 0; i < 199; i += width){
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
            if (row.every(index => squares[index].classList.contains('taken'))){
                count += 1
                row.forEach(index =>{
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
        if (count > 0) score += Math.pow(2, count - 1) * 10
        else score += 0
        scoreDisplay.innerHTML = score
    }

    function gameOver(){
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

})
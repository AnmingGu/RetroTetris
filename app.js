document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const linesDisplay = document.querySelector('#lines')
    const levelsDisplay = document.querySelector('#level')
    const startButton = document.querySelector('#start-button')
    const resetButton = document.querySelector('#reset-button')
    // const levelButtonSubmission = document.querySelector('#level-submission-button)
    // make more query selectors for types and stuff
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0

    let lines = 0
    
    const colors = ['orange', 'blue', 'chartreuse', 'red', 'purple', 'yellow', 'cyan']


    // make the Tetromino move down every time period
    // something with level too
    var frame = 60
    let startLevel = 9
    let level = startLevel
    changeSpeed()


    var timeFrame = (1000 / 60) * frame // frame timer, default (at level 0)
    

    


    //VERY BUGGY!!!

    // put important stuff here
    // more query selectors
    // move around stuff
    // need timer + update time
    // implement other buttons
    // levels
    // allow stickiness for spins

    
    /***  BUTTONS AND CONTROLS ***/
    startButton.addEventListener('click', () =>{
        if (timerId){
            clearInterval(timer)
            timerId = null
            reload()
            
        }
        else{
            reload()
            startGame()
        }
    })

    // restart button logic needs to be fixed, speed is increasing too much
    resetButton.addEventListener('click', () =>{
        reload()
        startGame()
    })

    // make dual controls (hold down multiple buttons??)
    function control(e) {
        if (e.keyCode === 37){
            moveLeft()
        }
        else if (e.keyCode == 90){
            rotateCounterClockwise()
        }
        else if (e.keyCode == 88){
            rotateClockwise()
        }
        else if (e.keyCode == 39){
            moveRight()
        }
        else if (e.keyCode == 40){
            score += 1
            moveDown()
        }
    }
    document.addEventListener('keyup', control)



    /*** GAME PIECES ***/
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

    const theTetrominoes = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 5
    let currentRotation = 0
    
    // randomly select an index
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][0]



    /*** GAME LOGIC ***/
    function startGame(){
        draw()
        timerId = setInterval(moveDown, timeFrame)
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        displayShape()
    }

    function draw(){
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
             
        })
    }

    function undraw(){
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    function changeSpeed(){
        if (level == 0) frame = 48
        else if (level == 1) frame = 43
        else if (level == 2) frame = 38
        else if (level == 3) frame = 33
        else if (level == 4) frame = 28
        else if (level == 5) frame = 23
        else if (level == 6) frame = 18
        else if (level == 7) frame = 13
        else if (level == 8) frame = 8
        else if (level == 9) frame = 6
        else if (level <= 12) frame = 5
        else if (level <= 15) frame = 4
        else if (level <= 18) frame = 3
        else if (level <= 28) frame = 2
        else frame = 1

        timeFrame = (1000 / 60) * frame
    }

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
            
            current = theTetrominoes[random][0]
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
        // change the movement mechanics to include DAS
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
        // change the movement mechanics to include DAS
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1
        } 
        draw()
    }

    function isAtRight() {
        return current.some(index => (currentPosition + index + 1) % width === 0)  
    }
      
    function isAtLeft() {
        return current.some(index => (currentPosition + index) % width === 0)
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

    // fix rotation mechanics
    function rotateClockwise(){
        undraw()
        currentRotation = (currentRotation + 1) % current.length
        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition()
        draw()
    }

    function rotateCounterClockwise(){
        undraw()
        if (currentRotation == 0) currentRotation = 4
        currentRotation = (currentRotation - 1) % current.length
        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition()
        draw()
    }
    
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
        if (count > 0) score += Math.pow(2, count - 1) * 1000
        else score += 0
        lines += count
        scoreDisplay.innerHTML = score
        linesDisplay.innerHTML = lines
        level = startLevel + Math.floor(lines / 10)
        levelsDisplay.innerHTML = level
        changeSpeed()
    }

    function gameOver(){
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
            timerId = null
        }
    }


    function reload(){
        scoreDisplay.innerHTML = 0
        score = 0
        lines = 0
        linesDisplay.innerHTML = 0
        levels = startLevel
        levelsDisplay.innerHTML = levels
        changeSpeed()
        for (let i = 0; i < 199; i += width){
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
            
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

    /*** NEXT BOX ***/
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

})


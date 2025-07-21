/**
 * CubeUI class - Extends RubiksCube with DOM/SVG display functionality
 * Handles all the visual rendering while keeping core logic separate
 */
class CubeUI extends RubiksCube {
    constructor() {
        super();
        this.cubeSize = 60;
        this.spacing = 2;
        this.svg = document.getElementById('cube');
        
        this.drawCube();
    }

    // Create a single square of the cube
    createSquare(x, y, color) {
        const square = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        square.setAttribute('points', `${x},${y} ${x + this.cubeSize},${y} ${x + this.cubeSize},${y + this.cubeSize} ${x},${y + this.cubeSize}`);
        square.setAttribute('fill', color);
        square.setAttribute('class', 'face-square');
        square.setAttribute('filter', 'url(#shadow)');
        return square;
    }

    // Create a parallelogram for the right face
    createRightFace(x, y, color) {
        const face = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const offset = this.cubeSize * 0.5;
        face.setAttribute('points', 
            `${x},${y} ${x + offset},${y - offset} ${x + offset},${y + this.cubeSize - offset} ${x},${y + this.cubeSize}`
        );
        face.setAttribute('fill', color);
        face.setAttribute('class', 'face-square');
        face.setAttribute('filter', 'url(#shadow)');
        return face;
    }

    // Create a parallelogram for the top face
    createTopFace(x, y, color) {
        const face = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const offset = this.cubeSize * 0.5;
        face.setAttribute('points', 
            `${x},${y} ${x + this.cubeSize},${y} ${x + this.cubeSize + offset},${y - offset} ${x + offset},${y - offset}`
        );
        face.setAttribute('fill', color);
        face.setAttribute('class', 'face-square');
        face.setAttribute('filter', 'url(#shadow)');
        return face;
    }

    drawCube() {
        this.svg.innerHTML = ''; // Clear previous drawing
        
        const startX = -150;
        const startY = -88;
        const squareSize = this.cubeSize + this.spacing;
        const offset = this.cubeSize * 0.5;

        // Draw the front face (3x3 grid)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const x = startX + col * squareSize;
                const y = startY + row * squareSize;
                const color = this.faces[0][row][col];
                const square = this.createSquare(x, y, color);
                this.svg.appendChild(square);
            }
        }

        // Draw the right face (3x3 grid, with 3D effect)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const x = startX + 3 * squareSize + col * offset;
                const y = startY + row * squareSize - col * offset;
                const color = this.faces[1][row][col];
                const face = this.createRightFace(x, y, color);
                this.svg.appendChild(face);
            }
        }

        // Draw the top face (3x3 grid, with 3D effect)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const x = startX + col * squareSize + row * offset;
                const y = startY - offset - row * offset + (squareSize / 2);
                const color = this.faces[2][2-row][col]; // Reversed row order for correct display
                const face = this.createTopFace(x, y, color);
                this.svg.appendChild(face);
            }
        }
    }

    redrawCube() {
        this.drawCube();
    }

    // Override parent methods to add redraw calls
    rotateColumnDown(col) {
        super.rotateColumnDown(col);
        this.redrawCube();
    }

    rotateColumnUp(col) {
        super.rotateColumnUp(col);
        this.redrawCube();
    }

    rotateRowRight(row) {
        super.rotateRowRight(row);
        this.redrawCube();
    }

    rotateRowLeft(row) {
        super.rotateRowLeft(row);
        this.redrawCube();
    }

    rotateAllRowsLeft() {
        super.rotateAllRowsLeft();
        this.redrawCube();
    }

    rotateAllRowsRight() {
        super.rotateAllRowsRight();
        this.redrawCube();
    }

    rotateAllColumnsUp() {
        super.rotateAllColumnsUp();
        this.redrawCube();
    }

    rotateAllColumnsDown() {
        super.rotateAllColumnsDown();
        this.redrawCube();
    }

    rotateFrontClockwise() {
        super.rotateFrontClockwise();
        this.redrawCube();
    }

    rotateFrontCounterClockwise() {
        super.rotateFrontCounterClockwise();
        this.redrawCube();
    }

    shuffle() {
        super.shuffle();
        this.redrawCube();
    }
} 
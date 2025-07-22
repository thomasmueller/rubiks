/**
 * RubiksCube class - Core logic for a 3x3 Rubik's cube
 * Extracted from the HTML implementation to be testable with Node.js
 */
class RubiksCube {
    constructor() {
        // Initialize 3D array for cube colors
        // faces: 0=front, 1=right, 2=top, 3=back, 4=left, 5=bottom
        this.faces = [
            // Front face (white)
            [
                ['#ffffff', '#ffffff', '#ffffff'],
                ['#ffffff', '#ffffff', '#ffffff'],
                ['#ffffff', '#ffffff', '#ffffff']
            ],
            // Right face (red)
            [
                ['#ff0000', '#ff0000', '#ff0000'],
                ['#ff0000', '#ff0000', '#ff0000'],
                ['#ff0000', '#ff0000', '#ff0000']
            ],
            // Top face (yellow)
            [
                ['#ffff00', '#ffff00', '#ffff00'],
                ['#ffff00', '#ffff00', '#ffff00'],
                ['#ffff00', '#ffff00', '#ffff00']
            ],
            // Back face (orange) - hidden
            [
                ['#ff8000', '#ff8000', '#ff8000'],
                ['#ff8000', '#ff8000', '#ff8000'],
                ['#ff8000', '#ff8000', '#ff8000']
            ],
            // Left face (blue) - hidden
            [
                ['#0000ff', '#0000ff', '#0000ff'],
                ['#0000ff', '#0000ff', '#0000ff'],
                ['#0000ff', '#0000ff', '#0000ff']
            ],
            // Bottom face (green) - hidden
            [
                ['#00ff00', '#00ff00', '#00ff00'],
                ['#00ff00', '#00ff00', '#00ff00'],
                ['#00ff00', '#00ff00', '#00ff00']
            ]
        ];
    }

    // Rotate a column down (implemented as 3x up)
    rotateColumnDown(col) {
        this.rotateColumnUp(col);
        this.rotateColumnUp(col);
        this.rotateColumnUp(col);
    }

    // Rotate a column up (reverse of down rotation)
    rotateColumnUp(col) {
        // Store the column from each face in the vertical cycle
        const topCol = [this.faces[2][0][col], this.faces[2][1][col], this.faces[2][2][col]];
        const frontCol = [this.faces[0][0][col], this.faces[0][1][col], this.faces[0][2][col]];
        const bottomCol = [this.faces[5][2][col], this.faces[5][1][col], this.faces[5][0][col]];
        const backCol = [this.faces[3][0][col], this.faces[3][1][col], this.faces[3][2][col]]; // Back face is mirrored horizontally
        
        // Cycle: top → back → bottom → front → top (pieces move up)
        for (let row = 0; row < 3; row++) {
            this.faces[3][2-row][col] = topCol[row];        // top → back (reversed vertically and mirrored)
            this.faces[5][row][col] = backCol[row];         // back → bottom (reversed vertically)
            this.faces[0][row][col] = bottomCol[row];         // bottom → front
            this.faces[2][row][col] = frontCol[row];          // front → top
        }

        // Only rotate side faces when rotating their respective columns (opposite direction)
        if (col === 0) {
            this.rotateFaceClockwise(4); // Rotate left face clockwise when moving up
        } else if (col === 2) {
            this.rotateFaceClockwise(1); // Rotate right face clockwise when moving up
        }
    }

    // Rotate a row to the right (implemented as 3x left)
    rotateRowRight(row) {
        this.rotateRowLeft(row);
        this.rotateRowLeft(row);
        this.rotateRowLeft(row);
    }

    // Rotate a row to the left
    rotateRowLeft(row) {
        // Store the row from each face in the horizontal cycle
        const frontRow = [this.faces[0][row][0], this.faces[0][row][1], this.faces[0][row][2]];
        const rightRow = [this.faces[1][row][0], this.faces[1][row][1], this.faces[1][row][2]];
        const backRow = [this.faces[3][row][0], this.faces[3][row][1], this.faces[3][row][2]];
        const leftRow = [this.faces[4][row][0], this.faces[4][row][1], this.faces[4][row][2]];

        // Cycle: front → left → back → right → front (pieces move left)
        for (let col = 0; col < 3; col++) {
            this.faces[4][row][2-col] = frontRow[col];        // front → left (mirrored)
            this.faces[3][row][2-col] = leftRow[2-col];       // left → back (mirrored)
            this.faces[1][row][col] = backRow[2-col];         // back → right (mirrored)
            this.faces[0][row][col] = rightRow[col];          // right → front
        }

        // Rotate corresponding face when rotating top/bottom rows (opposite direction)
        if (row === 0) {
            this.rotateFaceClockwise(2); // Rotate top face clockwise
        } else if (row === 2) {
            this.rotateFaceClockwise(5); // Rotate bottom face clockwise
        }
    }

    // Rotate all rows to the left
    rotateAllRowsLeft() {
        this.rotateRowLeft(0);
        this.rotateRowLeft(1);
        this.rotateRowLeft(2);
    }

    // Rotate all rows to the right (implemented as 3x left)
    rotateAllRowsRight() {
        this.rotateAllRowsLeft();
        this.rotateAllRowsLeft();
        this.rotateAllRowsLeft();
    }

    // Rotate all columns up (implemented as individual column operations)
    rotateAllColumnsUp() {
        this.rotateColumnUp(0);
        this.rotateColumnUp(1);
        this.rotateColumnUp(2);
    }

    // Rotate all columns down (implemented as 3x up)
    rotateAllColumnsDown() {
        this.rotateAllColumnsUp();
        this.rotateAllColumnsUp();
        this.rotateAllColumnsUp();
    }

    // Rotate the front face clockwise
    rotateFrontClockwise() {
        this.rotateAllRowsRight();
        this.rotateColumnUp(2);
        this.rotateAllRowsLeft();
    }

    // Rotate the front face counter-clockwise (implemented as 3x clockwise)
    rotateFrontCounterClockwise() {
        this.rotateFrontClockwise();
        this.rotateFrontClockwise();
        this.rotateFrontClockwise();
    }

    // Shuffle the cube by performing random moves
    shuffle() {
        const moves = [
            () => this.rotateRowLeft(0),
            () => this.rotateRowLeft(1),
            () => this.rotateRowLeft(2),
            () => this.rotateRowRight(0),
            () => this.rotateRowRight(1),
            () => this.rotateRowRight(2),
            () => this.rotateColumnUp(0),
            () => this.rotateColumnUp(1),
            () => this.rotateColumnUp(2),
            () => this.rotateColumnDown(0),
            () => this.rotateColumnDown(1),
            () => this.rotateColumnDown(2),
            () => this.rotateFrontClockwise(),
            () => this.rotateFrontCounterClockwise()
        ];
        
        // Perform 20 random moves to shuffle the cube
        for (let i = 0; i < 20; i++) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            randomMove();
        }
    }

    // Validation function to check for impossible cube states
    // Only validate the visible corner (top-right corner where front, right, and top faces meet)
    validateCube() {
        // Check only the visible corner piece (should have 3 different colors)
        // Front-top-right corner (the only visible corner in our 3D display)
        const visibleCorner = [this.faces[0][0][2], this.faces[2][2][2], this.faces[1][0][0]];
        
        if (visibleCorner[0] === visibleCorner[1] || 
            visibleCorner[0] === visibleCorner[2] || 
            visibleCorner[1] === visibleCorner[2]) {
            return {
                valid: false,
                error: `Visible corner has duplicate colors: [${visibleCorner.join(', ')}]`
            };
        }

        return { valid: true };
    }

    // Helper function to rotate a face clockwise
    rotateFaceClockwise(faceIndex) {
        const face = this.faces[faceIndex];
        const temp = [
            [face[0][0], face[0][1], face[0][2]],
            [face[1][0], face[1][1], face[1][2]],
            [face[2][0], face[2][1], face[2][2]]
        ];
        
        // Rotate 90 degrees clockwise
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                face[col][2-row] = temp[row][col];
            }
        }
    }

    // Helper function to rotate a face counter-clockwise
    rotateFaceCounterClockwise(faceIndex) {
        const face = this.faces[faceIndex];
        const temp = [
            [face[0][0], face[0][1], face[0][2]],
            [face[1][0], face[1][1], face[1][2]],
            [face[2][0], face[2][1], face[2][2]]
        ];
        
        // Rotate 90 degrees counter-clockwise
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                face[2-col][row] = temp[row][col];
            }
        }
    }

    // Helper method to get a deep copy of the current state
    getState() {
        return JSON.parse(JSON.stringify(this.faces));
    }

    // Helper method to set the cube state (for testing)
    setState(faces) {
        this.faces = JSON.parse(JSON.stringify(faces));
    }

    // Helper method to check if cube is in solved state
    isSolved() {
        const expectedColors = [
            '#ffffff', // front (white)
            '#ff0000', // right (red) 
            '#ffff00', // top (yellow)
            '#ff8000', // back (orange)
            '#0000ff', // left (blue)
            '#00ff00'  // bottom (green)
        ];

        for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
            const expectedColor = expectedColors[faceIndex];
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (this.faces[faceIndex][row][col] !== expectedColor) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}

// Export for Node.js and browser compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RubiksCube;
} else if (typeof window !== 'undefined') {
    window.RubiksCube = RubiksCube;
} 
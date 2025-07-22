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
        
        // Drag tracking properties
        this.isDragging = false;
        this.dragStartRow = -1;
        this.dragStartCol = -1;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragCurrentX = 0;
        this.dragCurrentY = 0;
        
        this.drawCube();
    }

    // Create a single square of the cube
    createSquare(x, y, color, row = -1, col = -1, isFrontFace = false) {
        const square = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        square.setAttribute('points', `${x},${y} ${x + this.cubeSize},${y} ${x + this.cubeSize},${y + this.cubeSize} ${x},${y + this.cubeSize}`);
        square.setAttribute('fill', color);
        square.setAttribute('class', 'face-square');
        square.setAttribute('filter', 'url(#shadow)');
        
        // Add drag events for front face squares
        if (isFrontFace && row >= 0 && col >= 0) {
            square.style.cursor = 'grab';
            square.setAttribute('data-row', row);
            square.setAttribute('data-col', col);
            
            // Mouse events
            square.addEventListener('mousedown', (e) => this.handleDragStart(e, row, col));
            
            // Touch events
            square.addEventListener('touchstart', (e) => this.handleDragStart(e, row, col), { passive: false });
        }
        
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
                const square = this.createSquare(x, y, color, row, col, true);
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

        // Add labels for the visible faces
    }

    // Helper method to add face labels
    addFaceLabel(x, y, text) {
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', 'white');
        label.setAttribute('font-family', 'Arial, sans-serif');
        label.setAttribute('font-size', '14');
        label.setAttribute('font-weight', 'bold');
        label.textContent = text;
        this.svg.appendChild(label);
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

    // Drag event handlers
    handleDragStart(e, row, col) {
        e.preventDefault();
        this.isDragging = true;
        this.dragStartRow = row;
        this.dragStartCol = col;
        
        // Store initial coordinates
        const rect = this.svg.getBoundingClientRect();
        if (e.type === 'touchstart') {
            this.dragStartX = e.touches[0].clientX - rect.left;
            this.dragStartY = e.touches[0].clientY - rect.top;
        } else {
            this.dragStartX = e.clientX - rect.left;
            this.dragStartY = e.clientY - rect.top;
        }
        
        // Initialize current position to start position (for clicks without movement)
        this.dragCurrentX = this.dragStartX;
        this.dragCurrentY = this.dragStartY;
        
        // Change cursor to grabbing
        e.target.style.cursor = 'grabbing';
        
        // Add global event listeners
        this.addGlobalDragListeners();
    }

    addGlobalDragListeners() {
        // Mouse events
        this.mouseMoveHandler = (e) => this.handleDragMove(e);
        this.mouseUpHandler = (e) => this.handleDragEnd(e);
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
        
        // Touch events
        this.touchMoveHandler = (e) => this.handleDragMove(e);
        this.touchEndHandler = (e) => this.handleDragEnd(e);
        document.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
        document.addEventListener('touchend', this.touchEndHandler, { passive: false });
    }

    removeGlobalDragListeners() {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
        document.removeEventListener('touchmove', this.touchMoveHandler);
        document.removeEventListener('touchend', this.touchEndHandler);
    }

    handleDragMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        
        // Update current coordinates
        const rect = this.svg.getBoundingClientRect();
        if (e.type === 'touchmove') {
            this.dragCurrentX = e.touches[0].clientX - rect.left;
            this.dragCurrentY = e.touches[0].clientY - rect.top;
        } else {
            this.dragCurrentX = e.clientX - rect.left;
            this.dragCurrentY = e.clientY - rect.top;
        }
    }

    handleDragEnd(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        
        this.isDragging = false;
        
        // Remove global event listeners
        this.removeGlobalDragListeners();
        
        // Reset cursor for all front face squares
        const frontSquares = this.svg.querySelectorAll('[data-row]');
        frontSquares.forEach(square => {
            square.style.cursor = 'grab';
        });
        
        // Calculate drag direction and perform rotation
        this.processDrag();
        
        // Reset drag tracking
        this.dragStartRow = -1;
        this.dragStartCol = -1;
    }

    processDrag() {
        // Calculate drag distance
        const deltaX = this.dragCurrentX - this.dragStartX;
        const deltaY = this.dragCurrentY - this.dragStartY;
        
        // Check for significant movement
        const minDrag = 20;
        if (Math.abs(deltaX) < minDrag && Math.abs(deltaY) < minDrag) return;
        
        // Calculate movement in squares by dividing by square width
        const squareSize = this.cubeSize + this.spacing; // 62 pixels
        const dragX = Math.round(deltaX / squareSize);
        const dragY = Math.round(deltaY / squareSize);

        if (dragX === 0 && dragY === 0) {
            return;
        }

        console.log("dragX: ", dragX, "dragY: ", dragY);
        
        // Apply rotation logic
        if (dragX === 0) {
            // Column rotation
            if (dragY > 0) {
                this.rotateColumnDown(this.dragStartCol);
            } else {
                this.rotateColumnUp(this.dragStartCol);
            }
        } else if (dragY === 0) {
            // Row rotation
            if (dragX > 0) {
                this.rotateRowRight(this.dragStartRow);
            } else {
                this.rotateRowLeft(this.dragStartRow);
            }
        } else {
            // Front face rotation
            if (dragX > 0 && dragY > 0) {
                this.rotateFrontClockwise();
            } else {
                this.rotateFrontCounterClockwise();
            }
        }
    }
} 
const RubiksCube = require('./rubiks-cube.js');

/**
 * Simple test framework
 */
class TestFramework {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, testFunction) {
        this.tests.push({ name, testFunction });
    }

    async run() {
        console.log('🧪 Running Rubik\'s Cube Tests\n');
        
        for (const { name, testFunction } of this.tests) {
            try {
                await testFunction();
                console.log(`✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${name}`);
                console.log(`   Error: ${error.message}\n`);
                this.failed++;
            }
        }

        console.log('\n📊 Test Results:');
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Success Rate: ${Math.round((this.passed / (this.passed + this.failed)) * 100)}%`);
        
        if (this.failed > 0) {
            process.exit(1);
        }
    }

    assert(condition, message = 'Assertion failed') {
        if (!condition) {
            throw new Error(message);
        }
    }

    assertEqual(actual, expected, message = 'Values are not equal') {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`${message}. Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`);
        }
    }

    assertValidCube(cube, message = 'Cube state is invalid') {
        const validation = cube.validateCube();
        if (!validation.valid) {
            throw new Error(`${message}: ${validation.error}`);
        }
    }
}

const test = new TestFramework();

// Test initial state
test.test('Initial cube should be solved', () => {
    const cube = new RubiksCube();
    test.assert(cube.isSolved(), 'Initial cube should be in solved state');
    test.assertValidCube(cube, 'Initial cube should have valid corner pieces');
});

// Test single rotations maintain cube validity
test.test('Single column down rotation should maintain cube validity', () => {
    const cube = new RubiksCube();
    cube.rotateColumnDown(0);
    test.assertValidCube(cube, 'Cube should remain valid after column down rotation');
    test.assert(!cube.isSolved(), 'Cube should not be solved after rotation');
});

test.test('Single column up rotation should maintain cube validity', () => {
    const cube = new RubiksCube();
    cube.rotateColumnUp(1);
    test.assertValidCube(cube, 'Cube should remain valid after column up rotation');
});

test.test('Single row left rotation should maintain cube validity', () => {
    const cube = new RubiksCube();
    cube.rotateRowLeft(0);
    test.assertValidCube(cube, 'Cube should remain valid after row left rotation');
});

test.test('Single row right rotation should maintain cube validity', () => {
    const cube = new RubiksCube();
    cube.rotateRowRight(2);
    test.assertValidCube(cube, 'Cube should remain valid after row right rotation');
});

test.test('Front face clockwise rotation should maintain cube validity', () => {
    const cube = new RubiksCube();
    cube.rotateFrontClockwise();
    test.assertValidCube(cube, 'Cube should remain valid after front clockwise rotation');
});

test.test('Front face counter-clockwise rotation should maintain cube validity', () => {
    const cube = new RubiksCube();
    cube.rotateFrontCounterClockwise();
    test.assertValidCube(cube, 'Cube should remain valid after front counter-clockwise rotation');
});

// Test the problematic sequence: "rotate clockwise" + "move all columns up"
test.test('Problematic sequence: Front clockwise + All columns up should maintain validity', () => {
    const cube = new RubiksCube();
    
    // Store initial state
    const initialState = cube.getState();
    
    // Perform the problematic sequence multiple times
    for (let i = 0; i < 5; i++) {
        cube.rotateFrontClockwise();
        test.assertValidCube(cube, `Cube should remain valid after front clockwise rotation (iteration ${i + 1})`);
        
        cube.rotateAllColumnsUp();
        test.assertValidCube(cube, `Cube should remain valid after all columns up rotation (iteration ${i + 1})`);
    }
});

// Test reverse operations should return to original state
test.test('Column down followed by column up should return to original state', () => {
    const cube = new RubiksCube();
    const initialState = cube.getState();
    
    cube.rotateColumnDown(1);
    test.assertValidCube(cube, 'Cube should remain valid after column down');
    
    cube.rotateColumnUp(1);
    test.assertValidCube(cube, 'Cube should remain valid after column up');
    test.assertEqual(cube.getState(), initialState, 'Cube should return to original state');
});

test.test('Row left followed by row right should return to original state', () => {
    const cube = new RubiksCube();
    const initialState = cube.getState();
    
    cube.rotateRowLeft(0);
    test.assertValidCube(cube, 'Cube should remain valid after row left');
    
    cube.rotateRowRight(0);
    test.assertValidCube(cube, 'Cube should remain valid after row right');
    test.assertEqual(cube.getState(), initialState, 'Cube should return to original state');
});

test.test('Front clockwise followed by counter-clockwise should return to original state', () => {
    const cube = new RubiksCube();
    const initialState = cube.getState();
    
    cube.rotateFrontClockwise();
    test.assertValidCube(cube, 'Cube should remain valid after front clockwise');
    
    cube.rotateFrontCounterClockwise();
    test.assertValidCube(cube, 'Cube should remain valid after front counter-clockwise');
    test.assertEqual(cube.getState(), initialState, 'Cube should return to original state');
});

// Test 4x rotations should return to original state
test.test('4x column down rotations should return to original state', () => {
    const cube = new RubiksCube();
    const initialState = cube.getState();
    
    for (let i = 0; i < 4; i++) {
        cube.rotateColumnDown(0);
        test.assertValidCube(cube, `Cube should remain valid after column down rotation ${i + 1}`);
    }
    
    test.assertEqual(cube.getState(), initialState, 'Cube should return to original state after 4 rotations');
});

test.test('4x front clockwise rotations should return to original state', () => {
    const cube = new RubiksCube();
    const initialState = cube.getState();
    
    for (let i = 0; i < 4; i++) {
        cube.rotateFrontClockwise();
        test.assertValidCube(cube, `Cube should remain valid after front clockwise rotation ${i + 1}`);
    }
    
    test.assertEqual(cube.getState(), initialState, 'Cube should return to original state after 4 rotations');
});

// Test all columns up vs individual columns
test.test('All columns up should equal three individual column ups', () => {
    const cube1 = new RubiksCube();
    const cube2 = new RubiksCube();
    
    // Method 1: Use rotateAllColumnsUp
    cube1.rotateAllColumnsUp();
    test.assertValidCube(cube1, 'Cube1 should remain valid after all columns up');
    
    // Method 2: Use individual rotateColumnUp for each column
    cube2.rotateColumnUp(0);
    cube2.rotateColumnUp(1);
    cube2.rotateColumnUp(2);
    test.assertValidCube(cube2, 'Cube2 should remain valid after individual column ups');
    
    test.assertEqual(cube1.getState(), cube2.getState(), 'Both methods should produce the same result');
});

// Test extensive sequence that might expose corner duplication bug
test.test('Extensive alternating sequence should maintain cube validity', () => {
    const cube = new RubiksCube();
    
    // Perform alternating sequence many times
    for (let i = 0; i < 10; i++) {
        cube.rotateFrontClockwise();
        test.assertValidCube(cube, `Cube should remain valid after front clockwise (iteration ${i + 1})`);
        
        cube.rotateAllColumnsUp();
        test.assertValidCube(cube, `Cube should remain valid after all columns up (iteration ${i + 1})`);
        
        cube.rotateFrontCounterClockwise();
        test.assertValidCube(cube, `Cube should remain valid after front counter-clockwise (iteration ${i + 1})`);
        
        cube.rotateAllColumnsDown();
        test.assertValidCube(cube, `Cube should remain valid after all columns down (iteration ${i + 1})`);
    }
});

// Test shuffle function
test.test('Shuffle should maintain cube validity', () => {
    const cube = new RubiksCube();
    const initialState = cube.getState();
    
    cube.shuffle();
    test.assertValidCube(cube, 'Cube should remain valid after shuffle');
    
    // Very unlikely that shuffle returns to solved state
    test.assert(!cube.isSolved(), 'Cube should not be solved after shuffle (extremely unlikely)');
});

// Test face rotation helpers
test.test('Face rotation helpers should work correctly', () => {
    const cube = new RubiksCube();
    const initialFrontFace = JSON.parse(JSON.stringify(cube.faces[0]));
    
    // Rotate clockwise then counter-clockwise
    cube.rotateFaceClockwise(0);
    cube.rotateFaceCounterClockwise(0);
    
    test.assertEqual(cube.faces[0], initialFrontFace, 'Face should return to original state after clockwise+counter-clockwise');
});

// Test specific corner validation (only visible corner)
test.test('Corner validation should detect invalid states', () => {
    const cube = new RubiksCube();
    
    // Manually create an invalid state in the VISIBLE corner (duplicate colors)
    cube.faces[0][0][2] = '#ff0000'; // front-top-right (visible)
    cube.faces[2][2][2] = '#ff0000'; // same corner on top face (visible)
    cube.faces[1][0][0] = '#0000ff'; // same corner on right face (visible)
    
    const validation = cube.validateCube();
    test.assert(!validation.valid, 'Validation should detect invalid visible corner');
    test.assert(validation.error.includes('duplicate colors'), 'Error should mention duplicate colors');
});

// Test edge case: all three colors of the visible corner being the same
test.test('Corner validation should detect all-same-color corner', () => {
    const cube = new RubiksCube();
    
    // Make all three colors of the VISIBLE corner the same
    cube.faces[0][0][2] = '#ff0000'; // front-top-right (visible)
    cube.faces[2][2][2] = '#ff0000'; // same corner on top face (visible)
    cube.faces[1][0][0] = '#ff0000'; // same corner on right face (visible)
    
    const validation = cube.validateCube();
    test.assert(!validation.valid, 'Validation should detect all-same-color visible corner');
});

// Run all tests
test.run().then(() => {
    console.log('\n🎉 All tests completed!');
}).catch((error) => {
    console.error('\n💥 Test suite failed:', error);
    process.exit(1);
}); 
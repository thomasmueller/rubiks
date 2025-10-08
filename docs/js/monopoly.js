// Monopoly Game Simulation
class MonopolyGame {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.gameStarted = false;
        this.boardPositions = this.initializeBoardPositions();
        this.communityChestCards = this.initializeCommunityChestCards();
        this.chanceCards = this.initializeChanceCards();
    }

    initializeBoardPositions() {
        return [
            { name: "GO", type: "corner", action: "collect", amount: 200 },
            { name: "Mediterranean Ave", type: "property", price: 60, rent: [2, 10, 30, 90, 160, 250], color: "brown", owner: null },
            { name: "Community Chest", type: "card" },
            { name: "Baltic Ave", type: "property", price: 60, rent: [4, 20, 60, 180, 320, 450], color: "brown", owner: null },
            { name: "Income Tax", type: "tax", amount: 200 },
            { name: "Reading Railroad", type: "railroad", price: 200, owner: null },
            { name: "Oriental Ave", type: "property", price: 100, rent: [6, 30, 90, 270, 400, 550], color: "lightblue", owner: null },
            { name: "Chance", type: "card" },
            { name: "Vermont Ave", type: "property", price: 100, rent: [6, 30, 90, 270, 400, 550], color: "lightblue", owner: null },
            { name: "Connecticut Ave", type: "property", price: 120, rent: [8, 40, 100, 300, 450, 600], color: "lightblue", owner: null },
            { name: "Jail", type: "corner" },
            { name: "St. Charles Place", type: "property", price: 140, rent: [10, 50, 150, 450, 625, 750], color: "pink", owner: null },
            { name: "Electric Company", type: "utility", price: 150, owner: null },
            { name: "States Ave", type: "property", price: 140, rent: [10, 50, 150, 450, 625, 750], color: "pink", owner: null },
            { name: "Virginia Ave", type: "property", price: 160, rent: [12, 60, 180, 500, 700, 900], color: "pink", owner: null },
            { name: "Pennsylvania Railroad", type: "railroad", price: 200, owner: null },
            { name: "St. James Place", type: "property", price: 180, rent: [14, 70, 200, 550, 750, 950], color: "orange", owner: null },
            { name: "Community Chest", type: "card" },
            { name: "Tennessee Ave", type: "property", price: 180, rent: [14, 70, 200, 550, 750, 950], color: "orange", owner: null },
            { name: "New York Ave", type: "property", price: 200, rent: [16, 80, 220, 600, 800, 1000], color: "orange", owner: null },
            { name: "Free Parking", type: "corner" },
            { name: "Kentucky Ave", type: "property", price: 220, rent: [18, 90, 250, 700, 875, 1050], color: "red", owner: null },
            { name: "Chance", type: "card" },
            { name: "Indiana Ave", type: "property", price: 220, rent: [18, 90, 250, 700, 875, 1050], color: "red", owner: null },
            { name: "Illinois Ave", type: "property", price: 240, rent: [20, 100, 300, 750, 925, 1100], color: "red", owner: null },
            { name: "B&O Railroad", type: "railroad", price: 200, owner: null },
            { name: "Atlantic Ave", type: "property", price: 260, rent: [22, 110, 330, 800, 975, 1150], color: "yellow", owner: null },
            { name: "Ventnor Ave", type: "property", price: 260, rent: [22, 110, 330, 800, 975, 1150], color: "yellow", owner: null },
            { name: "Water Works", type: "utility", price: 150, owner: null },
            { name: "Marvin Gardens", type: "property", price: 280, rent: [24, 120, 360, 850, 1025, 1200], color: "yellow", owner: null },
            { name: "Go to Jail", type: "corner", action: "jail" },
            { name: "Pacific Ave", type: "property", price: 300, rent: [26, 130, 390, 900, 1100, 1275], color: "green", owner: null },
            { name: "Community Chest", type: "card" },
            { name: "North Carolina Ave", type: "property", price: 300, rent: [26, 130, 390, 900, 1100, 1275], color: "green", owner: null },
            { name: "Pennsylvania Ave", type: "property", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], color: "green", owner: null },
            { name: "Short Line Railroad", type: "railroad", price: 200, owner: null },
            { name: "Chance", type: "card" },
            { name: "Park Place", type: "property", price: 350, rent: [35, 175, 500, 1100, 1300, 1500], color: "darkblue", owner: null },
            { name: "Luxury Tax", type: "tax", amount: 100 },
            { name: "Boardwalk", type: "property", price: 400, rent: [50, 200, 600, 1400, 1700, 2000], color: "darkblue", owner: null }
        ];
    }

    initializeCommunityChestCards() {
        return [
            { text: "Advance to GO (Collect $200)", action: "move", position: 0 },
            { text: "Bank error in your favor. Collect $200", action: "money", amount: 200 },
            { text: "Doctor's fee. Pay $50", action: "money", amount: -50 },
            { text: "From sale of stock you get $50", action: "money", amount: 50 },
            { text: "Get Out of Jail Free", action: "jail_free" },
            { text: "Go to Jail", action: "go_to_jail" },
            { text: "Holiday fund matures. Receive $100", action: "money", amount: 100 },
            { text: "Income tax refund. Collect $20", action: "money", amount: 20 },
            { text: "Life insurance matures. Collect $100", action: "money", amount: 100 },
            { text: "Pay hospital fees of $100", action: "money", amount: -100 },
            { text: "Pay school fees of $50", action: "money", amount: -50 },
            { text: "Receive $25 consultancy fee", action: "money", amount: 25 },
            { text: "You are assessed for street repair. $40 per house, $115 per hotel", action: "repair" },
            { text: "You have won second prize in a beauty contest. Collect $10", action: "money", amount: 10 },
            { text: "You inherit $100", action: "money", amount: 100 },
            { text: "Xmas fund matures. Collect $100", action: "money", amount: 100 }
        ];
    }

    initializeChanceCards() {
        return [
            { text: "Advance to GO (Collect $200)", action: "move", position: 0 },
            { text: "Advance to Illinois Avenue", action: "move", position: 24 },
            { text: "Advance to St. Charles Place", action: "move", position: 11 },
            { text: "Advance token to nearest Utility", action: "move_utility" },
            { text: "Advance to nearest Railroad", action: "move_railroad" },
            { text: "Bank pays you dividend of $50", action: "money", amount: 50 },
            { text: "Get Out of Jail Free", action: "jail_free" },
            { text: "Go back 3 spaces", action: "move_relative", spaces: -3 },
            { text: "Go to Jail", action: "go_to_jail" },
            { text: "Make general repairs on all your property", action: "repair" },
            { text: "Speeding fine $15", action: "money", amount: -15 },
            { text: "Take a trip to Reading Railroad", action: "move", position: 5 },
            { text: "Take a walk on the Boardwalk", action: "move", position: 39 },
            { text: "You have been elected Chairman of the Board", action: "money", amount: 50 },
            { text: "Your building loan matures. Collect $150", action: "money", amount: 150 },
            { text: "You have won a crossword competition. Collect $100", action: "money", amount: 100 }
        ];
    }

    startGame(playerCount) {
        this.players = [];
        for (let i = 0; i < playerCount; i++) {
            const personalitySelect = document.getElementById(`player-${i + 1}-personality`);
            const personality = personalitySelect ? personalitySelect.value : 'buy';
            
            this.players.push({
                id: i + 1,
                name: `Player ${i + 1}`,
                money: 1500,
                position: 0,
                properties: [],
                inJail: false,
                jailTurns: 0,
                getOutOfJailCards: 0,
                personality: personality
            });
        }
        this.currentPlayerIndex = 0;
        this.gameStarted = true;
        this.updateDisplay();
        this.logMessage("Game started with " + playerCount + " players!");
        this.logMessage("Player personalities: " + this.players.map(p => `${p.name} (${p.personality})`).join(", "));
        document.getElementById('roll-dice').disabled = false;
    }

    rollDice() {
        if (!this.gameStarted) return;

        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const total = dice1 + dice2;
        const isDoubles = dice1 === dice2;

        document.getElementById('dice-result').textContent = 
            `Rolled: ${dice1} + ${dice2} = ${total}${isDoubles ? ' (Doubles!)' : ''}`;

        const currentPlayer = this.players[this.currentPlayerIndex];
        this.logMessage(`${currentPlayer.name} rolled ${dice1} + ${dice2} = ${total}`);

        if (currentPlayer.inJail) {
            this.handleJailTurn(currentPlayer, isDoubles);
        } else {
            this.movePlayer(currentPlayer, total);
        }

        if (!isDoubles || currentPlayer.inJail) {
            this.nextTurn();
        } else {
            this.logMessage(`${currentPlayer.name} rolled doubles and gets another turn!`);
        }

        this.updateDisplay();
    }

    handleJailTurn(player, isDoubles) {
        if (isDoubles) {
            player.inJail = false;
            player.jailTurns = 0;
            this.logMessage(`${player.name} rolled doubles and is released from jail!`);
        } else {
            player.jailTurns++;
            if (player.jailTurns >= 3) {
                player.inJail = false;
                player.jailTurns = 0;
                player.money -= 50;
                this.logMessage(`${player.name} paid $50 to get out of jail after 3 turns.`);
            } else {
                this.logMessage(`${player.name} stays in jail. Turn ${player.jailTurns}/3.`);
            }
        }
    }

    movePlayer(player, spaces) {
        const oldPosition = player.position;
        player.position = (player.position + spaces) % 40;
        
        // Check if player passed GO
        if (player.position < oldPosition) {
            player.money += 200;
            this.logMessage(`${player.name} passed GO and collected $200!`);
        }

        const landedOn = this.boardPositions[player.position];
        this.logMessage(`${player.name} landed on ${landedOn.name}`);

        this.handleLandedPosition(player, landedOn);
        this.updatePlayerPosition(player);
    }

    handleLandedPosition(player, position) {
        switch (position.type) {
            case "property":
            case "railroad":
            case "utility":
                this.handlePropertyLanding(player, position);
                break;
            case "tax":
                player.money -= position.amount;
                this.logMessage(`${player.name} paid $${position.amount} in taxes.`);
                break;
            case "card":
                this.handleCardDraw(player, position.name);
                break;
            case "corner":
                this.handleCornerLanding(player, position);
                break;
        }
    }

    handlePropertyLanding(player, property) {
        if (property.owner === null) {
            // Property available for purchase - use bot logic
            if (player.money >= property.price) {
                let shouldBuy = false;
                
                if (player.personality === 'buy') {
                    shouldBuy = true;
                    this.logMessage(`${player.name} (${player.personality} bot) decides to buy ${property.name}.`);
                } else if (player.personality === 'conserve') {
                    shouldBuy = false;
                    this.logMessage(`${player.name} (${player.personality} bot) decides not to buy ${property.name}.`);
                }
                
                if (shouldBuy) {
                    player.money -= property.price;
                    property.owner = player.id;
                    player.properties.push(property.name);
                    this.logMessage(`${player.name} bought ${property.name} for $${property.price}.`);
                }
            } else {
                this.logMessage(`${player.name} cannot afford ${property.name} ($${property.price}).`);
            }
        } else if (property.owner !== player.id) {
            // Pay rent to owner
            const owner = this.players.find(p => p.id === property.owner);
            let rent = 0;

            if (property.type === "railroad") {
                const railroadsOwned = this.countRailroadsOwnedBy(property.owner);
                rent = 25 * Math.pow(2, railroadsOwned - 1);
            } else if (property.type === "utility") {
                const utilitiesOwned = this.countUtilitiesOwnedBy(property.owner);
                const multiplier = utilitiesOwned === 1 ? 4 : 10;
                rent = multiplier * (Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1);
            } else {
                rent = property.rent[0]; // Basic rent for now
            }

            player.money -= rent;
            owner.money += rent;
            this.logMessage(`${player.name} paid $${rent} rent to ${owner.name} for ${property.name}.`);
        }
    }

    handleCardDraw(player, cardType) {
        let cards = cardType.includes("Community") ? this.communityChestCards : this.chanceCards;
        const card = cards[Math.floor(Math.random() * cards.length)];
        this.logMessage(`${player.name} drew: "${card.text}"`);

        switch (card.action) {
            case "money":
                player.money += card.amount;
                break;
            case "move":
                if (card.position < player.position) {
                    player.money += 200; // Passed GO
                    this.logMessage(`${player.name} passed GO and collected $200!`);
                }
                player.position = card.position;
                this.updatePlayerPosition(player);
                this.handleLandedPosition(player, this.boardPositions[player.position]);
                break;
            case "go_to_jail":
                this.sendToJail(player);
                break;
            case "jail_free":
                player.getOutOfJailCards++;
                break;
            case "move_relative":
                this.movePlayer(player, card.spaces);
                break;
        }
    }

    handleCornerLanding(player, corner) {
        switch (corner.action) {
            case "collect":
                player.money += corner.amount;
                this.logMessage(`${player.name} collected $${corner.amount} from GO!`);
                break;
            case "jail":
                this.sendToJail(player);
                break;
        }
    }

    sendToJail(player) {
        player.position = 10; // Jail position
        player.inJail = true;
        player.jailTurns = 0;
        this.logMessage(`${player.name} was sent to jail!`);
        this.updatePlayerPosition(player);
    }

    countRailroadsOwnedBy(playerId) {
        return this.boardPositions.filter(pos => 
            pos.type === "railroad" && pos.owner === playerId
        ).length;
    }

    countUtilitiesOwnedBy(playerId) {
        return this.boardPositions.filter(pos => 
            pos.type === "utility" && pos.owner === playerId
        ).length;
    }

    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    updateDisplay() {
        // Update current player display
        const currentPlayer = this.players[this.currentPlayerIndex];
        document.getElementById('current-player').textContent = 
            currentPlayer ? currentPlayer.name : '-';

        // Update players info
        const playersInfo = document.getElementById('players-info');
        playersInfo.innerHTML = '';

        this.players.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.className = `player-info player-${player.id}`;
            playerDiv.innerHTML = `
                <strong>${player.name}</strong><br>
                Money: $${player.money}<br>
                Position: ${this.boardPositions[player.position].name}<br>
                Properties: ${player.properties.length}<br>
                Personality: ${player.personality || 'N/A'}<br>
                ${player.inJail ? `<span style="color: red;">In Jail (${player.jailTurns}/3)</span>` : ''}
            `;
            if (index === this.currentPlayerIndex) {
                playerDiv.style.border = '2px solid #3498db';
            }
            playersInfo.appendChild(playerDiv);
        });

        // Update player positions on board
        this.updateAllPlayerPositions();
    }

    updatePlayerPosition(player) {
        // This would update the visual position on the SVG board
        // For now, we'll just update the display
        this.updateDisplay();
    }

    updateAllPlayerPositions() {
        const playerPiecesGroup = document.getElementById('player-pieces');
        playerPiecesGroup.innerHTML = '';

        this.players.forEach(player => {
            const position = this.getPositionCoordinates(player.position);
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', position.x + (player.id - 1) * 8);
            circle.setAttribute('cy', position.y + (player.id - 1) * 8);
            circle.setAttribute('r', '6');
            circle.setAttribute('fill', this.getPlayerColor(player.id));
            circle.setAttribute('stroke', '#000');
            circle.setAttribute('stroke-width', '1');
            circle.classList.add('player-piece');
            playerPiecesGroup.appendChild(circle);
        });
    }

    getPositionCoordinates(position) {
        // Return x, y coordinates for each board position
        const positions = [
            // Bottom row (0-10)
            {x: 550, y: 550}, {x: 475, y: 550}, {x: 425, y: 550}, {x: 375, y: 550}, {x: 325, y: 550},
            {x: 275, y: 550}, {x: 225, y: 550}, {x: 175, y: 550}, {x: 125, y: 550}, {x: 125, y: 550}, {x: 50, y: 550},
            // Left column (11-20)
            {x: 50, y: 475}, {x: 50, y: 425}, {x: 50, y: 375}, {x: 50, y: 325}, {x: 50, y: 275},
            {x: 50, y: 225}, {x: 50, y: 175}, {x: 50, y: 125}, {x: 50, y: 125}, {x: 50, y: 50},
            // Top row (21-30)
            {x: 125, y: 50}, {x: 175, y: 50}, {x: 225, y: 50}, {x: 275, y: 50}, {x: 325, y: 50},
            {x: 375, y: 50}, {x: 425, y: 50}, {x: 475, y: 50}, {x: 525, y: 50}, {x: 550, y: 50},
            // Right column (31-39)
            {x: 550, y: 125}, {x: 550, y: 175}, {x: 550, y: 225}, {x: 550, y: 275}, {x: 550, y: 325},
            {x: 550, y: 375}, {x: 550, y: 425}, {x: 550, y: 475}, {x: 550, y: 525}, {x: 550, y: 550}
        ];
        return positions[position] || {x: 550, y: 550};
    }

    getPlayerColor(playerId) {
        const colors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44'];
        return colors[playerId - 1] || '#888888';
    }

    logMessage(message) {
        const gameLog = document.getElementById('game-log');
        const timestamp = new Date().toLocaleTimeString();
        gameLog.innerHTML += `<div>[${timestamp}] ${message}</div>`;
        gameLog.scrollTop = gameLog.scrollHeight;
    }
}

// Global game instance
let game = new MonopolyGame();

// Global functions for HTML
function startGame() {
    const playerCount = parseInt(document.getElementById('player-count').value);
    game.startGame(playerCount);
}

function rollDice() {
    game.rollDice();
}

function updatePlayerPersonalities() {
    const playerCount = parseInt(document.getElementById('player-count').value);
    const personalitiesDiv = document.getElementById('player-personalities');
    
    let html = '<h4>Player Personalities:</h4>';
    for (let i = 1; i <= playerCount; i++) {
        html += `
            <div style="margin: 5px 0;">
                <label for="player-${i}-personality">Player ${i}:</label>
                <select id="player-${i}-personality">
                    <option value="buy">Buy (purchases all affordable properties)</option>
                    <option value="conserve">Conserve (never buys properties)</option>
                </select>
            </div>
        `;
    }
    personalitiesDiv.innerHTML = html;
}

// Initialize display
document.addEventListener('DOMContentLoaded', function() {
    game.updateDisplay();
    updatePlayerPersonalities(); // Initialize with default 2 players
});
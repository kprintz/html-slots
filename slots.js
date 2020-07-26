class SlotMachine {
    constructor(settings) {
        // getting DOM elements
        this.classButton = document.getElementById('slot-button-1');
        this.classButton.addEventListener('click', this.handleUserClick.bind(this));
        this.reelHolders = document.getElementsByClassName('reel-holder');
        this.spin = 0;
        this.target = document.getElementById('spin-message');
        this.winMessage = settings.winMessage;
        this.loseMessage = settings.loseMessage;
        this.reelPossibilities = settings.reelPossibilities;
        this.reelHeight = settings.reelHeight;
        this.spinsLoopTilStop = settings.spinsLoopTilStop;
        this.reelRow = settings.reelRow;
        this.reelCol = settings.reelCol;
        this.reelTemplate = document.getElementById('reel-1');

        this.createSlotsHtml();
    }

    createSlotsHtml() {
        let reelId = 1;
        let masterElement = document.createElement('div');
        let inputDiv = document.querySelector('.reels');
        masterElement.className = 'master-element';
        for (let i = 0; i < this.reelRow; i++) {
            let reelRowElement = document.createElement('div');
            reelRowElement.className = 'master-element-reelRow';
            for (let e = 0; e < this.reelCol; e++) {
                // Inject single reel into current row
                let newReel = this.reelTemplate.cloneNode(true);
                newReel.id = 'reel-' + reelId;
                reelId++;
                reelRowElement.appendChild(newReel);
            }
            //todo break to next row
            masterElement.appendChild(reelRowElement);
        }
        inputDiv.insertAdjacentElement('beforeend', masterElement);
        this.reelTemplate.remove();
    }

    handleUserClick() {
        // reset the spin count and start spinning reel
        document.getElementsByTagName('body')[0].style.background = 'black';
        this.spin = 0;
        this.target.textContent = "";
        this.spinSequence();
    }

    spinSequence() {
        // spins the reel
        for (let reel of this.reelHolders) {
            reel.style.transition = 'all 400ms linear 0s';
            reel.style.transform = 'translateY(-' + this.reelPossibilities * this.reelHeight + 'px)';
        }
        // determine winner and stop spin
        if (this.spin > this.spinsLoopTilStop) {
            this.stopReels();
            if (this.checkWin()) {
                document.getElementsByTagName('body')[0].style.background = 'green';
                return this.target.textContent = this.winMessage + ' Wins: ';
            }
            return this.target.textContent = this.loseMessage;
        }
        // reset reel and increase spin count
        setTimeout(this.resetSequence.bind(this), 390);
        this.spin++;
    }

    stopReels() {
        for (let reel of this.reelHolders) {
            let randReelPixelHeight = this.getRandNumber() * this.reelHeight;
            reel.style.transform = 'translateY(-' + randReelPixelHeight + 'px)';
        }
    }

    resetSequence() {
        // secretly instantly reset reel to 0
        for (let reel of this.reelHolders) {
            reel.style.transition = 'none';
            reel.style.transform = 'translateY(0px)';
        }
        // return to beginning of animation
        setTimeout(this.spinSequence.bind(this), 10);
    }

    checkWin() {
        if(this.assignReelArray() > 0) {
            return true;
        }






        //for (let reel of this.reelHolders) {
        //    if (currentReelValue !== reel.style.transform) {
        //        return false;
        //    }
        //}
        //return true;
    }

    assignReelArray() {
        let reelArray = [];
        //for (let reel of this.reelHolders) {
        for (let i = 0; i < this.reelHolders.length; i++) {
            reelArray[i] = this.reelHolders[i].style.transform;
        }
        return this.checkHorizontalWins(reelArray);
    }



    getCornerNode() {


    }

    getDiagonalFromNode(node) {

    }

    checkHorizontalWins(reelArray) {
        let currentReelValue;
        let compareReelValue;
        let lineCount;
        let winCount  = 0;
        for (let i = 0; i < this.reelRow; i++) {
            lineCount = 0;
            for (let j = 0 + i * 3; j < (i + 1) * this.reelCol - 1; j++) {
            //for (let reel of this.reelHolders) {
                currentReelValue = reelArray[j];
                compareReelValue = reelArray[j + 1];
                if (currentReelValue === compareReelValue) {
                    lineCount++;
                }
                console.log('linecount: ' + lineCount);
            }
            if (lineCount === 2) {
                winCount++;
            }
            console.log('wincount: ' + winCount);

        }
        if (winCount < 1) {
            return 0;
        }
        return winCount;
    }

    getVerticalFromNode(node) {

    }

    getRandNumber() {
        return Math.floor(Math.random() * this.reelPossibilities + 1);
    }
}

let slotMachine = new SlotMachine({
    reelRow: 3,
    reelCol: 3,
    winMessage: 'Winner!',
    loseMessage: 'No goood',
    reelPossibilities: 4,
    reelHeight: 60,
    spinsLoopTilStop: 3,
    spinMilliseconds: 400
});

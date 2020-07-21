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
    };

    createSlotsHtml() {
        let reelId = 1;
        for (let i = 0; i < this.reelRow; i++) {



            
            for (let e = 0; e < this.reelCol; e++) {
                let newReel = this.reelTemplate.cloneNode(true);
                newReel.id = 'reel-' + reelId;
                reelId++;
                this.reelTemplate.after(newReel);
            }




        }
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
            reel.style.transform = 'translateY(-'+ this.reelPossibilities * this.reelHeight +'px)';
        }
        // determine winner and stop spin
        if (this.spin > this.spinsLoopTilStop) {
            this.stopReels();
            if (this.checkWin()) {
                document.getElementsByTagName('body')[0].style.background = 'green';
                return this.target.textContent = this.winMessage;
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
        let currentReelValue = this.reelHolders[0].style.transform;
        for (let reel of this.reelHolders) {
            if (currentReelValue !== reel.style.transform) {
                return false;
            }
        }
        return true;
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

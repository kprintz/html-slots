class SlotMachine {
    constructor() {
        // getting DOM elements
        this.classButton = document.getElementById('slot-button-1');
        this.classButton.addEventListener('click', this.handleUserClick.bind(this));
        this.reels = document.getElementsByClassName('reel');
        this.reelHolders = document.getElementsByClassName('reel-holder');
        this.spin = 0;
        this.target = document.getElementById('spin-message');
    };

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
            reel.style.transition = 'all 1s linear 0s';
            reel.style.transform = 'translateY(-240px)';
        }
        // determine winner and stop spin
        if (this.spin > 6) {
            this.stopReels();
            if (this.checkWin()) {
                document.getElementsByTagName('body')[0].style.background = 'green';
                return this.target.textContent = "Winner!";
            }
            return this.target.textContent = 'you suck';
        }
        // reset reel and increase spin count
        setTimeout(this.resetSequence.bind(this), 990);
        this.spin++;
    }

    stopReels() {
        for (let reel of this.reelHolders) {
            let randReelPixelHeight = this.getRandNumber() * 60;
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
        return Math.floor(Math.random() * (5 - 1) + 1);
    }
}

let slotMachine = new SlotMachine();

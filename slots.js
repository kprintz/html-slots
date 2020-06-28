class SlotMachine {
    constructor() {
        this.classButton = document.getElementById('slot-button-1');
        this.classButton.addEventListener('click', this.handleUserClick.bind(this));
        this.reels = document.getElementsByClassName('reel');
        this.spin = 0;
    };

    handleUserClick () {
        document.getElementsByTagName('body')[0].style.background = 'black';
        this.spin = 0;
        this.spinSequence();
    }

    spinSequence() {
        if (this.spin > 19) {
            let target = document.getElementById('spin-message');

            if (this.checkWin()) {
                document.getElementsByTagName('body')[0].style.background = 'green';
                return target.textContent = "Winner!";
            }
            return target.textContent = 'you suck';
        }
        for (let reel of this.reels) {
            reel.textContent = this.getRandNumber();
        }
        setTimeout(this.spinSequence.bind(this), 100);
        this.spin++;
    }

    checkWin() {
        let currentReelValue = this.reels[0].textContent;
        for (let reel of this.reels) {
            if (currentReelValue !== reel.textContent) {
                return false;
            }
        }
        return true;
    }

    getRandNumber() {
        return Math.floor(Math.random() * (3 - 1) + 1);
    }
}

let slotMachine = new SlotMachine();

let highestZ = 1;

class Paper {
    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    velocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        const startDrag = (x, y) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;

            this.prevMouseX = x;
            this.prevMouseY = y;

            console.log(this.prevMouseX);
            console.log(this.prevMouseY);
        };

        const duringDrag = (x, y) => {
            if (this.holdingPaper) {
                this.mouseX = x;
                this.mouseY = y;

                this.velocityX = this.mouseX - this.prevMouseX;
                this.velocityY = this.mouseY - this.prevMouseY;

                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
            }
        };

        const endDrag = () => {
            console.log('mouse or touch button is released');
            this.holdingPaper = false;
        };

        paper.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Ensure it's the left mouse button
                startDrag(e.clientX, e.clientY);
            }
        });

        paper.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
        });

        document.addEventListener('mousemove', (e) => {
            duringDrag(e.clientX, e.clientY);
        });

        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            duringDrag(touch.clientX, touch.clientY);
        });

        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});

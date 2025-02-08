class Ball {
    constructor(x, y, size, color = '#ffffff', grawing = false) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.color = color;
        this.grawing = grawing;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

    }

    adjustSize() {
        let growing = this.growing;
        const maxSize = 10;
        const minSize = 0.1;

        // Make the this grow and low
        if (growing) {
            if (this.size + 0.1 <= maxSize) {
                this.size += 0.1;
            } else {
                this.growing = false; // Switch to low
            }
        } else {
            if (this.size - 0.1 >= minSize) {
                this.size -= 0.1;
            } else {
                this.growing = true; // Switch to growing
            }
        }
    }

}
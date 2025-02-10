class ImageLoader extends Image {
    constructor(src, width, height) {
        super()
        this.src = src;

        this.canvas = document.createElement('canvas')
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.imageData = null;
        this.canvas.style.display = 'none';

        document.body.appendChild(this.canvas);

        this.onload = this._load;

    }

    _load(e) {
        this.ctx.drawImage(this, 0, 0, this.canvas.width, this.canvas.height);

        if (this.load) {
            this.load(e)
        }
    }


    get(x, y) {
        let RGBA = this.ctx.getImageData(x, y, 1, 1).data;
        let [r, g, b, a] = RGBA;
        return { r, g, b, a };
    }
}

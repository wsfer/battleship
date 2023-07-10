class AudioController {
    #music;

    #explosion;

    #splash;

    constructor(musicSrc, explosionSrc, splashSrc) {
        this.#music = new Audio(musicSrc);
        this.#explosion = new Audio(explosionSrc);
        this.#splash = new Audio(splashSrc);
        this.#music.autoplay = true;
        this.#music.loop = true;
    }

    // Toggle sound and return a boolean telling if it's muted or not
    toggle() {
        this.#music.muted = !this.#music.muted;
        return this.#music.muted;
    }

    async playMusic() {
        return this.#music.play();
    }

    async playExplosion() {
        if (!this.#music.muted) {
            this.#explosion.play();
        }
    }

    async playSplash() {
        if (!this.#music.muted) {
            this.#splash.play();
        }
    }
}

export default AudioController;

class AudioController {
    #music;

    #explosion;

    #splash;

    constructor() {
        this.#music = new Audio();
        this.#explosion = new Audio();
        this.#splash = new Audio();
        this.#music.autoplay = true;
        this.#music.loop = true;
    }

    toggle() {
        this.#music.muted = !this.#music.muted;
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

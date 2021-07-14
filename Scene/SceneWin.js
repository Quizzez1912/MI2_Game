class SceneWin extends Phaser.Scene {
    constructor() {
        super("Win");
    }

    preload() {
        this.load.image("win", "assets/endWin.png");
        this.load.audio("music", "sounds/mainMenu.mp3");

        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
    }

    create() {
        this.background = this.add.image(0, 0, "win");
        this.background.setOrigin(0, 0);
        this.music = this.sound.add("music");
        this.music.play(this.musicConfig);
    }
}
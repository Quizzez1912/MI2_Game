class Scene1 extends Phaser.Scene {
    constructor() {
        super("PreGame");
    }

    preload() {
        // Preload für StartScene 
        this.load.image("background","assets/bg.png");
        this.load.image("sushimaster","assets/spritesheets/pregame/sushimasterLogo.png")
        
        this.load.spritesheet("playButton", "assets/spritesheets/pregame/play.png",{
            frameWidth: 1040,
            frameHeight: 512
          });
        

        // Preload für das Game
        
        this.load.image("game_bg","assets/game_bg.png");
        this.load.image("player","assets/oni.png");
        
        
    }
    
    create() {
        // Preload StartScene
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);     
        this.background.setDepth(-10);


         this.anims.create({
            key: "playButton_anim",
            frames: this.anims.generateFrameNumbers("playButton"),
            frameRate: 7,
            repeat: -1
          });

        this.playButton = this.add.sprite(config.width /2 ,config.height / 2, "playButton").setScale(0.5);
        this.playButton.play("playButton_anim");
        
        
        
        this.sushimaster = this.add.image(config.width / 2 , config.height /2 - 200,"sushimaster");

        this.playButton.setInteractive({cursor : "pointer"});     // Cursor Symbol ändern
        this.playButton.on("pointerdown", ()=> {
            this.scene.start("playGame");

        });
        
        
        this.add.text(20,20, "Pre Game");
        //this.scene.start("playGame");

       
    }



}
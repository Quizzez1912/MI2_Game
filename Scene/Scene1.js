class Scene1 extends Phaser.Scene {
    constructor() {
        super("PreGame");
    }

    preload() {
        // Preload für StartScene 
        this.load.image("background","assets/bg.png");
        this.load.image("btnStart","assets/btn_Start.png");
        this.load.image("welcome-oni","assets/oni.png");
        
        
        // Preload für das Game
        
        this.load.image("game_bg","assets/game_bg.png");
        this.load.image("player","assets/oni.png");



    
    }
    
    create() {
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);     
        this.background.setDepth(-10);

        this.btnStart = this.add.image(config.width / 2 , config.height /2 ,"btnStart");
        this.welcomeoni = this.add.image(config.width / 2 , config.height /2 - 100,"welcome-oni");

        this.btnStart.setInteractive({cursor : "pointer"});     // Cursor Symbol ändern
        this.btnStart.on("pointerdown", ()=> {
            this.scene.start("playGame");

        });
        
        this.add.text(20,20, "Pre Game");
        //this.scene.start("playGame");

       
    }



}
class Scene1 extends Phaser.Scene {
    constructor() {
        super("PreGame");
        
    }
    
    
    preload() {
               
        //! Preload für StartScene 
        
        this.load.image("background","assets/bg.png");
        
        // controls
        this.load.image("controls","assets/spritesheets/pregame/controls.png");

        
        this.load.image("sushimaster","assets/spritesheets/pregame/sushimasterLogo.png")
        
        this.load.spritesheet("playButton", "assets/spritesheets/pregame/playButton.png",{
            frameWidth: 138,
            frameHeight: 74
          });

        this.load.spritesheet("music", "assets/spritesheets/pregame/music.png",{
            frameWidth: 128,
            frameHeight: 64
          });
        

        //! Preload für das Game
        
        this.load.image("game_bg","assets/game_bg.png");
        this.load.image("player","assets/spritesheets/game/oni.png");

        this.load.spritesheet("heart", "assets/spritesheets/UI/heart.png", {
            frameWidth: 64,
            frameHeigth: 64
        });

        this.load.audio("music","sounds/sci-fi_platformer12.mp3");

        this.load.image("girl","assets/spritesheets/game/girl.png");
        this.load.image("boys","assets/spritesheets/game/boy.png");

        this.load.image("riceball","assets/spritesheets/game/riceball.png");



        
    }
    
    create() {
        var allowMusic = true; 
        // Preload StartScene
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);     
        this.background.setDepth(-10);
        
        // controls
        
        this.controls = this.add.image(200,config.height - 100 ,"controls").setScale(0.5);
        
       
        //! Music Button
         this.music = this.sound.add("music");

         var musicConfig = {
             mute : false,
             volume: 0.1,
             rate: 1 ,
             detune: 0,
             seek: 0,
             loop: false,
             delay: 0
         }

       //!  this.music.play(musicConfig);

        //! MUSIC
        this.MusicButton = this.add.sprite(config.width - 100 ,config.height /2 - 300 , "music");
        this.anims.create({
            key: "musicOn_anim",
            frames: this.anims.generateFrameNumbers("music",{
                start: 1,
                end: 0
            }),
            frameRate: 20,
            repeat: 0
          });

          this.anims.create({
            key: "musicOff_anim",
            frames: this.anims.generateFrameNumbers("music",{
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: 0
          });
       
        
       
        this.MusicButton.setInteractive({cursor : "pointer"});     // Cursor Symbol ändern
        this.MusicButton.on("pointerdown", ()=> {
            if(allowMusic){
                this.music.stop();
                allowMusic = false;
                this.MusicButton.play("musicOff_anim")
            } else {
                this.music.play(musicConfig);
                allowMusic = true;
                this.MusicButton.play("musicOn_anim")
            }  
            
            

        });

        this.sushimaster = this.add.image(config.width / 2 , config.height /2 - 200,"sushimaster");
        
        this.anims.create({
            key: "playButton_anim",
            frames: this.anims.generateFrameNumbers("playButton"),
            frameRate: 20,
            repeat: -1
          });

       
       
        this.playButton = this.add.sprite(config.width /2 ,config.height / 2, "playButton").setScale(2.5);
        this.playButton.play("playButton_anim");
        
        
        
        

        this.playButton.setInteractive({cursor : "pointer"});     // Cursor Symbol ändern
        this.playButton.on("pointerdown", ()=> {
            this.scene.start("playGame");
            allowMusic = false;

        });

        
        
        
       
       //this.music.play(musicConfig);


        this.add.text(20,20, "Pre Game");
        //this.scene.start("playGame");
        
        //! TEST KOMMT DANN IN SCENE2

        this.anims.create({
            key: "heart_anim",
            frames: this.anims.generateFrameNumbers("heart", {
                start: 0,
                end: 3,
            }),
            frameRate: 1,
            repeat: -1
          });

          this.anims.create({
            key: "hearthalf_anim",
            frames: this.anims.generateFrameNumbers("heart", {
                start: 3,
                end: 6,
            }),
            frameRate: 1,
            repeat: -1
          });

          this.anims.create({
            key: "heartfull_anim",
            frames: this.anims.generateFrameNumbers("heart", {
                start: 0,
                end: 6,
            }),
            frameRate: 4,
            repeat: -1
          });

       

        this.heart = this.add.sprite(config.width /2 ,config.height / 2 + 150 , "heart");
        this.heart.play("heart_anim");

        
        this.heart = this.add.sprite(config.width /2 ,config.height / 2 + 300 , "heart");
        this.heart.play("hearthalf_anim");

        this.heart = this.add.sprite(config.width /2 ,config.height / 2 + 250 , "heart");
        this.heart.play("heartfull_anim");

        //! TEST ENDE
          
        //! START SCENE2

        this.scene.start("playGame");
    }

    update(){
          
    }

    
}
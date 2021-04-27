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
        
        this.load.spritesheet("playButton", "assets/spritesheets/pregame/play.png",{
            frameWidth: 500,
            frameHeight: 300
          });

        this.load.spritesheet("music", "assets/spritesheets/pregame/music.png",{
            frameWidth: 128,
            frameHeight: 64
          });
        

        //! Preload für das Game
          
        // Paralax Tests

       
        this.load.image("sky", "assets/sky.png");
        this.load.image("tree", "assets/tree.png");
        this.load.image("ground", "assets/ground.png");
       
        this.load.image("wasabi","assets/spritesheets/game/wasabi.png");
       
       
       
        this.load.image("player","assets/spritesheets/game/oni.png");

        this.load.atlas("hp", "assets/spritesheets/UI/hp.png","assets/spritesheets/UI/hp.json");



        this.load.audio("music","sounds/sci-fi_platformer12.mp3");

        this.load.image("girl","assets/spritesheets/game/girl.png");
        this.load.image("boys","assets/spritesheets/game/boy.png");

        this.load.image("riceball","assets/spritesheets/game/riceball.png");



        
    }
    
    create() {
        //!UI HEART ANIMS
        this.anims.create({
          key: 'hp5_anim',
          frames: [
              { key: 'hp',frame:0 },
              { key: 'hp',frame:1 },
          ],
          frameRate: 8,
          repeat: 0
        });
      
        this.anims.create({
          key: 'hp4_anim',
          frames: [
              { key: 'hp',frame:1 },
              { key: 'hp',frame:2 },
          ],
          frameRate: 8,
          repeat: 0
        });

        this.anims.create({
          key: 'hp3_anim',
          frames: [
              { key: 'hp',frame:2 },
              { key: 'hp',frame:3 },
          ],
          frameRate: 8,
          repeat: 0
      });

        this.anims.create({
          key: 'hp2_anim',
          frames: [
              { key: 'hp',frame:3 },
              { key: 'hp',frame:4 },
          ],
          frameRate: 8,
          repeat: 0
      });

      this.anims.create({
        key: 'hp1_anim',
        frames: [
            { key: 'hp',frame:4 },
            { key: 'hp',frame:5 },
        ],
        frameRate: 8,
        repeat: 0
      });

      this.anims.create({
        key: 'hp0_anim',
        frames: [
            { key: 'hp',frame:5 },
            { key: 'hp',frame:6 },
        ],
        frameRate: 8,
        repeat: 0
      });
      this.anims.create({
        key: 'hp0_anim',
        frames: [
            { key: 'hp',frame:6 },
            { key: 'hp',frame:6 },
        ],
        frameRate: 8,
        repeat: 0
      });

















      
      
      var allowMusic = true; 
        // Preload StartScene
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);     
        this.background.setDepth(-10);
        
        // controls
        
        this.controls = this.add.image(200,config.height - 100 ,"controls").setScale(0.5);
        
       
        //! Music Button
        //TODO this.music = this.sound.add("music");

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

        //! 
        this.sushimaster = this.add.image(config.width / 2 , config.height /2 - 200,"sushimaster");
        
        this.anims.create({
            key: "playButton_anim",
            frames: this.anims.generateFrameNumbers("playButton"),
            frameRate: 5,
            repeat: -1
          });

       
       
        this.playButton = this.add.sprite(config.width /2 ,config.height / 2, "playButton");
        this.playButton.play("playButton_anim");
        
        
        
        

        this.playButton.setInteractive({cursor : "pointer"});     // Cursor Symbol ändern
        this.playButton.on("pointerdown", ()=> {
            this.scene.start("playGame");
            allowMusic = false;

        });

        
       
      //! this.music.play(musicConfig);


        this.add.text(20,20, "Pre Game");
        //this.scene.start("playGame");
        
        //! ANIMS für Scene2
        /*
        // Herzen von ganz zu halb
        this.anims.create({
            key: "heart_anim",
            frames: this.anims.generateFrameNumbers("heart", {
                start: 0,
                end: 3,
            }),
            frameRate: 1,
            repeat: -1
          });

          // Herzen von halb auf 0
          this.anims.create({
            key: "hearthalf_anim",
            frames: this.anims.generateFrameNumbers("heart", {
                start: 3,
                end: 6,
            }),
            frameRate: 1,
            repeat: -1
          });

         // Herzen von ganz auf 0

         this.anims.create({
          key: "heartfull_anim",
          frames: this.anims.generateFrameNumbers("heart", {
              start: 0,
              end: 6,
          }),
          frameRate: 4,
          repeat: 0
        });
*/

        


        //! TEST ENDE
          
        //! START SCENE2

        this.scene.start("playGame");
    }

    update(){
        

    
}
}
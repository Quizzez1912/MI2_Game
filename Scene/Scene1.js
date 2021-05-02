class Scene1 extends Phaser.Scene {
    constructor() {
        super("PreGame");
        
    }
    
    
    preload() {
               
        //#region //! Preload für StartScene (Background Controls Gametitle MusicIcon PlayButton)
        // Background
        this.load.image("background","assets/spritesheets/pregame/background.png");
        // Controls
        this.load.image("controls","assets/spritesheets/pregame/controls.png");
        // Title
        this.load.image("sushimaster","assets/spritesheets/pregame/sushimasterLogo.png")
        // PlayButton Spritesheet
        this.load.spritesheet("playButton", "assets/spritesheets/pregame/playButton.png",{
            frameWidth: 285,
            frameHeight: 134
          });
        // Music Icon Spritesheet
        this.load.spritesheet("music", "assets/spritesheets/pregame/music.png",{
            frameWidth: 128,
            frameHeight: 64
          });
        
        
          
          
          //Shield


          //#endregion

        //#region  //! Preload für das Game (Assets / Atlas)
         
        //* Hintergrund für das Spiel ( Parallax)
        this.load.image("sky", "assets/sky2.png");
        this.load.image("mountain","assets/mountain.png")
        this.load.image("tree", "assets/tree2.png");
        this.load.image("ground", "assets/street.png");
       

        //* Object Spritesheets & Atlas
        // Player
        this.load.image("player","assets/spritesheets/game/oni1.png");

        // PowerUP JUmpBoost
        this.load.atlas("atlas_jumpBoost", "assets/spritesheets/game/powerups/jumpBoost.png","assets/spritesheets/game/powerups/jumpBoost.json");
        this.load.image("jumpBoostIcon" ,"assets/spritesheets/game/powerups/jumpBoostIcon.png");

        // Shield
        this.load.atlas("shield", "assets/spritesheets/game/powerups/shield.png","assets/spritesheets/game/powerups/shield.json");

        // Rice-ball
        this.load.image("ricebowl","assets/spritesheets/game/ricebowl1.png");
        this.load.image("riceball","assets/spritesheets/game/riceball_oni.png");

        // Girl
        this.load.image("girl","assets/spritesheets/game/girl.png");

        // Boy
        this.load.image("boy","assets/spritesheets/game/boy.png");

        // Wasabi
        this.load.image("wasabi","assets/spritesheets/game/wasabi.png");

        // Soyfish
        this.load.image("soyfish","assets/spritesheets/game/soyfish.png");

        // Chopstick
        this.load.image("chopstick","assets/spritesheets/game/chopstick.png");

        //* UI Elemente
        // Lebensanzeige
        this.load.atlas("hp", "assets/spritesheets/UI/hp.png","assets/spritesheets/UI/hp.json");
        
        //#endregion

        //* Music und Soundeffekte
        // Hintergrundmusik
        //? ÄNDERN this.load.audio("music","sounds/sci-fi_platformer12.mp3");
       
    }
    
    create() {

     //#region  //! MusicButton
      this.MusicButton = this.add.sprite(config.width - 100 ,config.height /2 - 300 , "music");
     //? ÄNDERN  this.music = this.sound.add("music");
      var allowMusic = true; 

       var musicConfig = {
        mute : false,
        volume: 0.1,
        rate: 1 ,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }

      //?SPÄTER AKTIVIEREN this.music.play(musicConfig);
        
      //#endregion
     
     //#region  //!Animationen 
      
      //* Pickups 
      this.anims.create({
        key: "hoverJumpBoost_anim",
        frames: this.anims.generateFrameNumbers("atlas_jumpBoost" ,{
          start: 0,
          end: 10,
        }),
        frameRate: 15,
        repeat: -1
      });

      this.anims.create({
        key: "shield_anim",
        frames: this.anims.generateFrameNumbers("shield" ,{
          start: 0,
          end: 1,
        }),
        frameRate: 3,
        repeat: -1
      });

        //* MusicButon
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



        //* Health UI 
        this.anims.create({
          key: "hp5_anim",
          frames: [ { key: "hp",frame:1 },  ],
          frameRate: 8,
          repeat: 0
        });
      
        this.anims.create({
          key: "hp4_anim",
          frames: [ { key: "hp",frame:2 },],
          frameRate: 8,
          repeat: 0
        });

        this.anims.create({
          key: "hp3_anim",
          frames: [ { key: "hp",frame:3 },],
          frameRate: 8,
          repeat: 0
        });

        this.anims.create({
          key: "hp2_anim",
          frames: [ { key: "hp",frame:4 },],
          frameRate: 8,
          repeat: 0
        });

        this.anims.create({
          key: "hp1_anim",
          frames: [ { key: "hp",frame:5 },],
          frameRate: 8,
          repeat: 0
          });

        this.anims.create({
          key: "hp0_anim",
          frames: [ { key: "hp",frame:6 },],
          frameRate: 8,
          repeat: 0
          });

        //* PlayButton
        this.anims.create({
          key: "playButton_anim",
          frames: this.anims.generateFrameNumbers("playButton"),
          frameRate: 5,
          repeat: -1
          });

        //#endregion
    
     //#region  //! Create Start Menu (Images & Sprites)  
        
        //* Background
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);     
        this.background.setDepth(-10);
        
        //* Controls Instruction
        this.controls = this.add.image(200,config.height - 100 ,"controls").setScale(0.5);
        
        //* Game Title
        this.sushimaster = this.add.image(config.width / 2 , config.height /2 - 200,"sushimaster");

        //* Play Button
        this.playButton = this.add.sprite(config.width /2 ,config.height / 2, "playButton");
        this.playButton.play("playButton_anim");

        //* PowerUps
        this.jumpIcon = this.add.image(10,100 ,"jumpBoostIcon").setScale(2);
        this.jumpIcon.setOrigin(0,0);
        this.jumpIcon.setDepth(10);
       
        this.ShieldIcon = this.add.image(10,200 ,"shield");
        this.ShieldIcon.setOrigin(0,0);
        this.ShieldIcon.setDepth(10);
       
       
       
        //#endregion
    
    //#region //! Start Menu Interaction
        
        //* Music Button
        this.MusicButton.setInteractive({cursor : "pointer"});     // Cursor Symbol ändern
        this.MusicButton.on("pointerdown", ()=> {
            if(allowMusic){
                //?this.music.stop();
                allowMusic = false;
                this.MusicButton.play("musicOff_anim")
            } else {
              //?  this.music.play(musicConfig);
                allowMusic = true;
               this.MusicButton.play("musicOn_anim")
            }  
        });

        //* Play Button
        this.playButton.setInteractive({cursor : "pointer"});     // Cursor Symbol ändern
        this.playButton.on("pointerdown", ()=> {
              this.scene.start("playGame");
              //allowMusic = false;

        });
        
        //#endregion

    
    
      //! START SCENE2 SOFORT FÜR TESTZWECK

        //this.scene.start("playGame");
    }

    update(){
        

    
}
}
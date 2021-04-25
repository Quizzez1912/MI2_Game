class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background","assets/images/background.png");
        
        this.load.spritesheet("ship","assets/spritesheets/ship.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        
        this.load.spritesheet("ship2","assets/spritesheets/ship2.png",{
            frameWidth: 32,
            frameHeight: 16
        });
        
        this.load.spritesheet("ship3","assets/spritesheets/ship3.png",{
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet("power-up","assets/spritesheets/power-up.png",{
            frameWidth: 16,
            frameHeight: 16,
        });


        
        this.load.spritesheet("explosion","assets/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("player","assets/spritesheets/player.png",{
            frameHeight: 24,
            frameWidth: 16
        })

        this.load.spritesheet("beam","assets/spritesheets/beam.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.audio("audio_beam","sounds/beam.mp3");
        this.load.audio("audio_explosion","sounds/explosion.mp3");
        this.load.audio("audio_pickup","sounds/pickup.mp3");
        this.load.audio("music","sounds/sci-fi_platformer12.mp3");

    }
    
    create() {
        this.add.text(20,20, "Loading game...");
        this.scene.start("playGame");

        // Animation ship
        this.anims.create({
            key: "ship1_anim",                                  // Animation Name ship_anim
            frames: this.anims.generateFrameNumbers("ship"),    // Using the frames from the "ship" spritesheet
            frameRate:20,                                       // 20 frames per Second
            repeat: -1                                         //  -1 = infinite repeat
                                                 
        });

        // Animation ship2
        this.anims.create({
            key: "ship2_anim",                                  // Animation Name ship2_anim
            frames: this.anims.generateFrameNumbers("ship2"),    // Using the frames from the "ship2" spritesheet
            frameRate:20,                                       // 20 frames per Second
            repeat: -1                                              //  -1 = infinite repeat
        });

        // Animation ship3
        this.anims.create({
        key: "ship3_anim",                                        // Animation Name ship3_anim
        frames: this.anims.generateFrameNumbers("ship3"),         // Using the frames from the "ship3" spritesheet
        frameRate:20,                                                   // 20 frames per Second
        repeat: -1                                              //  -1 = infinite repeat
        });

        // Animation explosion
        this.anims.create({
            key: "explode",                                                 // Animation Name explode
            frames: this.anims.generateFrameNumbers("explosion"),        // Using the frames from the "explosion" spritesheet
            frameRate:20,                                                // 20 frames per Second
            repeat: 0,
            hideOnComplete: true                                            
        });

        this.anims.create({
            key:"red",                                  // Animation Name red
            frames:this.anims.generateFrameNumbers("power-up",{
                start: 0,
                end:1
            }),
            frameRate: 20,
            repeat : -1

        });

        this.anims.create({
            key:"gray",                                  // Animation Name red
            frames:this.anims.generateFrameNumbers("power-up",{
                start: 2,
                end:3
            }),
            frameRate: 20,
            repeat : -1

        });

        this.anims.create({
            key:"thrust",
            frames:this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat : -1
            
        })

        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate:20,
            repeat: -1    
        
        });


    }
}
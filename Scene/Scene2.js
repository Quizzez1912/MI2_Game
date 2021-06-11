class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");

    }

    preload() {

    }

    create() {

        //#region //! UI Create

        //* Healthbar
        this.hpValue = 6;
        this.hp = this.add.sprite(config.width - 200, 10, "hp");
        this.hp.setOrigin(0, 0);
        this.hp.setDepth(10);
        this.hp.setScrollFactor(0);

        //TODO Wenn avaibleRiceball = 0 das Reisbowl Symbol durchstreichen und keinen Text setzen nur Symbol
        //* Ricebar 
        this.avaibleRice = 0;
        this.ricebowlIcon = this.add.image(config.width - 70, 95, "ricebowl");
        this.ricebowlIcon.setOrigin(0, 0);
        this.ricebowlIcon.setDepth(10);
        this.ricebowlIcon.setScrollFactor(0);
        this.riceCount = this.add.text(config.width - 75, 100, "", {
            font: "65px Arial",
            fill: "#000000",

        });
        this.riceCount.setOrigin(1, 0);
        this.riceCount.setScrollFactor(0);
        this.riceCount.setDepth(10);


        //* JumpBoost
        this.jumpBoostIcon = this.add.image(20, 10, "jumpBoostIcon").setScale(2);
        this.jumpBoostIcon.setOrigin(0, 0);
        this.jumpBoostIcon.setDepth(10);
        this.jumpBoostIcon.setScrollFactor(0);
        this.jumpBoostIcon.setAlpha(0.25);
        //#endregion

        //#region  //! Background Create (Parallax)
        // Add SKY layer               
        /*this.sky = this.add.tileSprite(0,0,game.config.width, game.config.height, "sky");
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);
        */

        this.mountain = this.add.tileSprite(0, 0, game.config.width, game.config.height, "mountain");
        this.mountain.setOrigin(0, 0);
        this.mountain.setScrollFactor(0);


        // tree Layer mit Höhe von 350 pixel
        this.tree = this.add.tileSprite(0, 0, game.config.width, 610, "tree");
        this.tree.setOrigin(0, 1);
        this.tree.setScrollFactor(0);
        this.tree.y = game.config.height - 50;

        // Ground Layer mit Höhe von 50px
        this.ground = this.add.tileSprite(0, 1, game.config.width * 3, 50, "ground");
        this.ground.setOrigin(0, 1);
        this.ground.setScrollFactor(0);
        this.ground.y = game.config.height;
        this.physics.add.existing(this.ground);
        this.ground.body.setCollideWorldBounds(true);
        //#endregion 

        //#region   //! World Physics
        this.physics.world.gravity.y = 400;
        this.physics.world.bounds.width = this.ground.width;
        //#endregion

        //#region //! Player definition and PlayerInputs
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player = this.physics.add.image(100, 718 - 100, "player");

        // test für soyfish und chopstick
        this.spacebarsoyfish = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.spacebarchopstick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //#endregion

        //#region  //! Enemies (OLD Guy && Girl && Wasabi)
        //* Boy
        this.boy = this.physics.add.sprite(config.width - 500, 100, "boy").setScale(1.75);
        this.boy.setOrigin(0, 0);
        this.boy.setDepth(20);
        this.boySpawntime = 0;

        //* Girl
        this.girl = this.physics.add.sprite(config.width - 70, 100, "girl").setScale(1.75);
        this.girl.setOrigin(1, 0);
        this.girl.setDepth(10);
        this.girlSpawntime = 0;

        //* Wasabi Group
        this.wasabiGroup = this.physics.add.group();
        this.wasabiSpawntime = 0;

        //* Soyfish Group
        this.soyfishs = this.physics.add.group({
            allowGravity: false,
            velocityX: -700,
            velocityY: 90
        });
        this.soyfishs.setDepth(30);

        //* Chopstick Group
        this.chopsticks = this.physics.add.group({
            allowGravity: false,
            velocityX: -550,
            velocityY: 40
        });




        //#endregion

        //#region  //!PickUP Ricebowl  + Powerups ( JumpBoost && Shield)

        this.ricebowl = this.physics.add.group({
            key: "ricebowl",
            repeat: 0,
        });
        this.ricebowl.children.iterate(child => {
            this.physics.add.collider(child, this.ground);
            child.x = Phaser.Math.Between(500, 1000);
            child.y = 668;
            child.setImmovable(true);
        });
        this.riceballs = this.physics.add.group({
            allowGravity: false,
            velocityX: 400,
            velocityY: 10
        });



        //* Jump Boost
        this.pwrJump = this.physics.add.group({
            key: "2x",
            repeat: 0,
            allowGravity: false,
        });
        this.pwrJump.children.iterate(child => {
            this.physics.add.collider(child, this.ground);
            child.x = Phaser.Math.Between(500, 1000);
            child.y = 520;
            child.setImmovable(true);
            child.play("hoverJumpBoost_anim");
        });

        this.jumpBoost = false;
        this.avaibleBoostJump = 0;
        this.physics.add.overlap(this.player, this.pwrJump, this.takePwrJumpBoost, null, this);

        //* Shield

        this.pwrShield = this.physics.add.group({
            key: "atlas_shield",
            repeat: 0,
            allowGravity: false,
        });
        this.pwrShield.children.iterate(child => {
            this.physics.add.collider(child, this.ground);
            child.x = Phaser.Math.Between(500, 1000);
            child.y = 600;
            child.setImmovable(true);
            child.play("shield_anim");

        });

        this.pwrShield = false;
        this.physics.add.overlap(this.player, this.pwrShield, this.takePwrShield, null, this);



        //#endregion

        //#region //! Collider & Overlapping

        //! Enemies
        //* Girl
        this.physics.add.collider(this.girl, this.ground);
        this.physics.add.collider(this.girl, this.player);

        //* Boy
        this.physics.add.collider(this.boy, this.ground);
        this.physics.add.collider(this.boy, this.player);

        //* Player
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.overlap(this.player, this.wasabiGroup, this.wasabiHit, null, this);
        this.physics.add.overlap(this.player, this.ricebowl, this.ricebowlHit, null, this);

        //* Riceballs
        this.physics.add.collider(this.ground, this.riceballs, this.riceballHitGround, null, this);
        this.physics.add.overlap(this.wasabiGroup, this.riceballs, this.riceballHitGround, null, this);

        //* Wasabi
        this.physics.add.collider(this.wasabiGroup, this.ground);

        //* Chopsticks
        this.physics.add.collider(this.ground, this.chopsticks, this.chopstickHitGround, null, this);
        this.physics.add.overlap(this.wasabiGroup, this.chopsticks, this.chopstickHitGround, null, this);

        //* Soyfish
        this.physics.add.collider(this.ground, this.soyfishs, this.soyfishHitGround, null, this);
        this.physics.add.overlap(this.wasabiGroup, this.soyfishs, this.soyfishHitGround, null, this);

        //#endregion

        //#region  //! Main Camera

        this.myCam = this.cameras.main;
        // Grenzen der Kamera festlegen hier = 3* der Configlänge
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);
        // Camera verfolgt den Spieler
        this.myCam.startFollow(this.player);

        //#endregion


        //#region //! TIMER
        //?
        /*
        this.minutes = 0;
        this.time = 0;
        this.timeCount = this.add.text(20,10, "0",{
            font: "65px Arial",
            fill: "#000000",
                
        });
        this.timeCount.setOrigin(0,0);
        this.timeCount.setScrollFactor(0);
*/
        //#endregion

        console.log(this.boy.x + "boy x");
        console.log(this.boy.y);

        console.log(this.girl.x + " girl x");
        console.log(this.girl.y);

    }

    //! Update 
    update() {
        //TODO für TEST ERSTMAL AUS
        // console.log(this.player.x);
        //? this.timeManager();
        this.movePlayerManager();
        this.eventManager();
        this.randomEnemy();

        // Schnelligkeit des Scrollens bzw. des vorbeiziehens des Hintergrundes Höher = schneller vorbeiziehen
        /* //? this.sky.tilePositionX = this.myCam.scrollX * .2;*/
        this.mountain.tilePositionX = this.myCam.scrollX * .4;
        this.tree.tilePositionX = this.myCam.scrollX * .6;
        this.ground.tilePositionX = this.myCam.scrollX;



    }

    //! Timemanager

    /*  timeManager(){
         
          this.time++;
  
          if (this.time/60 > 60){
              this.minutes++;
              this.time = 0;
          }
          if(this.minutes < 10){
              this.minutesString = "0" + this.minutes.toString();
          } else {
              this.minutesString = this.minutes;    
          }
  
          this.timeCount.setText(this.minutesString + "." + (this.time/60).toFixed(2));   
          
          
      }*/

    //#region  //! Player Functions & Eventmanager

    //* Playermovement
    movePlayerManager() {
        if (this.cursorKeys.left.isDown && this.player.x > 60) {

            this.player.setVelocityX(-gameSettings.playerSpeed);

        } else if (this.cursorKeys.right.isDown && this.player.x < game.config.width * 3 - 60) {
            this.player.setVelocityX(gameSettings.playerSpeed);


        } else {
            this.player.setVelocityX(0);
        }
        // Jump
        if (this.cursorKeys.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-gameSettings.playerSpeed);

        }
        // Jump with Boost    
        if (this.cursorKeys.up.isDown && this.player.body.onFloor() && this.jumpBoost) {
            this.player.setVelocityY(-gameSettings.playerSpeed * 1.5);
            this.avaibleBoostJump++;
            if (this.avaibleBoostJump == 2) {
                this.jumpBoost = false;
                this.jumpBoostIcon.setAlpha(0.25);
            }
            console.log(" jumpBoost JUMP schon benutzt == " + this.avaibleBoostJump)

        }

        //* Player shoot Riceball
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            console.log("Vor dem Abschießen noch " + this.avaibleRice + " Reisbaelle übrig");

            if (this.avaibleRice > 0) {
                this.shootRiceball();
                this.avaibleRice--;
                if (this.avaibleRice == 0) {
                    this.riceCount.setText("");
                } else {
                    this.riceCount.setText(this.avaibleRice);
                }

            }

            //* Interiert durch alle child Objekte einer Group und rufen Update auf bei jedem Child
            /*for(var i = 0; i < this.riceballs.getChildren().length; i++){
                this.riceball = this.riceballs.getChildren()[i];
                this.riceball.update();
              }  */

        }
        if (Phaser.Input.Keyboard.JustDown(this.spacebarsoyfish)) {
            this.avaibleSoyfish = 100;
            this.shootSoyfish();



        }
        if (Phaser.Input.Keyboard.JustDown(this.spacebarchopstick)) {
            this.avaibleChopstick = 100;
            this.shootChopstick();
        }
    }

    shootRiceball() {
        var riceball = new Riceball(this);
    }

    shootSoyfish() {
        var soyfish = new Soyfish(this);
        this.boy.play("boy_anim");
    }

    shootChopstick() {
        var chopstick = new Chopstick(this);
        this.girl.play("girl_anim");
    }

    eventManager() {
        if (this.avaibleRice == 0) {
            this.ricebowlIcon.alpha = 0.5;

        } else {
            this.ricebowlIcon.alpha = 1.0;
        }

    }
    //#endregion

    controlHp(hpValue) {

        switch (hpValue) {
            // 2.5 Herzen
            case 5:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp5_anim");
                break;

            // 2 Herzen
            case 4:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp4_anim");
                break;

            // 1.5 Herzen
            case 3:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp3_anim");
                break;

            // 1 Herz
            case 2:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp2_anim");
                break;

            // 0.5 Herzen
            case 1:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp1_anim");
                break;

            // 0 Herzen
            case 0:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp0_anim");
                console.log("******TOT********");
                break;



        }
    }

    //#region  //! Collider Functions ( WasabiHit RicebowlHit RiceballHit ChopstickHit SoyfishHit)

    wasabiHit(player, wasabi) {
        wasabi.destroy();
        this.hpValue--;
        this.controlHp(this.hpValue);

    }

    chopstickHit(player, chopstick) {
        chopstick.destroy();
        this.hpValue--;
        this.controlHp(this.hpValue);

    }

    soyfishHit(player, soyfish) {
        soyfish.destroy();
        this.hpValue--;
        this.controlHp(this.hpValue);

    }
    ricebowlHit(player, ricebowl) {
        ricebowl.destroy();
        console.log("Ricebowl aufgehoben");
        this.avaibleRice += 10;
        if (this.avaibleRice == 0) {
            this.riceCount.setText("");
        } else {
            this.riceCount.setText(this.avaibleRice);
        }

    }

    soyfishHitGround(ground, riceball) {
        riceball.destroy();
    }

    chopstickHitGround(ground, riceball) {
        riceball.destroy();
    }

    riceballHitGround(ground, riceball) {
        riceball.destroy();
    }

    //#endregion


    //#region //! Spawn Enemy & Powerups    


    spawnWasabi() {
        var newWasabi = new Wasabi(this);
        console.log("SPAWNED WASABI");
    }


    randomEnemy() {
        this.wasabiSpawntime++;

        if (this.wasabiSpawntime / 60 > 5) {
            this.wasabiSpawntime = 0;
            this.spawnWasabi();
        }

    }

    //#endregion



    takePwrJumpBoost(player, jumpBoost) {
        jumpBoost.destroy();
        this.jumpBoost = true;
        this.jumpBoostIcon.setAlpha(1);
        console.log("JumpBoost picked up!");
    }

    takePwrShield(player, shield) {
        shield.destroy();


    }

}







class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");

    }

    preload(){
        
    }
    
    create() { 
        
        //! UI Create
        //* Healthbar
        this.hpValue = 6;
        this.hp = this.add.sprite(config.width-200, 10,"hp");
        this.hp.setOrigin(0,0);
        this.hp.setDepth(10);
        this.hp.setScrollFactor(0);

        //TODO Wenn avaibleRiceball = 0 das Reisbowl Symbol durchstreichen und keinen Text setzen nur Symbol
        //* Ricebar 
        this.avaibleRice = 0;
        this.ricebowls = this.add.image(config.width-70, 100,"ricebowl").setScale(2);
        this.ricebowls.setOrigin(0,0);
        this.ricebowls.setDepth(10);
        this.ricebowls.setScrollFactor(0);
        this.riceCount = this.add.text(config.width - 75 ,100, "0",{
            font: "65px Arial",
            fill: "#000000",
                
        });
        this.riceCount.setOrigin(1,0);
        this.riceCount.setScrollFactor(0);
        this.riceCount.setDepth(10);
        
        //* Boy
<<<<<<< HEAD

=======
        this.boy = this.add.image(config.width-70, 100,"boy").setScale(2);
>>>>>>> master
        this.boy.setOrigin(0,0);
        this.boy.setDepth(10);
        this.boy.setScrollFactor(0);

        //* Girl
<<<<<<< HEAD
        this.girl = this.add.image(girl.width-70, 100,"girl").setScale(2);
        this.girl.setOrigin(0,0);
=======
        this.girl = this.physics.add.image(config.width-70, 100,"girl").setScale(2);
        this.girl.setOrigin(1,0);
>>>>>>> master
        this.girl.setDepth(10);
        this.girl.setScrollFactor(0);


        //! Background Create
        // Add SKY layer               
        this.sky = this.add.tileSprite(0,0,game.config.width, game.config.height, "sky");
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);
        
        this.mountain = this.add.tileSprite(0,0,game.config.width, game.config.height, "mountain");
        this.mountain.setOrigin(0,0);
        this.mountain.setScrollFactor(0);


        // tree Layer mit Höhe von 350 pixel
        this.tree = this.add.tileSprite(0, 0, game.config.width,game.config.height, "tree");
        this.tree.setOrigin(0, 1);
        this.tree.setScrollFactor(0);
        this.tree.y= game.config.height - 50;

        // Ground Layer mit Höhe von 50px
        this.ground = this.add.tileSprite(0, 1, game.config.width*3,50,"ground");
        this.ground.setOrigin(0,1);
        this.ground.setScrollFactor(0);
        this.ground.y = game.config.height;
        this.physics.add.existing(this.ground);
        this.ground.body.setCollideWorldBounds(true);
       
        //! World Physics
        this.physics.world.gravity.y = 400;
        this.physics.world.bounds.width = this.ground.width;
       
       
        //! Player + Input
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player = this.physics.add.image(100 , 718-100,"player");
    

        //!PickUP

        this.ricebowl = this.physics.add.group({
            key: "ricebowl",
            repeat : 0,
        });
        this.ricebowl.children.iterate(child => {
            this.physics.add.collider(child, this.ground);
            child.x = Phaser.Math.Between(500, 1000);
            child.y = 668;
            child.setImmovable(true);
        });


        //! Groups
        //* Riceballs
        this.riceballs = this.physics.add.group({
            allowGravity: false,
            velocityX : 400,
            velocityY : 10
        });
        
        
        //* Wasabi Group
        this.wasabiGroup = this.physics.add.group();
        this.wasabiSpawntime = 0;
       
       
        //! Enemies
        //* Girl
        this.physics.add.collider(this.girl, this.ground);
        this.girlSpawntime = 0;
        
        //* Boy
        this.physics.add.collider(this.boy, this.ground);
        this.boySpawntime = 0;
        
        //! Collider
        //* Player
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.overlap(this.player,this.wasabiGroup,this.wasabiHit,null , this);
        this.physics.add.overlap(this.player,this.ricebowl,this.ricebowlHit,null , this);


        //* Riceballs
        this.physics.add.collider(this.ground, this.riceballs,this.riceballHitGround,null,this);
        this.physics.add.overlap(this.wasabiGroup, this.riceballs,this.riceballHitGround,null,this);

        //* Wasabi
        this.physics.add.collider(this.wasabiGroup, this.ground);
    
        //* Chopsticks
        this.physics.add.collider(this.ground, this.chopsticks,this.chopstickHitGround,null,this);
        this.physics.add.overlap(this.wasabiGroup, this.chopsticks,this.chopstickHitGround,null,this);
       
        //* Soyfish
        this.physics.add.collider(this.ground, this.soyfish,this.soyfishHitGround,null,this);
        this.physics.add.overlap(this.wasabiGroup, this.soyfishs,this.soyfishHitGround,null,this);

        //! Main Camera
        this.myCam = this.cameras.main;
        // Grenzen der Kamera festlegen hier = 3* der Configlänge
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);
        // Camera verfolgt den Spieler
        this.myCam.startFollow(this.player);
        
        //! TIMER
        this.minutes = 0;
        this.time = 0;
        this.timeCount = this.add.text(20,10, "0",{
            font: "65px Arial",
            fill: "#000000",
                
        });
        this.timeCount.setOrigin(0,0);
        this.timeCount.setScrollFactor(0);


    }
    
    //! Update 
    update() {
       //TODO für TEST ERSTMAL AUS
       // console.log(this.player.x);
        this.timeManager();
        this.movePlayerManager();
        
        this.randomEnemy();
        // Schnelligkeit des Scrollens bzw. des vorbeiziehens des Hintergrundes
        this.sky.tilePositionX = this.myCam.scrollX * .2;
        this.mountain.tilePositionX = this.myCam.scrollX * .4;
        this.tree.tilePositionX = this.myCam.scrollX * .6;
        this.ground.tilePositionX = this.myCam.scrollX;


        
    }
    //! Time

    timeManager(){
       
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
        
        
    }


        //! Player Functions

       //* Playermovement
        movePlayerManager(){
            if(this.cursorKeys.left.isDown && this.player.x > 60){
                this.player.setVelocityX(-gameSettings.playerSpeed);
        
            } else if (this.cursorKeys.right.isDown && this.player.x < game.config.width * 3 - 60){
                this.player.setVelocityX(gameSettings.playerSpeed);
                

            } else {
                this.player.setVelocityX(0);
            }
            // Jump
            if(this.cursorKeys.up.isDown && this.player.body.onFloor()){
                this.player.setVelocityY(-gameSettings.playerSpeed);
                
                } 
                
             //? Check ob der Bug noch auftritt
            /*if(this.player.y > 670){
                console.log("FALL OF MAP");
               this.player.y = 660;
            
            }    */
            
            //* Player shoot Riceball
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
                console.log("Vor dem Abschießen noch " + this.avaibleRice + " Reisbaelle übrig");
                if(this.avaibleRice > 0){
                this.shootRiceball();    
                this.avaibleRice--;
                this.riceCount.setText(this.avaibleRice);

                }    


                /*for(var i = 0; i < this.riceballs.getChildren().length; i++){
                    this.riceball = this.riceballs.getChildren()[i];
                    this.riceball.update();
                  }  */  

            }
        }
          
        
        shootRiceball(){
            var riceball = new Riceball(this);
        }

        
        
        controlHp(hpValue){
        
            switch(hpValue){
                // 2.5 Herzen
                case 5 :
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp5_anim");
                break;
                
                // 2 Herzen
                case 4 :
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp4_anim");
                break;
                
                // 1.5 Herzen
                case 3 :
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp3_anim");
                break;
                
                // 1 Herz
                case 2 :
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp2_anim");
                break;
                
                // 0.5 Herzen
                case 1 :
                console.log("DEINE LEBEN === " + hpValue);   
                this.hp.play("hp1_anim");
                break;
                
                // 0 Herzen
                case 0 :
                console.log("DEINE LEBEN === " + hpValue);    
                this.hp.play("hp0_anim");
                console.log("******TOT********");
                break;
                
                
    
            }   
        } 
    
        //! Collider Functions
        wasabiHit(player,wasabi){
            wasabi.destroy();
            this.hpValue--;
            this.controlHp(this.hpValue);

        }

        ricebowlHit(player,ricebowl){
            ricebowl.destroy();
            console.log("Ricebowl aufgehoben");
            this.avaibleRice += 10;
            this.riceCount.setText(this.avaibleRice);
        }
        
        riceballHitGround(ground,riceball){
            riceball.destroy();
        }

        spawnWasabi(){
            var newWasabi = new Wasabi(this);   
            console.log("SPAWNED WASABI");
        }
        
        
        randomEnemy(){
        
           
            this.wasabiSpawntime++;
            
            if(this.wasabiSpawntime/60 > 5){
                this.wasabiSpawntime = 0;
                this.spawnWasabi();
            }

        }
        
}
        
  
       

    


class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");

    }

    
    
    
    create() {
        
        
        this.add.text(20,20, "Main Game");
        // Background des Spieles
        this.background = this.add.image(0,0,"game_bg");
        this.background.setOrigin(0,0); 
        this.physics.world.gravity.y = 400;
        // Player
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player = this.physics.add.image(100 , 718,"player");
        this.player.setCollideWorldBounds(true);
        console.log(this.player.width);
       
        
        





 
    }
    
    //! Update 
    update() {
        
        this.movePlayerManager();
        this.shootPlayerManager()
        //console.log(this.player.x);    


        
    }



        movePlayerManager(){
            if(this.cursorKeys.left.isDown){
                this.player.setVelocityX(-gameSettings.playerSpeed);
            } else if (this.cursorKeys.right.isDown){
                this.player.setVelocityX(gameSettings.playerSpeed);
            } else {
                this.player.setVelocityX(0);
            }
            // Jump
            if(this.cursorKeys.up.isDown && this.player.body.onFloor()){
                this.player.setVelocityY(-gameSettings.playerSpeed);
                console.log("jump");
                } 
                
            
            }

        shootPlayerManager(){
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
                this.shootRiceball();    
                console.log("FIRE");

            }
        }    
        
        

        shootRiceball(){
            var posX = this.player.x + 32;
            var riceball = this.physics.add.image(posX,this.player.y,"riceball");
            riceball.body.setAllowGravity(false);
            this.physics.world.enableBody(this);
            
            riceball.setVelocity(800, 0);

            this.physics.add.collider(riceball,this.enemies, function(riceball) {
                riceball.destroy();

                console.log(riceball.velocityX);
           
             
            });
        }
    
            
    
        }
        
      /*  spawnWasabi({
    
        })*/
       

    


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
        this.player = this.physics.add.image(100 , 718,"player");
        this.player.setCollideWorldBounds(true);
        console.log(this.player.width);
       
        





 
    }
    
    //! Update 
    update() {
        
        this.movePlayerManager();
       
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
                }
            }  
            
        

      
       

    }


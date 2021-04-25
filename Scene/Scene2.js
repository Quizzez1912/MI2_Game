class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");

    }

    
    
    
    create() {
        this.add.text(20,20, "Main Game");
        // Background des Spieles
        this.background = this.add.image(0,0,"game_bg");
        this.background.setOrigin(0,0); 
        
        // Player
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.image(config.width/2 , config.height/2,"player");

        





 
    }
    
    //! Update 
    update() {
        
        this.movePlayerManager();
       
      


        
    }



        movePlayerManager(){
            if(this.cursorKeys.left.isDown){
                this.player.setVelocityX(-gameSettings.playerSpeed);
            } else if (this.cursorKeys.right.isDown){
                this.player.setVelocityX(gameSettings.playerSpeed);
            } else {
                this.player.setVelocityX(0);
            }
            
            if(this.cursorKeys.up.isDown){
                this.player.setVelocityY(-gameSettings.playerSpeed);
                }else if(this.cursorKeys.down.isDown){
                this.player.setVelocityY(gameSettings.playerSpeed);
            } else {
                    this.player.setVelocityY(0);
                }  
            
        }

      
       

    }


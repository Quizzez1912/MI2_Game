class Riceball extends Phaser.GameObjects.Sprite {
    
    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y;
        
        super(scene,x,y,"riceball")

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.body.setVelocityX(800);
        scene.riceballs.add(this);
        


    }

   
}

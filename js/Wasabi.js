class Wasabi extends Phaser.GameObjects.Sprite {
    
    constructor(scene){
        var x = Phaser.Math.Between(scene.player.x + 1000,scene.player.x + 2500);
        var y = scene.player.y;
        
        super(scene,x,y,"wasabi")

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

       //* Gruppe wasabi
        scene.wasabiGroup.add(this);



    }

   
}

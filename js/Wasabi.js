class Wasabi extends Phaser.GameObjects.Sprite {

    constructor(scene) {
        var x = Phaser.Math.Between(scene.player.x + 300, scene.player.x + 800);
        var y = scene.player.y - 300;

        super(scene, x, y, "wasabi")

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        //* Gruppe wasabi
        scene.wasabiGroup.add(this);



    }


}

class HealthBar extends Phaser.GameObjects.Sprite(scene){
    constructor(scene) {
        
        this.heartBar;
        this.scene = scene;
        this.x = config.width-100;  
        this.y = 10;
        this.value = 7;

        this.draw();

        
        
        scene.add.existing(this.heartBar);
        

        
        /*
        this.setOrigin(0,0);
        this.setDepth(10);
        this.setScrollFactor(0);

        */
    }
   
    draw() {
    this.heartBar.add.sprite(this.x, this.y,"heartUI");
        
    }

    update() {

    }
}
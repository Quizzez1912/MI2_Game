class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");

    }

    create() {
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);    

        this.ship1 = this.add.image(100,100,"ship");
        this.ship2 = this.add.image(50,100, "ship2");
        this.ship3 = this.add.image(150,100, "ship3");

        
        
        this.add.text(20,20, "Playing game", {font: "25px Arial",fill:"yellow"});
    }

    moveShip(ship,speed) {
        ship.y += speed;
      
        console.log(ship.y);

        if(ship.y > config.height){
            console.log("out of map");
            this.resetShipPos(ship);
        }

    }

    resetShipPos(ship) {
        ship.y = 0;
        var randomX = Phaser.Math.Between(0,config.width);
        ship.x = randomX;
    }
    update() {
        this.moveShip(this.ship1,1);
        this.moveShip(this.ship2,2);
        this.moveShip(this.ship3,3);
    }
}
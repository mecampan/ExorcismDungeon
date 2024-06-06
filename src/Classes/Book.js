class Book extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

    }

    collect() {
        // destroy book sprite 
        // add ui to bottom of screen to confirm book has been collected
        this.disableBody(true, true);
        this.setVisible(false);

        let message = this.scene.add.bitmapText(this.x, this.y - 20, 'myFont', 'Spell Book Collected.', 5)
        .setOrigin(0.5);    

        // Make the message disappear after a short time
        this.scene.time.delayedCall(1000, () => {
            message.destroy(); // This will remove the text from the scene
        });
    }
}

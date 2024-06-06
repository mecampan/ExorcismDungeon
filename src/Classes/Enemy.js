class Enemy {
    constructor(scene, x, y, texture, frame) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, texture, frame).setOrigin(0.5, 0.5).setScale(0.4);
        this.stunned = false;
        this.attacking = false;

        this.sprite.body.setSize(50, 70); // Example values

        // Play run animation
        this.sprite.anims.play('run');

        this.pathfinder = new Pathfinder(this.scene, this.sprite);
        this.pathfinder.create();
        this.pathfinder.roam(); // Start roaming when the enemy is created
        //this.pathfinder.chase(); // Start chasing the player
    }

    enemyAttack() {
        if (!this.attacking){
            this.attacking = true;
            this.pathfinder.stopCharacter();
            this.sprite.anims.play('attackB');

            this.scene.time.delayedCall(1500, () => {
                this.sprite.anims.play('run');
                this.pathfinder.roam();

                this.scene.time.delayedCall(500, () => {
                    this.attacking = false;
                });
            });
        }
    }

    enemyStun() {
        if (!this.stunned) {
            this.stunned = true;
            this.canAttack = false;
            this.sprite.anims.play('stunned');

            // Prevent the enemy from being stunned more than once
            this.scene.time.delayedCall(10000, () => {
                this.stunned = false;
                this.canAttack = true;
                this.sprite.anims.play('run');
                this.pathfinder.roam();
            });
        }
    }

    renderDebug(graphics) {
        // Draw the body collision box
        graphics.lineStyle(1, 0xff0000, 1); // Red color for collision boxes
        graphics.strokeRect(
            this.sprite.body.x,
            this.sprite.body.y,
            this.sprite.body.width,
            this.sprite.body.height
        );
    }

    update() {
        // Update logic for the enemy
    }
}
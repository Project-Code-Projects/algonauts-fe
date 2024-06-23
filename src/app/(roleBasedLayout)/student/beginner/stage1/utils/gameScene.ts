import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private ground!: Phaser.Physics.Arcade.StaticGroup;
    private blackholes!: Phaser.Physics.Arcade.StaticGroup;
    private spacecraft!: Phaser.Physics.Arcade.StaticGroup;
    private explosion!: Phaser.Physics.Arcade.Sprite;
    private gameData: any;

    constructor(gameData: any) { // Accept gameData in the constructor
        super('game-scene');
        this.gameData = gameData;
    }

    preload() {
        // Load assets here
        this.load.image('sky', '../../assets/scifi wallpaper.png');
        this.load.spritesheet('dude', '../../assets/astro.webp', { frameWidth: 42, frameHeight: 48 });
        this.load.spritesheet('blackhole', '../../assets/fire.png', { frameWidth: 15, frameHeight: 24 });
        this.load.image('spacecraft', '../../assets/spaceship.png');
        this.load.spritesheet('explosion', '../../assets/busted1.png', { frameWidth: 127.5, frameHeight: 128 });
    }

    create() {
        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 0, 'sky').setOrigin(0, 0).setScale(1).refreshBody();

        // Create blackholes from gameData
        this.blackholes = this.physics.add.staticGroup();
        this.gameData.blackholes.forEach((bh: { x: number, y: number }) => {
            const blackholeSprite = this.blackholes.create(bh.x, bh.y, 'blackhole').setOrigin(0, 0).setScale(1).refreshBody();
            this.createBlackholeAnimation(blackholeSprite);
        });

        // Create spacecraft from gameData
        this.spacecraft = this.physics.add.staticGroup();
        this.spacecraft.create(this.gameData.spacecraft.x, this.gameData.spacecraft.y, 'spacecraft').setOrigin(0, 0).setScale(1).refreshBody();

        // Create player from gameData
        this.player = this.physics.add.sprite(this.gameData.player.x, this.gameData.player.y, 'dude');
        this.player.setCircle(this.player.body.halfWidth, 0, this.player.body.halfHeight - this.player.body.halfWidth);
        this.physics.add.collider(this.player, this.ground);

        // Add collision between player and blackholes
        this.addCollisions(this.player, this.blackholes);

        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 1 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 6 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5 }),
            frameRate: 10,
            hideOnComplete: true,
        });
    }

    createBlackholeAnimation(blackholeSprite: Phaser.Physics.Arcade.Sprite) {
        let currentFrame = 0;
        this.time.addEvent({
            delay: 100,
            callback: () => {
                currentFrame = currentFrame < 5 ? currentFrame + 1 : 0;
                blackholeSprite.setFrame(currentFrame);
            },
            loop: true,
        });
    }

    addCollisions(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, blackholeGroup: Phaser.Physics.Arcade.StaticGroup) {
        this.physics.add.collider(player, blackholeGroup, (playerSprite, blackhole) => {
            const blackholeSprite = blackhole as Phaser.Physics.Arcade.Sprite;
            playerSprite.destroy();
            blackholeSprite.destroy();
            this.explosion = this.physics.add.sprite(playerSprite.x, playerSprite.y, 'explosion');
            this.explosion.play('explode');
        });
    }

    update() {
        // Add game logic here
    }

    movePlayer(direction: string) {
        const moveSpeed = 100;

        switch (direction.toLowerCase()) {
            case 'move':
                const targetAngle = this.player.rotation;
                const vx = Math.cos(targetAngle) * moveSpeed;
                const vy = Math.sin(targetAngle) * moveSpeed;
                this.player.setVelocity(vx, vy);
                this.player.play('move');
                setTimeout(() => {
                    if (this.player) this.player.setVelocity(0, 0);
                    this.player.anims.play('turn');
                }, 1000);
                break;
            case 'turn':
                const currentAngle = this.player.angle;
                this.tweens.add({
                    targets: this.player,
                    angle: currentAngle < 0 ? Math.floor(currentAngle + 90) : Math.ceil(currentAngle + 90),
                    duration: 800,
                    ease: 'Linear',
                });
                break;
        }
    }
}

// import Phaser from 'phaser';
const Phaser = require('phaser');


export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('game-over');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 2 - 50, 'Game Over', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const playAgainButton = this.add.text(width / 2, height / 2 + 50, 'Play Again', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => this.scene.start('game-scene'));

        playAgainButton.on('pointerover', () => playAgainButton.setStyle({ fill: '#ff0' }));
        playAgainButton.on('pointerout', () => playAgainButton.setStyle({ fill: '#ffffff' }));
    }
}
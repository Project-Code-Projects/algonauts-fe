import React, { useEffect, useRef } from 'react';
import { GameScene } from '../utils/gameScene';
import Phaser from 'phaser';
import { GameOverScene } from '../utils/gameOverScene';
import { WinScene } from '../utils/winScene';

interface GameProps {
    setGameScene: (gameScene: GameScene) => void;
}

const Game: React.FC<GameProps> = ({ setGameScene }) => {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            mode: Phaser.Scale.FIT,
            width: 800,
            height: 448,
            scene: [GameScene, GameOverScene, WinScene],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true
                }
            },
            parent: 'game-container', // Ensure the parent is set
        };

        const game = new Phaser.Game(config);
        gameRef.current = game;
        
        game.events.on('ready', () => {
            const gameSceneInstance = game.scene.getScene('game-scene') as GameScene;
            setGameScene(gameSceneInstance);
        });
        
        return () => {
            game.destroy(true);
        };
    }, []);

    return <div id="game-container" className="" />;
};

export default Game;

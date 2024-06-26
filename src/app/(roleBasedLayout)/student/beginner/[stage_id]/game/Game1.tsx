import React, { useEffect, useRef } from 'react';
import { GameScene } from '../utils/gameScene';
import * as Phaser from 'phaser';
import { GameOverScene } from '../utils/gameOverScene';
import { WinScene } from '../utils/winScene';

interface GameProps {
    setGameScene: (gameScene: GameScene) => void;
    gameData: any; // Replace 'any' with a more specific type if desired
}

const Game: React.FC<GameProps> = ({ setGameScene, gameData }) => {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 448,
            scene: [new GameScene(gameData),GameOverScene, WinScene], // Pass gameData to GameScene
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                },
            },
            parent: 'game-container',
        };

        const game = new Phaser.Game(config);
        gameRef.current = game;

        game.events.once('ready', () => {
            const gameSceneInstance = game.scene.getScene('game-scene') as GameScene;
            setGameScene(gameSceneInstance);
        });

        return () => {
            game.destroy(true);
        };
    }, [gameData, setGameScene]);

    return <div id="game-container" style={{ width: '100%', height: '100%', maxHeight: '468px' }} />;
};

export default Game;

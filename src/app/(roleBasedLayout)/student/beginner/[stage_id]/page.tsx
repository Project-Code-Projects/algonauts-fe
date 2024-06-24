'use client'

import type { Edge, OnConnect } from "reactflow";
import LinkedList from "./utils/LinkedList";
import Game from "./game/Game1";
import FlowContext from "./context/FlowContext";
import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  BackgroundVariant,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes, nodeTypes } from "./nodes";
import type { Node } from "reactflow";
import { edgeTypes } from "./edges";
import { traverseMovementChain } from "./utils/traverseMovementChain";
import './index.css';
import { useGetBeginnerLevelByLevelIdQuery } from "@/redux/api/beginnerLevelApi";

// Mock Data
// const gameData = {
//   player: { x: 50, y: 398 },
//   spacecraft: { x: 300, y: 300 },
//   blackholes: [
//     { x: 50, y: 200 },
//     { x: 300, y: 398 }
//   ]
// };

interface Params {
  params: { stage_id: string };
}

export default function App({ params }: Params) {
  const levelId = params.stage_id;

  // Hook order and initialization
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const { getNode } = useReactFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { data: gameData, isLoading: loadingLevel, isError: loadingLevelError } = useGetBeginnerLevelByLevelIdQuery(levelId);
  console.log(gameData);

  // useCallback for memoization
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => {
      const newEdge = {
        ...connection,
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#d90fcb',
        },
        style: {
          strokeWidth: 3,
          stroke: '#784be8',
        }
      };
      return addEdge(newEdge, eds);
    }),
    [setEdges]
  );



  // Function to initialize movementChain
  const chain = () => {
    const a = new (LinkedList as any)();
    return a;
  };

  // State hooks
  const [movementChain, setMovementChain] = useState(chain());
  const [gameScene, setGameScene] = useState<GameScene | null>(null);

    // Early return for loading and error states
    if (loadingLevelError) return <div>Error...</div>;
    if (loadingLevel) return <div>Loading...</div>;

  // Function to add a new node
  const addNode = (dir: string, parentId?: string) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      parentNode: parentId,
      data: { label: dir === 'for' ? 'for' : `${dir}`, dir },
      position: parentId ? { x: 10, y: 10 } : { x: 0, y: 0 },
      type: dir === 'for' ? 'forNode' : 'textUpdater',
      ...(parentId ? { extent: 'parent' } : {}),
    };
    setNodes((nds) => [...nds, newNode as Node]);
  };

  // moveSprite function as before
  function moveSprite() {
    // moveSprite implementation
  }

  console.log('edges', edges, 'nodes', nodes, 'linkedList', movementChain);

  // Rendering the component
  return (
    <FlowContext.Provider value={{ addNode, nodes }}>
      <div className="flex w-full h-screen overflow-y-scroll bg-[#1c1b1a]">
        <div className="relative w-[50%]">
          <div className='editor-container'>
            <div className='toolbar'>
              <div className="absolute flex justify-between w-full z-20">
                <div>
                  <button className='bg-[#0f56d9] rounded-md ml-2 p-1 border-2 border-black text-white' onClick={() => addNode('move')}>+Move</button>
                  <button className='bg-[#0f56d9] rounded-md ml-2 p-1 text-white border-2 border-black' onClick={() => addNode('turn')}>+Turn</button>
                  <button className='bg-[#0f56d9] rounded-md ml-2 p-1 text-white border-2 border-black' onClick={() => addNode('for')}>+ For</button>
                </div>
                <div>
                  <button className="bg-[#0fd952] rounded-md mr-2 p-1 text-white border-2 border-black" onClick={moveSprite}>Convert</button>
                </div>
              </div>
            </div>
          </div>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background color="#f2e707" variant={BackgroundVariant.Cross} />
            <Controls />
          </ReactFlow>
        </div>
        <Game setGameScene={setGameScene} gameData={gameData.data} />
      </div>
    </FlowContext.Provider>
  );
}


"use client";

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
import "./index.css";
import { useGetBeginnerLevelByLevelIdQuery } from "@/redux/api/beginnerLevelApi";
import { GameScene } from "./utils/gameScene";
import { log } from "console";

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
  const [code, setCode] = useState("");

  const {
    data: gameData,
    isLoading: loadingLevel,
    isError: loadingLevelError,
  } = useGetBeginnerLevelByLevelIdQuery(levelId);

  // useCallback for memoization
  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((eds) => {
        const newEdge = {
          ...connection,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#d90fcb",
          },
          style: {
            strokeWidth: 3,
            stroke: "#784be8",
          },
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
      data: { label: dir === "for" ? "for" : `${dir}`, dir },
      position: parentId ? { x: 10, y: 10 } : { x: 0, y: 0 },
      type: dir === "for" ? "forNode" : "textUpdater",
      ...(parentId ? { extent: "parent" } : {}),
    };
    setNodes((nds) => [...nds, newNode as Node]);
  };

  async function moveSprite() {
    const generatedCode = await generateCode("start", nodes, edges);
    setCode(generatedCode);
    let startEdge = edges.find((edge) => edge.source == "start");
    let index = edges.findIndex((edge) => edge.source == "start");
    let startNode = getNode(startEdge?.target as string);

    if (startNode && startNode?.type === "forNode") {
      let startEdgeInForNode: Edge<any> | undefined,
        startNodeInForNode,
        indexInForNode = [];
      for (let i = 1; i <= startNode?.data.times; i++) {
        startEdgeInForNode = edges.find(
          (edge) => edge.source == startEdge?.target && edge.sourceHandle == "a"
        );
        if (i == startNode?.data.times)
          indexInForNode.push(
            edges.findIndex(
              (edge) =>
                edge.source == startEdge?.target && edge.sourceHandle == "a"
            )
          );
        startNodeInForNode = getNode(startEdgeInForNode?.target as string);
        for (let j = 1; j <= startNodeInForNode?.data.times; j++) {
          i == 1
            ? setMovementChain(
                movementChain.addToHead(startNodeInForNode?.data.dir)
              )
            : setMovementChain(
                movementChain.addToTail(startNodeInForNode?.data.dir)
              );
        }
        while (startEdgeInForNode?.targetHandle !== "b") {
          startEdgeInForNode = edges.find(
            (edge) =>
              edge.source == startEdgeInForNode?.target &&
              edge.sourceHandle == "a"
          );
          startNodeInForNode = getNode(startEdgeInForNode?.target as string);
          if (
            i == startNode?.data.times &&
            startNodeInForNode?.type !== "forNode"
          )
            indexInForNode.push(
              edges.findIndex(
                (edge) =>
                  edge.source == startEdgeInForNode?.target &&
                  edge.sourceHandle == "a"
              )
            );

          if (startNodeInForNode && startNodeInForNode?.type !== "forNode") {
            for (let k = 1; k <= startNodeInForNode?.data.times; k++) {
              setMovementChain(
                movementChain.addToTail(startNodeInForNode?.data.dir)
              );
            }
          }
        }

        let counter = 0;
        if (i == startNode?.data.times) {
          indexInForNode.forEach((i) => {
            edges.splice(i - counter, 1);
            counter++;
          });
        }
      }
    } else if (startNode) {
      for (let i = 1; i <= startNode?.data.times; i++) {
        setMovementChain(movementChain.addToHead(startNode?.data.dir));
      }
    } else setMovementChain(movementChain);

    while (edges.length > 0) {
      edges.splice(index, 1);
      index = edges.findIndex((edge) => edge.source == startEdge?.target);
      startEdge = edges.find((edge) => edge.source == startEdge?.target);
      let startNode = getNode(startEdge?.target as string);

      if (startNode && startNode?.type === "forNode") {
        let startEdgeInForNode: Edge<any> | undefined,
          startNodeInForNode,
          indexInForNode = [];
        for (let i = 1; i <= startNode?.data.times; i++) {
          startEdgeInForNode = edges.find(
            (edge) =>
              edge.source == startEdge?.target && edge.sourceHandle == "a"
          );
          if (i == startNode?.data.times)
            indexInForNode.push(
              edges.findIndex(
                (edge) =>
                  edge.source == startEdge?.target && edge.sourceHandle == "a"
              )
            );
          startNodeInForNode = getNode(startEdgeInForNode?.target as string);
          for (let j = 1; j <= startNodeInForNode?.data.times; j++) {
            setMovementChain(
              movementChain.addToTail(startNodeInForNode?.data.dir)
            );
          }
          while (startEdgeInForNode?.targetHandle !== "b") {
            startEdgeInForNode = edges.find(
              (edge) => edge.source == startEdgeInForNode?.target
            );
            startNodeInForNode = getNode(startEdgeInForNode?.target as string);
            if (
              i == startNode?.data.times &&
              startNodeInForNode?.type !== "forNode"
            )
              indexInForNode.push(
                edges.findIndex(
                  (edge) => edge.source == startEdgeInForNode?.target
                )
              );
            if (startNodeInForNode && startNodeInForNode?.type !== "forNode") {
              for (let k = 1; k <= startNodeInForNode?.data.times; k++) {
                setMovementChain(
                  movementChain.addToTail(startNodeInForNode?.data.dir)
                );
              }
            }
          }

          let counter = 0;
          if (i == startNode?.data.times)
            indexInForNode.forEach((index) => {
              edges.splice(index - counter, 1);
              counter++;
            });
        }
      } else if (startNode) {
        for (let i = 1; i <= startNode?.data.times; i++) {
          setMovementChain(movementChain.addToTail(startNode?.data.dir));
        }
      } else setMovementChain(movementChain);
    }

    if (gameScene) {
      traverseMovementChain(movementChain, gameScene);
    } else {
      console.warn("gameScene is not initialized");
    }
  }

  // console.log('edges', edges, 'nodes', nodes, 'linkedList', movementChain);

  function fetchNodeById(id, nodes) {
    return nodes.find((node) => node.id === id);
  }

  async function generateCode(startNodeId, nodes, edges) {
    let code = "function game() {\n";
    let visited = new Set();

    function traverse(nodeId, indent = "  ") {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = fetchNodeById(nodeId, nodes);
      if (!node) return;

      if (node.type === "textUpdater" && node.data.dir === "move") {
        code += `${indent}move(${node.data.times}); // Player moves ${
          node.data.times
        } time${node.data.times > 1 ? "s" : ""}\n`;
      } else if (node.type === "textUpdater" && node.data.dir === "turn") {
        code += `${indent}turn(${node.data.times}); // Player turns ${
          node.data.times
        } time${node.data.times > 1 ? "s" : ""}\n`;
      }

      if (node.type === "forNode") {
        code += `${indent}for (let i = 0; i < ${node.data.times}; i++) { // For loop iterates ${node.data.times} times\n`;
        const childrenEdges = edges.filter((edge) => edge.source === nodeId);
        childrenEdges.forEach((edge) => {
          traverse(edge.target, indent + "  ");
        });
        code += `${indent}}\n`;
      } else {
        const nextEdge = edges.find((edge) => edge.source === nodeId);
        if (nextEdge) {
          traverse(nextEdge.target, indent);
        }
      }
    }

    traverse(startNodeId);
    code += "}\n";
    return code;
  }

  console.log(code);
  // Rendering the component
  return (
    <FlowContext.Provider value={{ addNode, nodes }}>
      <div className="flex w-full h-screen overflow-y-scroll bg-[#1c1b1a]">
        <div className="relative w-[70%]">
          <div className="editor-container">
            <div className="toolbar">
              <div className="absolute flex justify-between w-full z-20">
                <div>
                  <button
                    className="bg-[#0f56d9] rounded-md ml-2 p-1 border-2 border-black text-white"
                    onClick={() => addNode("move")}
                  >
                    +Move
                  </button>
                  <button
                    className="bg-[#0f56d9] rounded-md ml-2 p-1 text-white border-2 border-black"
                    onClick={() => addNode("turn")}
                  >
                    +Turn
                  </button>
                  <button
                    className="bg-[#0f56d9] rounded-md ml-2 p-1 text-white border-2 border-black"
                    onClick={() => addNode("for")}
                  >
                    + For
                  </button>
                </div>
                <div>
                  <button
                    className="bg-[#0fd952] rounded-md mr-2 p-1 text-white border-2 border-black"
                    onClick={moveSprite}
                  >
                    Convert
                  </button>
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
        <div className="flex flex-col">
          <Game setGameScene={setGameScene} gameData={gameData.data} />
          <div className="border-gray-400 border-2 bg-gray-300 min-h-40 h-auto p-4 rounded-lg font-mono text-gray-700">
            <pre>{code}</pre>
          </div>
        </div>
      </div>
    </FlowContext.Provider>
  );
}

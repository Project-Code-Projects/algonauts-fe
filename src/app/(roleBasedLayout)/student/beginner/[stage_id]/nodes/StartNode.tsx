import { Handle, Position } from 'reactflow';


export default function StartNode({ data } : {data : { label: string}}) {

  return (
    <>
      <div className='flex justify-center items-center bg-[#D1FFE9] w-[5rem] h-[5rem] border-2 border-black border-solid'>
        <label htmlFor="text" className='text-4 text-black text-2xl'>{data.label}</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
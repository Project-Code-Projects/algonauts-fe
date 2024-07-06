declare module "react-typewriter-effect" {
  import React from "react";

  interface TypeWriterEffectProps {
    textStyle?: React.CSSProperties;
    startDelay?: number;
    cursorColor?: string;
    multiText?: string[];
    multiTextDelay?: number;
    typeSpeed?: number;
    loop?: boolean | number;
  }

  const TypeWriterEffect: React.FC<TypeWriterEffectProps>;

  export default TypeWriterEffect;
}

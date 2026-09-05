import React from "react";
import styled, { keyframes } from "styled-components";

/**
 * Soft warm haze — gentle blush / peach / gold washes that drift behind the
 * content, echoing sunlight on a linen desk. Very subtle on the cream base.
 * Tweak the colors below to retune the mood.
 */

const drift1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(6vw, 5vh) scale(1.12); }
`;
const drift2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1.08); }
  50%      { transform: translate(-7vw, 6vh) scale(1.2); }
`;
const drift3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(5vw, -6vh) scale(1.15); }
`;

const Layer = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  will-change: transform;
`;

const Peach = styled(Blob)`
  width: 48vw;
  height: 48vw;
  top: -10vh;
  left: -8vw;
  opacity: 0.5;
  background: radial-gradient(circle, #f6dcc0 0%, transparent 70%);
  animation: ${drift1} 34s ease-in-out infinite;
`;

const Blush = styled(Blob)`
  width: 40vw;
  height: 40vw;
  top: 30vh;
  right: -6vw;
  opacity: 0.4;
  background: radial-gradient(circle, #f3ddd4 0%, transparent 70%);
  animation: ${drift2} 40s ease-in-out infinite;
`;

const Gold = styled(Blob)`
  width: 36vw;
  height: 36vw;
  bottom: -8vh;
  left: 30vw;
  opacity: 0.35;
  background: radial-gradient(circle, #ecdcae 0%, transparent 70%);
  animation: ${drift3} 38s ease-in-out infinite;
`;

const Aurora = () => (
  <Layer aria-hidden="true">
    <Peach />
    <Blush />
    <Gold />
  </Layer>
);

export default Aurora;

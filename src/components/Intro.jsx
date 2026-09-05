import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Bio } from "../data/constants";

const firstName = (Bio.name || "Purvi").split(" ")[0];
const niceName =
  firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

/* ---------- shells ---------- */
const Root = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ffffff;
  perspective: 1500px;
`;

const Skip = styled.button`
  position: fixed;
  bottom: 22px;
  right: 24px;
  z-index: 2;
  background: transparent;
  border: none;
  color: #b7a488;
  font-size: 13px;
  letter-spacing: 0.5px;
  cursor: pointer;
  font-family: "Mulish", sans-serif;
  &:hover { color: #8c7350; }
`;

/* ---------- laptop ---------- */
const Laptop = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScreenWrap = styled(motion.div)`
  transform-origin: bottom center;
  transform-style: preserve-3d;
`;

const Bezel = styled.div`
  width: 340px;
  height: 214px;
  background: #2a2620;
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 18px 50px rgba(42, 38, 32, 0.35);
  @media (max-width: 480px) {
    width: 260px;
    height: 168px;
  }
`;

const glow = keyframes`
  from { box-shadow: inset 0 0 0px rgba(169,130,79,0); }
  to   { box-shadow: inset 0 0 40px rgba(169,130,79,0.18); }
`;

const ScreenInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background: linear-gradient(160deg, #f7f2e9 0%, #efe6d6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: ${glow} 1.2s ease forwards;
`;

const IntroText = styled(motion.div)`
  font-family: "Cormorant Garamond", serif;
  font-weight: 600;
  font-size: 30px;
  color: #35302a;
  text-align: center;
  padding: 0 14px;
  .brass { color: #a9824f; }
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Base = styled(motion.div)`
  width: 400px;
  height: 15px;
  margin-top: -1px;
  background: linear-gradient(180deg, #d7cbb6 0%, #b9a988 100%);
  border-radius: 3px 3px 12px 12px;
  box-shadow: 0 16px 30px rgba(42, 38, 32, 0.25);
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 5px;
    background: #a9977a;
    border-radius: 0 0 6px 6px;
  }
  @media (max-width: 480px) {
    width: 310px;
  }
`;

/* the cream panel that grows from the screen to fill the page */
const Fill = styled(motion.div)`
  position: fixed;
  background: linear-gradient(160deg, #f7f2e9 0%, #efe6d6 100%);
  z-index: 3;
`;

const Intro = ({ onDone }) => {
  const [stage, setStage] = useState("init");
  const [visible, setVisible] = useState(true);
  const [fillRect, setFillRect] = useState(null);
  const innerRef = useRef(null);

  const finish = () => {
    document.body.style.overflow = "";
    setVisible(false);
    if (onDone) onDone();
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      finish();
      return;
    }
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const timers = [];
    timers.push(setTimeout(() => setStage("in"), 150));
    timers.push(setTimeout(() => setStage("open"), 1050));
    timers.push(setTimeout(() => setStage("on"), 1900));
    timers.push(
      setTimeout(() => {
        const el = innerRef.current;
        if (el) setFillRect(el.getBoundingClientRect());
        setStage("zoom");
      }, 4300)
    );
    timers.push(setTimeout(() => setStage("gone"), 5300));
    timers.push(setTimeout(finish, 5950));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    const el = innerRef.current;
    if (el) setFillRect(el.getBoundingClientRect());
    setStage("zoom");
    setTimeout(() => setStage("gone"), 700);
    setTimeout(finish, 1200);
  };

  if (!visible) return null;

  const laptopVisible = stage !== "zoom" && stage !== "gone";

  return (
    <Root
      animate={{ opacity: stage === "gone" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {laptopVisible && (
        <Laptop
          initial={{ y: 80, scale: 0.6, opacity: 0 }}
          animate={
            stage === "init"
              ? { y: 80, scale: 0.6, opacity: 0 }
              : { y: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ScreenWrap
            initial={{ rotateX: -92 }}
            animate={{ rotateX: stage === "init" || stage === "in" ? -92 : 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          >
            <Bezel>
              <ScreenInner ref={innerRef}>
                {stage === "on" && (
                  <IntroText
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Typewriter
                      options={{
                        autoStart: true,
                        loop: false,
                        delay: 55,
                        cursor: "",
                      }}
                      onInit={(tw) => {
                        tw.typeString(`Hi, I am <span class="brass">${niceName}</span>`)
                          .start();
                      }}
                    />
                  </IntroText>
                )}
              </ScreenInner>
            </Bezel>
          </ScreenWrap>
          <Base
            animate={{ opacity: 1 }}
          />
        </Laptop>
      )}

      {fillRect && (stage === "zoom" || stage === "gone") && (
        <Fill
          initial={{
            top: fillRect.top,
            left: fillRect.left,
            width: fillRect.width,
            height: fillRect.height,
            borderRadius: 7,
          }}
          animate={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
          }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
        />
      )}

      {laptopVisible && <Skip onClick={skip}>Skip intro</Skip>}
    </Root>
  );
};

export default Intro;

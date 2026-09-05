import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import VoiceIntro from "../VoiceIntro";

/* ---------- animations ---------- */
const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const spin = keyframes`to { transform: rotate(360deg); }`;
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
`;

/* ---------- layout ---------- */
const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 90px 30px 70px;
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }
`;

const Left = styled.div`
  width: 100%;
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 960px) {
    justify-content: center;
    margin-bottom: 44px;
  }
`;

const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 64px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.05;
  margin: 0;
  @media (max-width: 960px) {
    font-size: 48px;
  }
`;

const Name = styled.span`
  background: linear-gradient(90deg, #a9824f, #d8bd8c, #8a6a3f, #c9a86f);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientMove} 6s linear infinite;
`;

const RoleLine = styled.div`
  font-family: 'Mulish', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  gap: 10px;
  margin-top: 14px;
  @media (max-width: 960px) {
    font-size: 19px;
    justify-content: center;
  }
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const SubTitle = styled.p`
  font-size: 16.5px;
  line-height: 1.8;
  margin: 26px 0 34px;
  max-width: 60ch;
  color: ${({ theme }) => theme.text_primary}cc;
  @media (max-width: 960px) {
    font-size: 15px;
    line-height: 1.7;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const Btn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: 40px;
  font-size: 15.5px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  ${({ $primary, theme }) =>
    $primary
      ? `
    color: ${theme.white};
    background: ${theme.primary};
    box-shadow: 0 6px 18px ${theme.primary}44;
    &:hover { box-shadow: 0 8px 26px ${theme.primary}66; }
  `
      : `
    color: ${theme.primary};
    background: transparent;
    border: 1.5px solid ${theme.primary}66;
    &:hover {
      background: ${theme.primary}14;
      box-shadow: 0 6px 20px ${theme.primary}33;
    }
  `}
`;

/* ---------- avatar with brass halo ---------- */
const AvatarWrap = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 6s ease-in-out infinite;
  @media (max-width: 640px) {
    max-width: 270px;
  }
`;

const Ring = styled.div`
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #a9824f,
    transparent 25%,
    transparent 75%,
    #d8bd8c
  );
  filter: blur(7px);
  opacity: 0.85;
  animation: ${spin} 12s linear infinite;
`;

const Glow = styled.div`
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: radial-gradient(circle, #a9824f2e 0%, transparent 70%);
`;

const Img = styled.img`
  position: relative;
  border-radius: 50%;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.white};
  box-shadow: 0 12px 30px rgba(53, 48, 42, 0.16);
`;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <div id="About">
      <HeroContainer>
        <HeroInnerContainer>
          <Left>
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.div variants={item}>
                <Title>
                  Hi, I am <br />
                  <Name>{Bio.name}</Name>
                </Title>
              </motion.div>

              <motion.div variants={item}>
                <RoleLine>
                  I am a
                  <Accent>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Accent>
                </RoleLine>
              </motion.div>

              <motion.div variants={item}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>

              <motion.div variants={item}>
                <Buttons>
                  <VoiceIntro />
                  <Btn
                    $primary
                    href={Bio.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaFileDownload /> Resume
                  </Btn>
                  <Btn
                    href={Bio.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaGithub /> GitHub
                  </Btn>
                  <Btn
                    href={Bio.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaLinkedin /> LinkedIn
                  </Btn>
                </Buttons>
              </motion.div>
            </motion.div>
          </Left>

          <Right>
            <AvatarWrap
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Ring />
              <Glow />
              <Img src={Bio.image} alt={Bio.name} />
            </AvatarWrap>
          </Right>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default Hero;

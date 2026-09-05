import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";

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
  padding: 80px 30px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
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
    margin-bottom: 40px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    font-size: 40px;
    line-height: 48px;
  }
`;

const Name = styled.span`
  background: linear-gradient(90deg, #7f9fff, #c3d0ff, #7f9fff, #a1a9ff);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientMove} 5s linear infinite;
`;

const RoleLine = styled.div`
  font-weight: 600;
  font-size: 30px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  gap: 10px;
  margin-top: 6px;
  @media (max-width: 960px) {
    font-size: 22px;
    justify-content: center;
  }
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  font-size: 18px;
  line-height: 30px;
  margin: 28px 0 32px;
  max-width: 560px;
  color: ${({ theme }) => theme.text_primary + "cc"};
  @media (max-width: 960px) {
    font-size: 15px;
    line-height: 26px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 16px;
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
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;

  ${({ $primary, theme }) =>
    $primary
      ? `
    color: ${theme.black};
    background: ${theme.primary};
    box-shadow: 0 0 18px ${theme.primary}66;
    &:hover { box-shadow: 0 0 28px ${theme.primary}; }
  `
      : `
    color: ${theme.primary};
    background: transparent;
    border: 1.5px solid ${theme.primary}80;
    &:hover {
      background: ${theme.primary}1a;
      box-shadow: 0 0 22px ${theme.primary}55;
    }
  `}
`;

/* ---------- avatar with orbiting glow ---------- */
const AvatarWrap = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 6s ease-in-out infinite;
  @media (max-width: 640px) {
    max-width: 280px;
  }
`;

const Ring = styled.div`
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #7f9fff,
    transparent 25%,
    transparent 75%,
    #7f9fff
  );
  filter: blur(6px);
  animation: ${spin} 9s linear infinite;
`;

const Glow = styled.div`
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: radial-gradient(circle, #7f9fff33 0%, transparent 70%);
`;

const Img = styled.img`
  position: relative;
  border-radius: 50%;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.bg};
`;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
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

import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaVolumeUp, FaStop } from "react-icons/fa";
import { Bio } from "../data/constants";

/**
 * A "Hear intro" button.
 *
 * By default it uses the browser's built-in voice (Web Speech API) to speak a
 * short intro — no audio file needed, works instantly.
 *
 * TO USE YOUR OWN RECORDED VOICE INSTEAD:
 *   1. Record a short intro and save it as an mp3.
 *   2. Put the file in the `public/` folder, e.g. public/intro.mp3
 *   3. Change AUDIO_SRC below to "/intro.mp3"
 * That's it — it will play your recording instead of the robotic voice.
 */
const AUDIO_SRC = null; // e.g. "/intro.mp3"

// Build a friendly spoken line from your Bio data.
const firstName = Bio.name.split(" ")[0];
const niceName =
  firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
const cleanRole = (r) => (r ? r.replace(/\.$/, "") : "");
const role1 = cleanRole(Bio.roles?.[0]) || "developer";
const role2 = cleanRole(Bio.roles?.[2]) || cleanRole(Bio.roles?.[1]) || "";

const SPEECH_TEXT =
  `Hi, I'm ${niceName}, a ${role1}` +
  (role2 ? ` and ${role2}` : "") +
  `. Welcome to my portfolio. Feel free to explore my projects, and let's build something great together.`;

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(169,130,79,0.55); }
  70%  { box-shadow: 0 0 0 14px rgba(169,130,79,0); }
  100% { box-shadow: 0 0 0 0 rgba(169,130,79,0); }
`;

const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card_light + "66"};
  border: 1.5px solid ${({ theme }) => theme.primary}80;
  transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.primary}1a;
    box-shadow: 0 0 22px ${({ theme }) => theme.primary}55;
  }

  ${({ $speaking }) =>
    $speaking &&
    css`
      animation: ${pulse} 1.4s infinite;
    `}
`;

const VoiceIntro = () => {
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef(null);

  const ttsSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  // Preload voices (some browsers load them async).
  useEffect(() => {
    if (ttsSupported) window.speechSynthesis.getVoices();
    return () => {
      if (ttsSupported) window.speechSynthesis.cancel();
      if (audioRef.current) audioRef.current.pause();
    };
  }, [ttsSupported]);

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (ttsSupported) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const play = () => {
    // Option A: play a recorded audio file if one is configured.
    if (AUDIO_SRC) {
      if (!audioRef.current) {
        audioRef.current = new Audio(AUDIO_SRC);
        audioRef.current.onended = () => setSpeaking(false);
      }
      audioRef.current.play();
      setSpeaking(true);
      return;
    }

    // Option B: browser text-to-speech.
    if (!ttsSupported) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(SPEECH_TEXT);
    utter.rate = 1;
    utter.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /en(-|_)?(US|GB)/i.test(v.lang)) ||
      voices.find((v) => v.lang && v.lang.startsWith("en"));
    if (preferred) utter.voice = preferred;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  // Nothing to play with: hide the button entirely.
  if (!AUDIO_SRC && !ttsSupported) return null;

  return (
    <Btn
      type="button"
      onClick={speaking ? stop : play}
      $speaking={speaking}
      aria-label={speaking ? "Stop intro" : "Hear my intro"}
    >
      {speaking ? <FaStop /> : <FaVolumeUp />}
      {speaking ? "Stop" : "Hear intro"}
    </Btn>
  );
};

export default VoiceIntro;

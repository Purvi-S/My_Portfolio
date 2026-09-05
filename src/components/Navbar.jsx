import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Bio } from "../data/constants";
import { FaGithub, FaRegFileAlt, FaBars, FaTimes } from "react-icons/fa";

const navOptions = [
  { label: "About", id: "About" },
  { label: "Skills", id: "Skills" },
  { label: "Experience", id: "Experience" },
  { label: "Projects", id: "Projects" },
  { label: "Education", id: "Education" },
  { label: "Contact", id: "Contact" },
];

/* ============ Desktop side rail (slim) ============ */
const Rail = styled.nav`
  position: fixed;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px 14px;
  border-radius: 30px;
  background: rgba(251, 248, 242, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(169, 130, 79, 0.22);
  box-shadow: 0 10px 28px rgba(53, 48, 42, 0.14);

  @media (max-width: 900px) {
    display: none;
  }
`;

const DotGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  /* thread linking the dots */
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 6px;
    bottom: 6px;
    width: 1.5px;
    transform: translateX(-50%);
    background: linear-gradient(
      ${({ theme }) => theme.primary}66,
      ${({ theme }) => theme.primary}22
    );
  }
`;

const Label = styled.span`
  position: absolute;
  left: calc(100% + 14px);
  top: 50%;
  transform: translateY(-50%) translateX(-6px);
  font-family: "Cormorant Garamond", serif;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  padding: 4px 14px;
  border-radius: 20px;
  background: rgba(251, 248, 242, 0.95);
  border: 1px solid rgba(169, 130, 79, 0.2);
  box-shadow: 0 6px 18px rgba(53, 48, 42, 0.12);
  color: ${({ theme }) => theme.primary};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
  ${({ $active }) =>
    $active &&
    css`
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    `}
`;

const Dot = styled.span`
  position: relative;
  z-index: 1;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};
  background: ${({ $active, theme }) => ($active ? theme.primary : theme.card)};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  ${({ $active, theme }) =>
    $active &&
    css`
      box-shadow: 0 0 0 4px ${theme.primary}30, 0 0 10px ${theme.primary};
    `}
`;

const Item = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;

  &:hover ${Dot} {
    transform: scale(1.3);
  }
  &:hover ${Label} {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
`;

const Divider = styled.span`
  width: 22px;
  height: 1px;
  background: ${({ theme }) => theme.primary}33;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  color: ${({ theme }) => theme.text_secondary};
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.2);
  }
`;

/* ============ Mobile drawer ============ */
const Burger = styled.button`
  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 42;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(169, 130, 79, 0.25);
  border-radius: 50%;
  background: rgba(251, 248, 242, 0.85);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  cursor: pointer;
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(42, 38, 32, 0.35);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const Drawer = styled.nav`
  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 41;
  width: 240px;
  flex-direction: column;
  gap: 4px;
  padding: 84px 26px 26px;
  background: rgba(251, 248, 242, 0.97);
  backdrop-filter: blur(14px);
  border-right: 1px solid rgba(169, 130, 79, 0.2);
  box-shadow: 12px 0 40px rgba(53, 48, 42, 0.16);
  transform: translateX(${({ $open }) => ($open ? "0" : "-105%")});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DrawerLink = styled.a`
  font-family: "Cormorant Garamond", serif;
  font-size: 26px;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 0 8px 12px;
  color: ${({ $active, theme }) =>
    $active ? theme.primary : theme.text_primary};
  border-left: 2px solid
    ${({ $active, theme }) => ($active ? theme.primary : "transparent")};
  transition: color 0.25s ease, border-color 0.25s ease;
`;

const DrawerButtons = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DrawerBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid ${({ theme }) => theme.primary}66;
  color: ${({ theme }) => theme.primary};
`;

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("About");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const nav of navOptions) {
        const section = document.getElementById(nav.id);
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveTab(nav.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (id) => {
    setActiveTab(id);
    setOpen(false);
  };

  return (
    <>
      <Rail aria-label="Section navigation">
        <DotGroup>
          {navOptions.map((nav) => (
            <Item
              key={nav.id}
              href={`#${nav.id}`}
              onClick={() => go(nav.id)}
              aria-current={activeTab === nav.id ? "true" : undefined}
            >
              <Dot $active={activeTab === nav.id} />
              <Label $active={activeTab === nav.id}>{nav.label}</Label>
            </Item>
          ))}
        </DotGroup>
        <Divider />
        <IconLink href={Bio.resume} target="_blank" rel="noopener noreferrer" title="Resume">
          <FaRegFileAlt />
        </IconLink>
        <IconLink href={Bio.github} target="_blank" rel="noopener noreferrer" title="GitHub">
          <FaGithub />
        </IconLink>
      </Rail>

      <Burger onClick={() => setOpen((o) => !o)} aria-label="Menu">
        {open ? <FaTimes /> : <FaBars />}
      </Burger>
      <Overlay $open={open} onClick={() => setOpen(false)} />
      <Drawer $open={open} aria-label="Section navigation">
        {navOptions.map((nav) => (
          <DrawerLink
            key={nav.id}
            href={`#${nav.id}`}
            $active={activeTab === nav.id}
            onClick={() => go(nav.id)}
          >
            {nav.label}
          </DrawerLink>
        ))}
        <DrawerButtons>
          <DrawerBtn href={Bio.resume} target="_blank" rel="noopener noreferrer">
            <FaRegFileAlt /> Resume
          </DrawerBtn>
          <DrawerBtn href={Bio.github} target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </DrawerBtn>
        </DrawerButtons>
      </Drawer>
    </>
  );
};

export default Navbar;

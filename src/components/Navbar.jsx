import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bio } from "../data/constants";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SegmentedNav = styled.div`
  display: flex;
  padding: 4px;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 24px;
  background-color: transparent;
  gap: 4px;
`;

const SegmentedItem = styled.a`
  background-color: ${({ active, theme }) => (active ? theme.primary : "transparent")};
  color: ${({ active, theme }) => (active ? theme.text_primary : theme.primary)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const GithubButton = styled.a`
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 13px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ResumeButton = styled.a`
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("about");

  const navOptions = [
    { label: "About", id: "About" },
    { label: "Skills", id: "Skills" },
    { label: "Experience", id: "Experience" },
    { label: "Projects", id: "Projects" },
    { label: "Education", id: "Education" },
    { label: "Contact", id: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navOptions.map((section) => document.getElementById(section.id));
      const scrollPosition = window.scrollY + 100;
      for (let section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveTab(section.id.toLowerCase());
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Nav>
      <NavbarContainer>
        <SegmentedNav>
          {navOptions.map((nav) => (
            <SegmentedItem
              key={nav.label}
              href={`#${nav.id}`}
              active={activeTab === nav.id.toLowerCase()}
            >
              {nav.label.toUpperCase()}
            </SegmentedItem>
          ))}
        </SegmentedNav>
        <ButtonContainer>
          <ResumeButton href={Bio.resume} target="_blank">
            CHECK RESUME
          </ResumeButton>
          <GithubButton href={Bio.github} target="_blank">
            GITHUB PROFILE
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;

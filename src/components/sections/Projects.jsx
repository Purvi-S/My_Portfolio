import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import { FaGithub } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
  padding-top: 80px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleButtonGroup = styled.div`
  display: inline-flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  padding: 4px 8px;
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 500;
  margin: 22px auto;         /* center horizontally */
  justify-content: center;
  align-items: center;
  gap: 0;
  width: fit-content;        /* shrink to fit content width */
  max-width: 100%;           /* but don’t overflow container */
  box-sizing: border-box;    /* include padding in width */
  
  @media (max-width: 768px) {
    font-size: 12px;
    flex-wrap: wrap;         /* allow buttons to wrap on small screens */
    gap: 4px;                /* small gap when wrapped */
  }
`;


const ToggleButton = styled.div`
  padding: 6px 14px;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + "20"};
  }
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.primary};
    color: white;
    font-weight: 700;
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  height: 60%;
  background: ${({ theme }) => theme.primary};
  margin: 0 8px;
  align-self: center;
`;

const ProjectsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1100px;

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectItem = styled.div`
  background: ${({ theme }) => theme.card || "#121212"};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.6);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 360px;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
`;

const ProjectDate = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 12px;
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  flex-grow: 1;
  white-space: normal;
  margin-bottom: 16px;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.primary + "33"};
  color: ${({ theme }) => theme.primary};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
`;

const LinkButton = styled.a`
  margin-top: auto;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid ${({ theme }) => theme.primary};
  padding: 8px 16px;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

// Project card with GitHub and optional Demo links
const ProjectInline = ({ project }) => (
  <ProjectItem>
    <ProjectImage src={project.image} alt={project.title} />
    <ProjectTitle>{project.title}</ProjectTitle>
    <ProjectDate>{project.date}</ProjectDate>
    <ProjectDescription>{project.description}</ProjectDescription>
    <ProjectTags>
      {project.tags.map((tag, i) => (
        <Tag key={i}>{tag}</Tag>
      ))}
    </ProjectTags>
    <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
      {project.github && (
        <LinkButton href={project.github} target="_blank" rel="noopener noreferrer">
          <FaGithub />
          View Code on GitHub
        </LinkButton>
      )}
      {project.demo && (
        <LinkButton href={project.demo} target="_blank" rel="noopener noreferrer">
          Live Demo
        </LinkButton>
      )}
    </div>
  </ProjectItem>
);

const Projects = () => {
  const [toggle, setToggle] = useState("all");

  const filteredProjects =
    toggle === "all" ? projects : projects.filter((p) => p.category === toggle);

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          My academic experience includes building multiple web-based projects, each tackling different real-world challenges through practical implementation.
        </Desc>

        <ToggleButtonGroup>
          <ToggleButton active={toggle === "all"} onClick={() => setToggle("all")}>
            ALL
          </ToggleButton>
          <Divider />

          <ToggleButton active={toggle === "machine learning"} onClick={() => setToggle("machine learning")}>
            MACHINE LEARNING
          </ToggleButton>
          <Divider />
          
          <ToggleButton active={toggle === "data science"} onClick={() => setToggle("data science")}>
            DATA SCIENCE
          </ToggleButton>
        </ToggleButtonGroup>

        <ProjectsRow>
          {filteredProjects.map((project, idx) => (
            <ProjectInline key={idx} project={project} />
          ))}
        </ProjectsRow>
      </Wrapper>
    </Container>
  );
};

export default Projects;

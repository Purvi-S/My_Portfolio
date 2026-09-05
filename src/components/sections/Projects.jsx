import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { projects } from "../../data/constants";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

/* ---------- Filter definition (order = display order) ---------- */
const FILTERS = [
  { key: "all", label: "All" },
  { key: "backend", label: "Backend & APIs" },
  { key: "devops", label: "DevOps & Cloud" },
  { key: "ai", label: "AI / ML" },
  { key: "data", label: "Data & Analytics" },
];

/* ---------- Animations ---------- */
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-120%) skewX(-18deg); }
  100% { transform: translateX(220%) skewX(-18deg); }
`;

/* ---------- Layout ---------- */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px 40px;
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

const Title = styled.h2`
  font-size: 52px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.5px;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 34px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  font-weight: 500;
  max-width: 640px;
  margin: 6px auto 8px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

/* ---------- Filter bar ---------- */
const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 24px auto 36px;
`;

const FilterPill = styled.button`
  position: relative;
  border: 1.5px solid ${({ theme, $active }) => ($active ? "transparent" : theme.primary + "55")};
  background: transparent;
  color: ${({ theme, $active }) => ($active ? theme.white : theme.text_secondary)};
  font-size: 14px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: 999px;
  cursor: pointer;
  outline: none;
  transition: color 0.25s ease, border-color 0.25s ease;
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    border-color: ${({ theme }) => theme.primary};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 7px 13px;
  }
`;

const PillGlow = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #8a6a3f);
  box-shadow: 0 6px 22px ${({ theme }) => theme.primary}66;
  z-index: -1;
`;

const Count = styled.span`
  margin-left: 7px;
  font-size: 11px;
  opacity: 0.8;
`;

/* ---------- Grid ---------- */
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/* ---------- Card ---------- */
const Card = styled(motion.article)`
  position: relative;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary}22;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  will-change: transform;
  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.primary}88;
    box-shadow: 0 18px 48px -12px ${({ $c1 }) => $c1}66,
      0 0 0 1px ${({ theme }) => theme.primary}33;
  }
`;

const Cover = styled.div`
  position: relative;
  height: 150px;
  overflow: hidden;
  background: linear-gradient(135deg, ${({ $c1 }) => $c1}, ${({ $c2 }) => $c2});
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.28), transparent 45%),
      radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.25), transparent 55%);
  }
  /* shimmer sweep on hover */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 45%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    opacity: 0;
  }
  ${Card}:hover &::after {
    opacity: 1;
    animation: ${shimmer} 0.9s ease;
  }
`;

const CoverIcon = styled.div`
  font-size: 54px;
  line-height: 1;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35));
  z-index: 1;
  ${Card}:hover & {
    animation: ${float} 2.4s ease-in-out infinite;
  }
`;

const Watermark = styled.span`
  position: absolute;
  right: 12px;
  bottom: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
  z-index: 1;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 18px 18px 20px;
  gap: 10px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 19px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
`;

const DateChip = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.85;
`;

const CardDesc = styled.p`
  margin: 2px 0 4px;
  font-size: 14px;
  line-height: 1.55;
  color: ${({ theme }) => theme.text_secondary};
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 2px;
`;

const Tag = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary}18;
  border: 1px solid ${({ theme }) => theme.primary}22;
  padding: 4px 10px;
  border-radius: 999px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 6px;
`;

const LinkButton = styled.a`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  border: 1.5px solid ${({ theme }) => theme.primary};
  padding: 9px 14px;
  border-radius: 10px;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.15s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.black};
  }
  &:active {
    transform: scale(0.97);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
`;

const Empty = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  padding: 40px 0;
`;

/* ---------- Card component ---------- */
const ProjectCard = ({ project, reduce }) => {
  const [c1, c2] = project.accent || ["#c2a06a", "#8a6a3f"];
  return (
    <Card
      layout
      $c1={c1}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Cover $c1={c1} $c2={c2}>
        <CoverIcon>{project.icon || "🚀"}</CoverIcon>
        {project.tags?.[0] && <Watermark>{project.tags[0]}</Watermark>}
      </Cover>
      <Body>
        <CardTitle>{project.title}</CardTitle>
        <DateChip>{project.date}</DateChip>
        <CardDesc>{project.description}</CardDesc>
        <Tags>
          {project.tags?.slice(0, 6).map((t, i) => (
            <Tag key={i}>{t}</Tag>
          ))}
        </Tags>
        <Actions>
          {project.github && (
            <LinkButton href={project.github} target="_blank" rel="noopener noreferrer">
              <FaGithub /> View Code
            </LinkButton>
          )}
          {project.demo && (
            <LinkButton href={project.demo} target="_blank" rel="noopener noreferrer">
              <FiExternalLink /> Live Demo
            </LinkButton>
          )}
        </Actions>
      </Body>
    </Card>
  );
};

/* ---------- Section ---------- */
const Projects = () => {
  const [active, setActive] = useState("all");
  const reduce = useReducedMotion();

  const counts = useMemo(() => {
    const c = { all: projects.length };
    projects.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1;
    });
    return c;
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          Production backend services, DevOps and cloud automation, plus AI and data work -
          filter by focus area to explore what I build.
        </Desc>

        <LayoutGroup>
          <FilterBar role="tablist" aria-label="Filter projects by category">
            {FILTERS.map((f) => {
              const count = counts[f.key] || 0;
              const isActive = active === f.key;
              return (
                <FilterPill
                  key={f.key}
                  role="tab"
                  aria-selected={isActive}
                  $active={isActive}
                  onClick={() => setActive(f.key)}
                >
                  {isActive && (
                    <PillGlow
                      layoutId="pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f.label}
                  <Count>{count}</Count>
                </FilterPill>
              );
            })}
          </FilterBar>

          <Grid layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} reduce={reduce} />
              ))}
              {filtered.length === 0 && (
                <Empty key="empty">No projects in this category yet.</Empty>
              )}
            </AnimatePresence>
          </Grid>
        </LayoutGroup>
      </Wrapper>
    </Container>
  );
};

export default Projects;
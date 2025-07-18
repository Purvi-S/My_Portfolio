import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 330px;
  height: 535px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  border-radius: 10px;
  padding: 0;
  display: block;
  background-color: transparent;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + "15"};
  padding: 2px 8px;
  border-radius: 10px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + "80"};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + "99"};
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: ${({ lines }) => lines || 5};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Button = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1.5px solid ${({ theme }) => theme.primary};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
  margin-top: auto;
`;

const ProjectCard = ({ project }) => {
  const descriptionLines = project.member && project.member.length > 0 ? 3 : 5;

  return (
    <Card>
      <ImageWrapper>
        <Image src={project.image} alt={project.title} />
      </ImageWrapper>
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={`tag-${index}`}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description lines={descriptionLines}>{project.description}</Description>
      </Details>
      {(project.github || project.webapp) && (
        <ButtonContainer>
          {project.github && (
            <Button href={project.github} target="_blank" rel="noopener noreferrer">
              View Code
            </Button>
          )}
          {project.webapp && (
            <Button href={project.webapp} target="_blank" rel="noopener noreferrer">
              Visit Site
            </Button>
          )}
        </ButtonContainer>
      )}
    </Card>
  );
};

export default ProjectCard;

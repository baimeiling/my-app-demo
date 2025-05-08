import React from 'react';
import styled from 'styled-components';
import { RecommendationCard } from '../types/post';
import { rem } from '../utils/rem';

const CardContainer = styled.div`
  margin-bottom: ${rem(16)};
  border-radius: ${rem(8)};
  overflow: hidden;
  box-shadow: 0 ${rem(2)} ${rem(8)} rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #ff9500, #ff5e3a);
  color: white;
  padding: ${rem(16)};
  position: relative;
  aspect-ratio: 1/1.2;

  &::before {
    content: '推荐';
    position: absolute;
    top: ${rem(12)};
    left: ${rem(12)};
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: ${rem(4)} ${rem(8)};
    border-radius: ${rem(4)};
    font-size: ${rem(12)};
    z-index: 1;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: ${rem(120)};
  border-radius: ${rem(4)};
  margin-bottom: ${rem(12)};
  object-fit: cover;
`;

const CardTitle = styled.h3`
  margin: 0 0 ${rem(8)} 0;
  font-size: ${rem(18)};
`;

const CardDescription = styled.p`
  margin: 0 0 ${rem(12)} 0;
  font-size: ${rem(14)};
  opacity: 0.9;
`;

const ActionButton = styled.a`
  display: inline-block;
  padding: ${rem(8)} ${rem(16)};
  background: white;
  color: #ff5e3a;
  border-radius: ${rem(20)};
  text-decoration: none;
  font-weight: bold;
  font-size: ${rem(14)};
`;

interface RecommendationCardProps {
  card: RecommendationCard;
}

const RecommendationCardComponent: React.FC<RecommendationCardProps> = ({ card }) => {
  return (
    <CardContainer>
      {/* <CardImage src={card.imageUrl} alt={card.title} /> */}
      <CardTitle>{card.title}</CardTitle>
      <CardDescription>{card.description}</CardDescription>
      <ActionButton href={card.actionUrl}>{card.actionText}</ActionButton>
    </CardContainer>
  );
};

export default RecommendationCardComponent;
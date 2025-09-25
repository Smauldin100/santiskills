import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const TrackersPage = () => {
  return (
    <PageContainer>
      <Title>Trackers</Title>
      <p>This page will display your trackers.</p>
      {/* Add your tracker components here */}
    </PageContainer>
  );
};

export default TrackersPage;

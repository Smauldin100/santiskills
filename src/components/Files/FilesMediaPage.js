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

const FilesMediaPage = () => {
  return (
    <PageContainer>
      <Title>Files & Media</Title>
      <p>This page will display your files and media.</p>
      {/* Add your file/media listing component here */}
    </PageContainer>
  );
};

export default FilesMediaPage;

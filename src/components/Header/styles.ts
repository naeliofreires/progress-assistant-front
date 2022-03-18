import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 600px) {
    justify-content: space-between;
  }
`;

export const NextImage = styled(Image)``;

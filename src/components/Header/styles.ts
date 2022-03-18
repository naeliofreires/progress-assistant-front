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

  div.amount-task-view {
    display: none;

    padding: 8px;
    border-radius: 8px;
    background: #e5efc1;
    span {
      font-weight: bold;
      margin-right: 8px;
    }
  }

  @media (min-width: 600px) {
    justify-content: space-between;

    div.amount-task-view {
      display: flex;
    }
  }
`;

export const NextImage = styled(Image)``;

import styled from 'styled-components';
import NextImage from 'next/image';

export const Image = styled(NextImage)``;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 8px;

  > div.amount-task-view {
    display: none;
  }

  > div.plus-button-view {
    width: 100%;
    height: 100%;
  }

  > div.plus-button-view button {
    background: transparent;
    border: 1px solid #557b83;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }

  @media (min-width: 600px) {
    > div.amount-task-view {
      padding: 8px;
      border-radius: 8px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    > div.amount-task-view span {
      font-weight: bold;
      margin-right: 8px;
    }
  }
`;

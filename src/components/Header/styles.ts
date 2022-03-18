import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: 16px;
    border: 1px solid white;
    border-radius: 10px;
    background: #ededed;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

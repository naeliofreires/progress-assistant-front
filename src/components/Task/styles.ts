import styled from 'styled-components';

export const Container = styled.div`
  background: #ededed;
  display: flex;
  margin-bottom: 8px;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid white;
`;

export const InnerContainerLeft = styled.div`
  flex: 1;
  max-width: 50%;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    cursor: pointer;
    border: none;
    background: transparent;
  }
`;

export const InnerContainerRight = styled.div`
  flex: 2;
  display: flex;
  padding: 8px;
  align-items: center;

  span {
    font-size: 12px;
  }
`;

export const ActionsView = styled.div`
  border-left: 1px solid;
  margin-left: 8px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

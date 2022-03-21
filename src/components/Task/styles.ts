import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  overflow: hidden;
  background: #ffffff;
  margin-bottom: 12px;

  padding: 8px;
  border-width: 2px;
  border-color: #a4a4a4;
  border-style: dotted;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span.title {
    color: #151515;
    font-size: 18px;
  }
`;

export const IconView = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 8px;
`;

export const InnerContainerLeft = styled.div`
  flex: 1;
  max-width: 50%;

  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const InnerContainerRight = styled.div`
  flex: 2;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

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

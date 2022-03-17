import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 16px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  div.current-page-value-view,
  div.previous-page-button-view,
  div.next-page-button-view {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > button {
    margin: 0 8px;
    padding: 3px 8px;
    background: transparent;
    border-radius: 10px;
    border: 1px solid #ccbcbc;
  }
`;

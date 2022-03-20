import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 12px 0;
  margin-top: 16px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  div.current-page-value-view,
  div.previous-page-button-view,
  div.next-page-button-view {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

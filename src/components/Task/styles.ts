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

export const CheckIconView = styled.div<{ checked?: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.checked ? '#a2d5ab' : '#ededed')};
  border-radius: 18px;
  margin-right: 8px;
`;

export const TaskIconView = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 8px;
`;

export const CalendarView = styled.div`
  display: flex;
  align-items: center;

  span.task-date {
    color: #000000b5;
    font-size: 12px;
    font-weight: 700;
    margin-left: 8px;
  }
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
`;

export const ActionsView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 8px;
  border-radius: 8px;
  background: #ededed;

  margin-left: 12px;
`;

export const DeleteAlertContainer = styled.div`
  position: relative;
  padding: 16px;
  background: white;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  z-index: 1;

  span {
    width: 80%;
    background: rgba(222, 221, 221, 0.58);
    text-align: center;
    margin: 16px auto 16px;
    display: block;
    padding: 8px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 18px;
  }

  div.actions-view {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  div.actions-view button {
    margin-bottom: 8px;
    text-transform: capitalize;
  }

  div.actions-view button {
    font-size: 12px;
    padding: 8px;
    border: 0;
    border-radius: 18px;
    color: white;
    background: #d74c4c;
    text-transform: uppercase;
  }

  div.actions-view button[name='save'] {
    background: #6ed580;
  }

  div.actions-view button[name='cancel'] {
    background: #d74c4c;
  }
`;

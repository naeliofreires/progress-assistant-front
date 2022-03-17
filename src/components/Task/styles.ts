import styled from 'styled-components';
import { CompletedViewType } from './types';

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

export const CompletedView = styled.div(({ completed }: CompletedViewType) => ({
  width: 25,
  height: 25,
  background: completed ? '#4bd723' : '#c7ccc6',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 16,
}));

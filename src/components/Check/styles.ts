import styled from 'styled-components';
import { CompletedViewType } from './types';

export const CompletedView = styled.div(({ checked }: CompletedViewType) => ({
  width: 25,
  height: 25,
  background: checked ? '#4bd723' : '#c7ccc6',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 16,
}));

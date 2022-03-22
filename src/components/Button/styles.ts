import styled, { css } from 'styled-components';

const selectedStyle = css`
  color: white;
  background-color: #557b83;
  border: 1px solid #ffffff;
`;

const unselectedStyle = css`
  color: #557b83;
  background-color: white;
  border: 1px solid #557b83;
`;

export const Container = styled.button<{ selected?: boolean }>`
  min-width: 45px;
  padding: 4px 12px;
  border-radius: 5px;
  text-transform: capitalize;
  ${(p) => (p.selected ? selectedStyle : unselectedStyle)}
`;

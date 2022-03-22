import styled from 'styled-components';
import NextImage from 'next/image';

export const Image = styled(NextImage)``;

export const Container = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column-reverse;

  div.actions-view {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:first-child {
      margin-left: 0;
    }

    button {
      margin: 0 5px;
    }
  }

  div.actions-view button {
    &:nth-child(1) {
      margin-left: 0;
    }
  }

  div.search-view {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  div.search-view div.search-input-view {
    height: 28px;
    border-radius: 5px;
    padding-left: 8px;
    margin-left: 16px;
    border: 1px solid #557b83;
  }

  div.search-view div.search-input-view {
    display: flex;
    align-items: center;
  }

  div.search-view div.search-input-view {
    flex-grow: 1;
  }

  div.search-view div.search-input-view input {
    width: 100%;
    margin-right: 16px;
  }

  /**
    * @Desktop
   */
  @media (min-width: 500px) {
    flex-direction: row;

    div.actions-view {
      padding-right: 8px;
      border-color: #557b83;
      border-right-width: 3px;
      border-right-style: dotted;
    }

    div.search-view div.search-input-view input {
      margin-left: 16px;
    }
  }
`;

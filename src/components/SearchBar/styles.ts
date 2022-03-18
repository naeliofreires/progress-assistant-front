import styled from 'styled-components';
import NextImage from 'next/image';

export const Image = styled(NextImage)``;

export const Container = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column-reverse;

  .selected {
    color: white;
    background-color: #557b83;
    text-transform: uppercase;
    border: 1px solid #ffffff;
  }

  .unselected {
    color: #557b83;
    background-color: white;
    text-transform: uppercase;
    border: 1px solid #557b83;
  }

  div.actions-view {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  div.actions-view button {
    min-width: 45px;
    margin: 0 8px;
    padding: 3px 12px;
    border-radius: 5px;

    &:nth-child(1) {
      margin-left: 0;
    }
  }

  div.search-view {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      display: flex;
      align-items: center;
    }

    div input {
      border-radius: 5px;
      padding: 4px 8px;
      border: 1px solid #557b83;
    }
  }

  div.search-view div.search-input-view {
    flex-grow: 1;
  }

  div.search-view div.search-input-view input {
    width: 100%;
    margin: 8px 0;
  }

  div.search-view div.amount-task-view {
    display: none;
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

  @media (min-width: 600px) {
    div.search-view div.amount-task-view {
      display: flex;
      padding: 8px;
      border-radius: 8px;
    }

    div.search-view div.amount-task-view span {
      font-weight: bold;
      margin-right: 8px;
    }
  }
`;

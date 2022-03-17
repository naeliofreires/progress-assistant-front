import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 10px;
  border-bottom: 1px solid #444242;

  form,
  input,
  div.form-actions,
  button {
    width: 100%;
  }

  div.form-actions {
    padding: 8px;

    button {
      border: none;
      margin: 5px 0;
      padding: 5px 0;
      border-radius: 20px;
      text-transform: uppercase;
    }

    button[name='add'] {
      background-color: #0eb67d;
    }

    button[name='cancel'] {
      background-color: #f12049;
    }
  }

  form,
  form label {
    display: flex;
  }

  form {
    padding: 0 20px;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    label {
      padding: 8px;
      align-items: center;
      text-transform: uppercase;
    }
  }

  form > input[type='text'],
  form > input[type='date'] {
    margin: 5px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ededed;
  }

  form > button {
    padding: 8px;
    border: 1px solid #ededed;
    border-radius: 8px;
    text-transform: uppercase;
    background-color: gainsboro;
  }
`;

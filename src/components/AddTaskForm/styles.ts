import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1;
  form,
  input,
  div.form-actions,
  button {
    width: 100%;
  }

  > div.inner-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 350px;
    padding: 0 8px 16px;
    border-radius: 18px;
    background: whitesmoke;
    border: 1px solid #a2d5ab;
    box-shadow: 8px 8px 0 rgba(203, 203, 203, 0.48);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  form label {
    display: flex;
    padding: 8px;
    align-items: center;
    text-transform: uppercase;
  }

  form > input[type='text'],
  form > input[type='date'] {
    margin: 5px;
    padding: 8px;
    border-radius: 8px;

    border: 1px solid #39aea9;
  }

  div.form-actions button {
    border: none;
    padding: 5px 0;
    border-radius: 20px;
    text-transform: uppercase;
  }

  div.form-actions button[name='add'] {
    color: white;
    margin: 10px 0;
    background-color: #39aea9;
  }

  div.form-actions button[name='cancel'] {
    color: white;
    background-color: #557b83;
  }

  div.lottie-loading {
    z-index: 1;
    width: 100%;
    height: 100px;
    padding-top: 8px;
  }
`;

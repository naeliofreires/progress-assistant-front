import { render, screen } from '@testing-library/react';
import { NewTask } from '.';

const onSubmitCallback = jest.fn();
const onCancelCallback = jest.fn();

describe('NewTask', () => {
  it('should render a form', () => {
    render(
      <NewTask
        onSubmitCallback={onSubmitCallback}
        onCancelCallback={onCancelCallback}
      />
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render a input type equals text and name=title and must be required', () => {
    render(
      <NewTask
        onSubmitCallback={onSubmitCallback}
        onCancelCallback={onCancelCallback}
      />
    );

    const input = screen.getByPlaceholderText('Title');

    expect(input).toHaveProperty('name', 'title');
    expect(input).toHaveProperty('type', 'text');
    expect(input).toHaveProperty('required', true);
  });

  it('should render a input type equals text and name=description and must be required', () => {
    render(
      <NewTask
        onSubmitCallback={onSubmitCallback}
        onCancelCallback={onCancelCallback}
      />
    );

    const input = screen.getByPlaceholderText('Description');

    expect(input).toHaveProperty('name', 'description');
    expect(input).toHaveProperty('type', 'text');
    expect(input).toHaveProperty('required', true);
  });

  it('should render a input description with min-length=10', () => {
    render(
      <NewTask
        onSubmitCallback={onSubmitCallback}
        onCancelCallback={onCancelCallback}
      />
    );

    const input = screen.getByPlaceholderText('Description');

    expect(input).toHaveProperty('minLength', 10);
  });

  it('should render a input type date and name=date and must be required', () => {
    render(
      <NewTask
        onSubmitCallback={onSubmitCallback}
        onCancelCallback={onCancelCallback}
      />
    );

    const input = screen.getByPlaceholderText('Date');

    expect(input).toHaveProperty('name', 'date');
    expect(input).toHaveProperty('type', 'date');
    expect(input).toHaveProperty('required', true);
  });
});

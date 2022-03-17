import { Header } from '/src/components/Header';
import { TaskList } from '/src/components/TaskList';
import { NewTaskForm } from '/src/components/NewTaskForm';
import { StoreProvider } from '/src/store/StoreProvider';

export const App = () => {
  return (
    <StoreProvider>
      <Header />
      <NewTaskForm />
      <TaskList />
    </StoreProvider>
  );
};

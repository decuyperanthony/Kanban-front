import './App.css';
import useKanban from './hooks/useKanban';

function App() {
  const { data } = useKanban();

  return (
    <div className="App">
      {data?.map(({ name, _id }) => (
        <div key={_id}>{name}</div>
      ))}
    </div>
  );
}

export default App;

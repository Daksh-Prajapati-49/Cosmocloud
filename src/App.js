import './App.css';
import DynamicForm from './components/DynamicForm';

function App() {
  return (
    <>
    <div className='bg-gray-800 text-slate-50 font-bold text-2xl px-4 py-2'> Cosmocloud Assignment</div>
      <div className="App flex items-center justify-center bg-gray-800 text-gray-100 p-2 font-mono">
        <DynamicForm/>
      </div>
    </>
  );
}

export default App;

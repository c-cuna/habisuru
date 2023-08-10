import ToDo from './Components/Todo';

function App() {
  return (
    <div className="App">
      <div className="w-full fixed bg-gray-300 h-[400px] flex justify-center bg-banner bg-cover bg-center bg-no-repeat bg-blend-multiply" />
      <div className='h-screen  bg-gray-100 flex justify-center items-center'>
        <div className='container w-full max-w-2xl z-30'>
            <div className='text-3xl font-bold text-white text-center mb-4 font-poppins uppercase'>Habisuru</div>
            <ToDo />
        </div>
      </div>
    </div>
  );
}

export default App;

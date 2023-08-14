import ToDo from './Components/Todo'

function App() {
  return (
    <div className="App">
      <div className="w-full fixed flex justify-center bg-gray-300 h-[400px] bg-banner bg-cover bg-center bg-no-repeat bg-blend-multiply" />
      <div className='h-screen flex justify-center items-center bg-gray-100'>
        <div className='container w-full max-w-2xl z-30'>
            <div className='mb-4 text-3xl font-bold text-white text-center font-poppins uppercase'>Habisuru</div>
            <ToDo />
        </div>
      </div>
    </div>
  )
}

export default App

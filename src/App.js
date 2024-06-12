import './App.css';
import Router from './components/generales/Router';
import { SessionProvider } from './components/Usuarios/SessionProvider';
//se esta dando un contexto para enviarlas a  todas las rutas
function App() {
  return (
    <SessionProvider>
      
      <div className="App">
        {<Router/>}
      </div>
    </SessionProvider>  
  )
}

export default App;

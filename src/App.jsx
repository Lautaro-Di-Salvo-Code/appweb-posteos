import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'
import { Posteos } from './Componentes/Posteos'
import { Usuario } from './Componentes/Usuario'
import { Autenticacion } from './config/useFirebase'
// import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom"
function App() {
  const [ user ] = useAuthState(Autenticacion)
  
  return (
    <>
    {/* <BrowserRouter>
    <Routes>
      <Route> </Route>
    </Routes>
    </BrowserRouter> */}

    <Usuario/>
    { !user ? null : <Posteos/>}
    
    
    </>
  )
}

export default App

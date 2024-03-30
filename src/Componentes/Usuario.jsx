import React from 'react'

import { Autenticacion, ProveedorGoogle} from "../config/useFirebase"
import { signInWithPopup, signOut} from "firebase/auth"
import { useAuthState} from "react-firebase-hooks/auth"

export const Usuario = () => {

const [ user ] = useAuthState(Autenticacion)

// console.log(ProveedorGoogle)
// console.log(app)


const InicioSecionGoogle = async () => {  
await signInWithPopup( Autenticacion, ProveedorGoogle)

 }
    
const CerrarSecionGoogle = async () => { 
await signOut(Autenticacion)

 }
    const usuarioanonimo = `https://png.pngtree.com/png-clipart/20230823/original/pngtree-anonymous-user-unknown-faceless-vector-picture-image_8241754.png`

  return (
   
<aside className='flex flex-col fixed bg-[#b3afaf] w-[20vw] h-screen justify-around  z-[500]'>
<article  className='imagen-fondo bg-center relative top-[-9rem] h-[20vh]'>

    <div className='flex flex-wrap w-[100%] flex-col  content-center pl-[2rem] '> 
        <img style={{ height: "auto", width: "5rem", borderRadius: "10px", margin: "1rem auto"}} src={user?.photoURL || usuarioanonimo } alt="" />
        
        <h2 className='relative top-[1rem] text-[1.5rem] text-[#fff]'>{user?.displayName || "Sin usuario"}</h2>
    </div>
</article>

    <div className='px-[2rem] cursor-pointer'>
      {!user && <button className='bg-[#4c5ddf] hover:bg-[#bbc1ed] cursor-pointer h-[2rem] w-[7rem] rounded-xl' onClick={InicioSecionGoogle}>Inicio Secion</button>}
      {user && <button className='bg-[#4c5ddf] hover:bg-[#bbc1ed] cursor-pointer h-[2rem] w-[7rem] rounded-xl' onClick={CerrarSecionGoogle}>Cerrar Secion</button>}
    </div>
    {!user ? null : (
    <div className='px-[2rem]'>
      <p>configuracion avanzada</p>
    </div>

    ) }
</aside>



  )
}



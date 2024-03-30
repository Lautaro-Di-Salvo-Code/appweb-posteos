import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {Autenticacion, database, ObtenerAlmacenamientoImagenes} from "../config/useFirebase"
import {addDoc, getDocs , collection } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'



export const Posteos = () => {


  // la informacion del componente usuario, 
  // que viene de la autenticacion con google
  const [ user ] = useAuthState(Autenticacion)

  // mensaje de error de tipeo al escribir en el formulario de posteo
  const Squem = yup.object().shape({
    publicacion: yup.string().required("Completa el campo ")
  })
  
  // validaciones combinadas con el envio a la base de datos
  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(Squem)
  })
  
  // esto almacena la informacion escrita por el usuario hacia la base de datos
  const Pubicacioness = collection(database, "posts social media" )
  
  const Publicaciones =  async (datos) => { 
    await addDoc(Pubicacioness , {
      ...datos,
      email: user?.email,
      nombreUsuario: user?.displayName,
      userid: user?.uid,
    })
  }
  const [ListaPosteos , setListaPosteos ] = useState(null)

  // funcion que devuelve la informacion de la base de datos
const ObtenerPublicaciones = async() => { 
const datos = await getDocs(Pubicacioness)
setListaPosteos(datos.docs.map((e) => ({...e.data(),  id: e.id})))
}
// console.log(ListaPosteos)

useEffect(() => {
  ObtenerPublicaciones()

},[])

  return (

    <main className='flex justify-center  h-fit flex-col 
    relative
    top-[20rem]
    mx-auto gap-[2rem]  p-[3rem]'>
        <h2 className='text-center text-[3rem]'>Posteos</h2>

        <form onSubmit={handleSubmit(Publicaciones)} 
         className='mb-[10vh]  flex flex-col gap-[2rem] min-w-[715px]
         fixed left-[31vw]  right-[31vw] top-[5rem] justify-center
         z-[300]
          bg-slate-500 mx-auto rounded-xl p-[2rem]' action="">

            <textarea className='max-h-[9rem] bg-[#a5a3a3] 
              resize-none p-[1rem] text-[2rem] text-[#fff]'
               name="" id="" cols="30" rows="10" {...register("publicacion")}></textarea>
                <i className='font-bold  text-[#cc3535] text-[2rem] mx-auto'>{errors.publicacion?.message}</i>

              <input className='mx-auto w-fit ' type="file" name="" id="" />

            <input className='bg-[#4c5ddf] h-[2rem] w-[7rem] 
            cursor-pointer rounded-xl mx-auto  hover:bg-[#bbc1ed]' 
            type="submit" value="Publicar" />
        </form>
      <article className='flex justify-center flex-col gap-[4rem] 
      
      text-center  mx-auto   min-w-[715px] ' >
        {ListaPosteos?.map(e => ( 

        <div key={e.id} style={{ display: "flex", 
          flexDirection : "column",
          zIndex: "2",
          position: "relative",
          paddingTop: "2rem",
          border: "solid 5px #fff",
          backgroundColor: "#a5a3a3",
          height: "20vh"
          }}>
          <p style={{width: "100%" , fontSize: "2rem", color: "#fff", textAlign: "center"}}>{e?.nombreUsuario}</p>
          <p style={{width: "100%" , fontSize: "2rem", color: "#fff", textAlign: "center"}}>{e?.publicacion}</p>
        </div>
        ))}
      </article>
    </main>
  )
}

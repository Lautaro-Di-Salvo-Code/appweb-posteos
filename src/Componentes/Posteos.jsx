import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {Autenticacion, database, ObtenerAlmacenamientoImagenes} from "../config/useFirebase"
import {addDoc, getDocs , collection, deleteDoc, doc } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import {ref, uploadBytes , listAll, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"


export const Posteos = () => {

  const [imgUpload, setImgUpload] = useState(null)
  const [listaimagenes, setListaimagenes] = useState([])
  const [load , setLoad ] = useState(false)


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
const ObtenerPublicaciones = async () => { 
  setLoad(true)
const datos = await getDocs(Pubicacioness)
setListaPosteos(datos.docs.map((e) => ({...e.data(),  id: e.id})))
setLoad(false)
}
// acá se hace la ruta y carpeta en firebase para almacenar las imagenes y darles un
//una ruta unica
const SubirImagen = async () => { 
 if(imgUpload === null) return  
 const imgRef = ref(ObtenerAlmacenamientoImagenes, `imagenes/${imgUpload.name + v4()}`)
 const UploadByt = await uploadBytes(imgRef, imgUpload)
 alert("imagen subida con éxito")

 }

 const rutaAlmacenImg = ref(ObtenerAlmacenamientoImagenes, "imagenes/")
 
 useEffect(() => {
   ObtenerPublicaciones()
   
  // entra al objeto que devuelve la carpeta almacenada
  //  en firebase y al encontrarla, tiene descargar la url para poder recuperar la imagen 
  // almacenada 
  listAll(rutaAlmacenImg)
  .then(res => {
    // console.log(i)
    res.items.forEach(i => {
      getDownloadURL(i)
      .then(enlaceImg => {
        setListaimagenes(prev => [...prev, enlaceImg] ) })} )
      })
    },[])
    
    
    const BorrarPublicacion = async (id) => {
     await deleteDoc(doc(database, "posts social media", id))
      }

      console.log(ListaPosteos)

  return (

    <main className='flex justify-center  h-fit flex-col 
    relative
    top-[35rem]
    mx-auto gap-[2rem]  p-[3rem]'>

        <form onSubmit={handleSubmit(Publicaciones)} 
        className='mb-[10vh]  flex flex-col gap-[2rem] min-w-[715px]
        fixed left-[31vw]  right-[31vw] top-[5rem] justify-center
        z-[300]
        bg-slate-500 mx-auto rounded-xl p-[2rem]' action="">

            <h2 className='text-center text-[3rem]'>Posteos</h2>
            <textarea className='max-h-[9rem] bg-[#a5a3a3] 
              resize-none p-[1rem] text-[2rem] text-[#fff]'
              name="" id="" cols="30" rows="10" {...register("publicacion")}></textarea>
                <i className='font-bold  text-[#cc3535] text-[2rem] mx-auto'>{errors.publicacion?.message}</i>

              <input onChange={e => { 
                setImgUpload(e.target.files[0])}} 
                className='mx-auto w-fit ' type="file" name="" id="" />

            <input onClick={SubirImagen} className='bg-[#4c5ddf] h-[2rem] w-[7rem] 
            cursor-pointer rounded-xl mx-auto  hover:bg-[#bbc1ed]' 
            type="submit" value="Publicar" />
        </form>
      <article className='flex justify-center flex-col gap-[4rem] 
      
      text-center  mx-auto   min-w-[715px] ' >
        {/* {load && <h1 style={{fontSize: "3rem"}}>Loading...</h1> } */}

        {load ? <h1 style={{fontSize: "3rem"}}>Loading...</h1> : ListaPosteos?.map(e => ( 
          
        <div key={e.id} style={{ 
          display: "flex", 
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
          <button className=' h-auto w-fit bg-[#f3f4f3]
           text-[#000] text-[2rem] mx-auto
           ' onClick={()=> BorrarPublicacion(e.id)}>Borrar</button>
        </div>
        ))}

        <div className='grid-img'>

        {load ? <h2 style={{fontSize: "3rem"}}>Loading images</h2> : listaimagenes?.map(e => {
          return <img style={{height: "auto", width: "32rem", margin: "auto"}} src={e} alt="" />
        }
          

            
          )}
        </div>
        
      </article>
    </main>
  )
}

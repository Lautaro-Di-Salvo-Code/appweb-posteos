import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {Autenticacion, database} from "../config/useFirebase"
import {addDoc , collection } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'


export const Posteos = () => {

  const [ user ] = useAuthState(Autenticacion)

  const Squem = yup.object().shape({
    descrtiption: yup.string().required("Completa el campo ")
  })

  
  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(Squem)
  })
  const Pubicacioness = collection(database, "Publicaciones" )
  
const Publicaciones =  async (d) => { 
  console.log(d)
  await addDoc(Pubicacioness , {
    ...d, 
    username: user?.displayName,
    userid: user?.uid
  })
 }

  
  return (

    <main className='flex justify-center relative top-[9vh] h-[26vh] flex-col 
    mx-auto gap-[2rem]  p-[3rem]'>
        <h2 className='text-center text-[3rem]'>Posteos</h2>

        <form onSubmit={handleSubmit(Publicaciones)} 
         className='flex flex-col gap-[2rem] min-w-[715px]
          bg-slate-500 mx-auto rounded-xl p-[2rem]' action="">

            <textarea className='max-h-[9rem] bg-[#a5a3a3] 
              resize-none p-[1rem] placeholder:text-[2rem]'
               name="" id="" cols="30" rows="10" {...register("descrtiption")}></textarea>
                <i className='font-bold  text-[#cc3535] text-[2rem] mx-auto'>{errors.descrtiption?.message}</i>
              <input className='mx-auto w-fit ' type="file" name="" id="" />

            <input className='bg-[#4c5ddf] h-[2rem] w-[7rem] 
            cursor-pointer rounded-xl mx-auto  hover:bg-[#bbc1ed]' 
            type="submit" value="Publicar" />
        </form>

    </main>
  )
}

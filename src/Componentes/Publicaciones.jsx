
export const Publicaciones = ({publicacion,nombreUsuario, id }) => {

    
  return (
    <>
    <div key={id} style={{ display: "flex", gap: "3rem",  flexDirection : "column"}}>
            <p style={{width: "fit-content"}}>{publicacion}</p>
            <p style={{width: "fit-content"}}>{nombreUsuario}</p>
     </div>
    </>
  )
}

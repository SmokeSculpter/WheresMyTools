const Dialog = ({dialogOpen, setDialogOpen}: any) => {
    return ( 
        <div className={`${dialogOpen ? "hidden" : ""} w-dvw h-dvh bg-black/50 fixed`}>

        </div>
     );
}
 
export default Dialog;
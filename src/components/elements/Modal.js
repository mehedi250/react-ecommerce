import React, { useEffect } from "react";
// import { CSSTransition } from "react-transition-group";
import  '../../assets/admin/css/modal.css';

const Modal = ({title, show, onClose, children}) => {
    const openModal =()=> {
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("exampleModal").style.display = "block"
        document.getElementById("exampleModal").classList.add("show")
    }
    const closeModal= ()=> {
        document.getElementById("exampleModal").classList.add("exit")
        setTimeout(()=> {
            document.getElementById("backdrop").style.display = "none"
            document.getElementById("exampleModal").style.display = "none"
            document.getElementById("exampleModal").classList.remove("show")
            document.getElementById("exampleModal").classList.remove("exit")
        }, 500); 
        
    }
    useEffect(() => {
        if(show === true){
            openModal()
        }else if(show=== false){
            closeModal()
        }
        
    }, [show]);



  return (
    <>
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-modal="true"
            role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>

                        <button type="button" className="close" aria-label="Close" onClick={()=>onClose()}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                        {children}
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show" id="backdrop" style={{display: "none"}} ></div>
    </>
  );
};

export default Modal;
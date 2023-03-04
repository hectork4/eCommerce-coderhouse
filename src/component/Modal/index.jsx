import './styles.css'
import ReactDOM from 'react-dom'

function Modal({ children, onClose, title }) {

    const handleModalDialogClick = (e) => {
        e.stopPropagation()
    }

    return (
        <div className='modal' onClick={onClose} >
            <div className='content-modal' onClick={handleModalDialogClick}>
                <button className='btn' onClick={onClose}>❌</button>
                {title?<h2>{title}</h2>:null}
                {children}
            </div>
        </div>
    )
}

export default function ModalPortal( {children, onClose, title=''} ){ 
    
    return ReactDOM.createPortal(<Modal onClose={onClose} title={title}>
        {children}
    </Modal>,
    document.getElementById('modal-root')
     )
}
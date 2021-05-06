import { toast } from 'react-toastify'

const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}


export function messageError(message) {
    toast.error( message, toastConfig)
}

export function messageSuccess(message) {
    toast.success( message, toastConfig)
}

export function messageWarning(message) {
    toast.warn( message, toastConfig)
}
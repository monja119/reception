import { toast } from "react-toastify";

const ToastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
};

export const notifyError = (message) => {
    toast.error(message, ToastOption);
}

export const notifySucess = (message) => {
    toast.success(message, ToastOption);
}

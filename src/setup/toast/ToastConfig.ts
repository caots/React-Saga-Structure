import { ToastOptions } from "react-toastify";
import { Languages } from "../../app/utils/common/constants";

export const ToastDefaultConfig = () : ToastOptions =>  {
    return {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    }
}
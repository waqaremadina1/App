import { message } from "antd";


window.getRandomId = () => Math.random().toString(36).slice(2)


window.toastify = (msg = "", type) => {
    switch (type) {
        case "success":
            message.success(msg);
            break;
        case "error":
            message.error(msg);
            break;
        case "info":
            message.info(msg);
            break;
        case "warning":
            message.warning(msg);
            break;
        default: message.info(msg)
            break;
    }

};
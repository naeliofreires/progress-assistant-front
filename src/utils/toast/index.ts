import { toast } from 'react-toastify';

const error = (message = 'error') => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const success = (message = 'success') => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const info = (message = '') => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const handleErrorEvent = (e: string[] | string) => {
  if (Array.isArray(e)) {
    e.forEach((e) => error(e as string));
  } else {
    ToastUtil.error(e as string);
  }
};

export const ToastUtil = {
  info,
  error,
  success,
  handleErrorEvent,
};

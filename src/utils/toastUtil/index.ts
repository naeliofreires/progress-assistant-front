import { toast } from 'react-toastify';

const _error = (message = 'error') => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const _success = (message = 'success') => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const _info = (message = '') => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastUtil = {
  info: _info,
  error: _error,
  success: _success,
};

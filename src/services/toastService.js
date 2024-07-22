import { toast } from 'react-hot-toast';
import { styles } from '../styles';

export const successToast = (message) => {
    toast.success(message, {
        style: styles.toast
    });
};
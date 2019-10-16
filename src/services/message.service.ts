import { toast } from 'react-toastify';

class MessageService {
  showMessage (type: 'ERROR' | 'SUCCESS', text: string) {
    switch (type) {
      case'ERROR':
        toast.error(text, {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      case 'SUCCESS':
        toast.success(text, {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
    }
  }
}

export default new MessageService();

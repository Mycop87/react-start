import { toast } from 'react-toastify';

class MessageService {
  public error (text: string) {
    toast.error(text, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  public success (text: string) {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export default new MessageService();

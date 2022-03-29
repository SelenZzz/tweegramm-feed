// components
import { Modal } from '../../components/Modal/Modal';

import { SignUp } from './components/SignUp/SignUp';
import { Login } from './components/Login/Login';

export const LoginModal = ({ onCloseRequest }: { onCloseRequest?: Function }) => {
  return (
    <Modal onCloseRequest={onCloseRequest}>
      <Login />
    </Modal>
  );
};

export const SignUpModal = ({ onCloseRequest }: { onCloseRequest?: Function }) => {
  return (
    <Modal onCloseRequest={onCloseRequest}>
      <SignUp />
    </Modal>
  );
};

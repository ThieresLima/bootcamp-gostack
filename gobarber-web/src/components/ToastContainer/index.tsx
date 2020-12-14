import React from 'react';
import { useTransition } from 'react-spring';
import Toast from './Toast';

import { ToastMessage } from '../../hooks/Toast';

import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120px', opacity: 0 },
      enter: { right: '0px', opacity: 1 },
      leave: { right: '-120px', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransition.map(({ item, props, key }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;

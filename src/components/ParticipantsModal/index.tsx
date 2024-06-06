import React from 'react';
import { Modal } from 'components/Modal';
import { ModalOverlay, ModalContent } from './styled';

const ParticipantsModal = ({ active, setActive, participants, onClose }) => {
  console.log('ParticipantsModal rendered');
  if (!participants || participants.length === 0) return null;

  return (
    <Modal active={active} setActive={setActive}>
      <ModalOverlay>
        <ModalContent>
          <h3>Участники беседы</h3>
          <ul>
            {participants.map((participant) => (
              <li key={participant.userId}>{participant.username}</li>
            ))}
          </ul>
          <button onClick={onClose}>Закрыть</button>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ParticipantsModal;
import { push, ref, set, update } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';

export const sendMessage = (text, recipientUserId, senderUserId) => {
  const senderMessagesRef = ref(db, `message/usersWithMessage/${senderUserId}/users/${recipientUserId}`); //от отправителя
  const recipientMessagesRef = ref(db, `message/usersWithMessage/${recipientUserId}/users/${senderUserId}`); //от получателя

  const newMessageRef = push(senderMessagesRef);
  const messageId = newMessageRef.key;
  const messageData = {
    text: text,
    sender: senderUserId,
    recipient: recipientUserId,
    timestamp: Date.now()
  };
  set(newMessageRef, messageData);

  update(recipientMessagesRef, {
    [`${messageId}`]: { 
      text: text,
      sender: senderUserId,
      timestamp: Date.now()
    }
  });
};
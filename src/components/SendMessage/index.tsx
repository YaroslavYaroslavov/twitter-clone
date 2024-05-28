import { push, ref, set, update } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';

export const sendMessage = (text, recipientUserId, senderUserId, senderName) => {
  const senderMessagesRef = ref(db, `message/usersWithMessage/${senderUserId}/users/${recipientUserId}`);
  const recipientMessagesRef = ref(db, `message/usersWithMessage/${recipientUserId}/users/${senderUserId}`);

  const newMessageRef = push(senderMessagesRef);
  const messageId = newMessageRef.key;
  const messageData = {
    text: text,
    sender: senderUserId,
    senderName: senderName, // Сохраняем имя отправителя
    recipient: recipientUserId,
    timestamp: Date.now()
  };
  set(newMessageRef, messageData);

  update(recipientMessagesRef, {
    [`${messageId}`]: { 
      text: text,
      sender: senderUserId,
      senderName: senderName, // Сохраняем имя отправителя
      timestamp: Date.now()
    }
  });
};

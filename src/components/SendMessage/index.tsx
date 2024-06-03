import { onValue, push, ref, set, update } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';

export const sendMessage = (text, recipientUserId, senderUserId, isPrivate) => {
  if(isPrivate) {
    const senderMessagesRef = ref(db, `message/usersWithMessage/${senderUserId}/users/${recipientUserId}`); //от отправителя
    const recipientMessagesRef =  ref(db, `message/usersWithMessage/${recipientUserId}/users/${senderUserId}`); //от получателя
  
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
   } else {
    const senderMessagesRef = ref(db, `message/usersWithMessage/${senderUserId}/chats/${recipientUserId}/messages`); //от отправителя
    const recipientMessagesRef =  ref(db, `message/usersWithMessage/${senderUserId}/chats/${recipientUserId}/users`); //от получателя


    const newMessageRef = push(senderMessagesRef);
    const messageId = newMessageRef.key;
    const messageData = {
      text: text,
      sender: senderUserId,
      recipient: recipientUserId,
      timestamp: Date.now()
    };



    set(newMessageRef, messageData);

    

    onValue(recipientMessagesRef, (snapshot) => {
        
      const data = snapshot.val()
      data.forEach(userID => {
        if(senderUserId === userID) return
        const userRef = ref(db, `message/usersWithMessage/${userID}/chats/${recipientUserId}/messages`)
        update(userRef, {
          [`${messageId}`]: { 
            text: text,
            sender: senderUserId,
            timestamp: Date.now()
          }
        });
      });
    });
   }
 
};
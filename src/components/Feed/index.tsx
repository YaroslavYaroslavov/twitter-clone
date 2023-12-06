import React, { useContext } from 'react';

import { FirebaseContext } from '../../index';

export const Feed = () => {
  const { auth } = useContext(FirebaseContext);

  return (
    <>
      <nav>
        <button onClick={() => auth.signOut()}>Log out</button>
      </nav>
      <main></main>
      <aside></aside>
    </>
  );
};

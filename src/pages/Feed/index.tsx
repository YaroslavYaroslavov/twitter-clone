import { StateInterface } from 'interface';
import React from 'react';
import { useSelector } from 'react-redux';

export const Feed = () => {
  const auth = useSelector((state: StateInterface) => state.auth);

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

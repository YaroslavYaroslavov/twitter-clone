import React, { FC, useEffect, useRef, useState } from 'react';

import { OtherOptionsProps } from './interface';
import { OpenMenuButton, OptionItem, OptionsList, OtherOptionsContainer } from './styled';

export const OtherOptions: FC<OtherOptionsProps> = ({ deletePost }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      event.target instanceof Node &&
      !(optionsRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <OtherOptionsContainer ref={optionsRef}>
      <OpenMenuButton onClick={toggleMenuOpen}>•••</OpenMenuButton>
      {isMenuOpen && (
        <OptionsList>
          <OptionItem onClick={deletePost}>Delete</OptionItem>
          {/* <OptionItem>Edit</OptionItem> */}
        </OptionsList>
      )}
    </OtherOptionsContainer>
  );
};

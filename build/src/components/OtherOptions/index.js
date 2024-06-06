import React, { useEffect, useRef, useState } from 'react';
import { OpenMenuButton, OptionItem, OptionsList, OtherOptionsContainer } from './styled';
export const OtherOptions = ({ deletePost }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const optionsRef = useRef(null);
    const handleOutsideClick = (event) => {
        if (optionsRef.current &&
            event.target instanceof Node &&
            !optionsRef.current.contains(event.target)) {
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
    return (React.createElement(OtherOptionsContainer, { ref: optionsRef },
        React.createElement(OpenMenuButton, { onClick: toggleMenuOpen }, "\u2022\u2022\u2022"),
        isMenuOpen && (React.createElement(OptionsList, null,
            React.createElement(OptionItem, { onClick: deletePost }, "Delete")))));
};

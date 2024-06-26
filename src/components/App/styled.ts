import styled, { keyframes } from 'styled-components';

const eyeShade = keyframes`
  0%   { transform: translateY(0)}
  20%   { transform: translateY(5px)}
  40%, 50%   { transform: translateY(-5px)}
  60%   { transform: translateY(-8px)}
  75%   { transform: translateY(5px)}
  100%   { transform: translateY(10px)}
`;

const eyeMove = keyframes`
  0%   { transform: translate(0, 0)}
  20%   { transform: translate(0px, 5px)}
  40%, 50%   { transform: translate(0px, -5px)}
  60%   { transform: translate(-10px, -5px)}
  75%   { transform: translate(-20px, 5px)}
  100%   { transform: translate(0, 10px)}
`;

export const Loader = styled.div`
  position: relative;
  width: 78px;
  height: 78px;
  border-radius: 50%;
  box-sizing: border-box;
  background: #fff;
  border: 8px solid #131a1d;
  overflow: hidden;
  margin: auto;
  margin-top: 40vh;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: -50%;
    width: 100%;
    height: 100%;
    background: #263238;
    z-index: 5;
    border-bottom: 8px solid #131a1d;
    box-sizing: border-box;
    animation: ${eyeShade} 3s infinite;
  }
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    bottom: 15px;
    width: 32px;
    z-index: 2;
    height: 32px;
    background: #111;
    border-radius: 50%;
    animation: ${eyeMove} 3s infinite;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const MainContent = styled.main`
  width: 900px;
`;

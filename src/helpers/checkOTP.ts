export const checkOTP = () => {
  return prompt('Insert auth code from SMS') || '';
};

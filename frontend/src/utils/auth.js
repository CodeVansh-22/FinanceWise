export const getToken = () => localStorage.getItem('fw_token');
export const setToken = (token) => localStorage.setItem('fw_token', token);
export const removeToken = () => {
  localStorage.removeItem('fw_token');
  localStorage.removeItem('fw_user');
};

export const getUser = () => {
  const u = localStorage.getItem('fw_user');
  return u ? JSON.parse(u) : null;
};
export const setUser = (user) => localStorage.setItem('fw_user', JSON.stringify(user));

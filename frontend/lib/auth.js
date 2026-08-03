export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('fw_jwt_token', token);
    document.cookie = `fw_token=${token}; path=/; max-age=86400; SameSite=Lax`;
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('fw_jwt_token') || null;
  }
  return null;
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('fw_jwt_token');
    localStorage.removeItem('fw_user_data');
    document.cookie = 'fw_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export function setUser(user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('fw_user_data', JSON.stringify(user));
  }
}

export function getUser() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('fw_user_data');
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

export function isAuthenticated() {
  return !!getToken();
}

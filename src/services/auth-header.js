export default function authHeader() {
  // eslint-disable-next-line no-undef
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  }
  return {};
}

export default function authHeader() {
  // eslint-disable-next-line no-undef
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return {
      authorization: `Bearer ${user.token}`,
    };
  }
  return {};
}

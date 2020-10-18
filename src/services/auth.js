export const TOKEN_KEY = "@QUALICORP!@#$;
export var USER_ROLE = '';
export var CPF_ROLE = 0;
export var NOME = 's';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRole = () => localStorage.getItem(USER_ROLE);
export const getCPF = () => localStorage.getItem(CPF_ROLE);
export const getNome = () => localStorage.getItem(NOME);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token.token);
  localStorage.setItem(USER_ROLE, token.user.role)
  localStorage.setItem(CPF_ROLE, token.user.cpf)
  localStorage.setItem(NOME, token.user.nome)
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

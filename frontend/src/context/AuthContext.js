import { createContext, useEffect, useReducer } from 'react';

const initial_state = {
  user: (() => {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  })(),
  loading: false,
  error: null
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null
      };
      case "LOGIN_SUCCESS":
        console.log('LOGIN_SUCCESS payload:', action.payload); // Log payload
        return {
          user: action.payload,
          loading: false,
          error: null
        };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    console.log('User state updated:', state.user); // Log user data
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

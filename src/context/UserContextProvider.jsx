import { useState, useEffect } from "react";
import TokenService from "../services/token.service";
import { UserContext } from "./UserContext";
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUser);
  const logIn = (user) => setUserInfo(user);
  const logOut = () => {
    setUserInfo(null);
    TokenService.removeUser();
  };
  function getUser() {
    const savedUser = TokenService.getUser() || null;
    return savedUser;
  }
  useEffect(() => {
    TokenService.setUser(userInfo);
  }, [userInfo]);
  return (
    <UserContext.Provider value={{ userInfo, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

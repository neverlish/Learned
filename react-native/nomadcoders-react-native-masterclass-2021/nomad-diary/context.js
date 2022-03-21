import React, { useContext } from "react";

export const DBContext = React.createContext();

export const useDB = () => {
  return useContext(DBContext);
};
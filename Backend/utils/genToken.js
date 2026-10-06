import jwt from "jsonwebtoken";

export const genToken =  (id, username, role) => {
  return jwt.sign({ id, username, role }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

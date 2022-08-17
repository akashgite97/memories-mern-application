import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    console.log(req.headers)
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (token) {
      let decodeToken = jwt.verify(token, "secret");
      req.userId = decodeToken?.id;
    }
    next()
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

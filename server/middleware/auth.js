import jwt from "jsonwebtoken";

export const verifytoken = async (req, res, next) => {
  try {
    let { token } = req.header("Authorization");

    if (!token) return res.status(403).json({ msg: "Access denied" });

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

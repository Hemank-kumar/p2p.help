import jwt from "jsonwebtoken";

// Admin authentication middleware
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer <token>"

  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Malformed authorization header" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: check if decoded user is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    req.admin = decoded; // attach decoded info to request
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

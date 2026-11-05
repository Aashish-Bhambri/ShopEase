import jwt from "jsonwebtoken";

const getAccessSecret = () => process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || "access-token-secret-10101";

export const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                code: "NO_TOKEN",
                message: "Access denied. No token provided."
            });
        }

        const token = authHeader.split(" ")[1];
        const secret = getAccessSecret();
        const decoded = jwt.verify(token, secret);

        req.admin = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                code: "TOKEN_EXPIRED",
                message: "Access token expired"
            });
        }

        return res.status(401).json({
            success: false,
            code: "INVALID_TOKEN",
            message: "Invalid or malformed token."
        });
    }
};

export default adminAuth;

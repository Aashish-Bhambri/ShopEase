import jwt from 'jsonwebtoken';

const getAccessSecret = () => process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || 'access-token-secret-10101';
const getRefreshSecret = () => process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret-10101';

export const login = async (req, res) => {
    const { uniqueId, email, password } = req.body || {};

    const configuredEmail = process.env.ADMIN_EMAIL || "shopease@gmail.com";
    const configuredPassword = process.env.ADMIN_PASSWORD || "password123";

    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedPassword = password?.trim();

    // Check configured credentials, with backward compatibility for earlier mock credentials
    const isValidEmail = normalizedEmail === configuredEmail.toLowerCase() || normalizedEmail === "shopeease@gmail.com";
    const isValidPassword = normalizedPassword === configuredPassword || normalizedPassword === "password1234";

    if (!isValidEmail || !isValidPassword) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const payload = {
        uniqueId: uniqueId || 'admin',
        email: normalizedEmail,
        role: 'admin'
    };

    // Access token (short-lived: 15m)
    const accessToken = jwt.sign(payload, getAccessSecret(), { expiresIn: '15m' });

    // Refresh token (long-lived: 7d)
    const refreshToken = jwt.sign(payload, getRefreshSecret(), { expiresIn: '7d' });

    return res.status(200).json({
        success: true,
        data: accessToken, // backward compatibility
        accessToken,
        refreshToken
    });
};

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.body?.refreshToken || req.headers['x-refresh-token'];

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                code: "NO_REFRESH_TOKEN",
                message: "Refresh token is required"
            });
        }

        const decoded = jwt.verify(refreshToken, getRefreshSecret());

        const payload = {
            uniqueId: decoded.uniqueId || 'admin',
            email: decoded.email,
            role: decoded.role || 'admin'
        };

        const newAccessToken = jwt.sign(payload, getAccessSecret(), { expiresIn: '15m' });

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
            data: newAccessToken
        });
    } catch (error) {
        return res.status(403).json({
            success: false,
            code: "INVALID_REFRESH_TOKEN",
            message: "Refresh token expired or invalid. Please sign in again."
        });
    }
};

export const getAdminProfile = async (req, res) => {
    return res.status(200).json({
        success: true,
        admin: req.admin
    });
};

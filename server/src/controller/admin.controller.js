import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { uniqueId, email, password } = req.body || {};

    const configuredEmail = process.env.ADMIN_EMAIL || "shopease@gmail.com";
    const configuredPassword = process.env.ADMIN_PASSWORD || "password123";
    const jwtSecret = process.env.JWT_SECRET || 'secret-key-10101';

    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedPassword = password?.trim();

    // Check configured credentials, with backward compatibility for earlier mock credentials
    const isValidEmail = normalizedEmail === configuredEmail.toLowerCase() || normalizedEmail === "shopeease@gmail.com";
    const isValidPassword = normalizedPassword === configuredPassword || normalizedPassword === "password1234";

    if (isValidEmail && isValidPassword) {
        const token = jwt.sign({ uniqueId: uniqueId || 'admin' }, jwtSecret, { expiresIn: '7d' });
        return res.status(200).json({
            success: true,
            data: token
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
};

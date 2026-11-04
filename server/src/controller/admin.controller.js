import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const admin = { email: "shopease@gmail.com", password: "password123" };
    const {uniqueId, email, password } = req.body;

    const token = jwt.sign({uniqueId},'secret-key-10101')
    if (email === admin.email && password === admin.password) {
        await res.status(200).json({
            success:true,
            data:token
        })
    }

}
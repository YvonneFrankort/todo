import jwt from 'jsonwebtoken' 

const { verify } = jwt;

const auth = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' })
        }
        next()
    })
}

export { auth} 

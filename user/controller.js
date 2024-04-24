import user from './model.js'

export async function addUser(req, res) {
    const { name, description, profile, joining } = req.body

    if (!name || !description) {
        res.json({
            message: "Missing Required Field"
        })
    }
    else {
        try {

            await user.create({ name, description, profile, joining })
            const result = await user.find()

            res.status(201).json({
                message: "User Posted Successfully",
                result
            })

        }
        catch (error) {
            console.error("Error during User creation:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export async function getUser(req, res) {

    try {
        const result = await user.find()
        res.status(201).json({
            message: "got all users Successfully",
            result
        })
    }
    catch (error) {
        console.error("Error during getting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
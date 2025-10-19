import { getAllVideos } from "../utils/youtube.api.js";

const handleAllVideos = async (req, res) => {
    try {
        console.log("hello wkasdjfh");
        const maxResults = await getAllVideos(req.oauth2Client)
        res.status(200).json({
            data:{
                list:maxResults
            }
        })
    } catch (error) {
        throw error
    }
}

export {
    handleAllVideos
}
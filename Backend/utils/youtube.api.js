import { google } from "./googleOauth.js"


const getAllVideos = async (oauth2Client) => {
    try {
        const youtube = google.youtube({ version: "v3", auth: oauth2Client })
        const channelRes = await youtube.channels.list({
            part: "contentDetails",
            mine: true,
        });
        const uploadsPlaylistId =
            channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;

        console.log("Uploads Playlist ID:", uploadsPlaylistId);

        // Step 2: Fetch videos from your uploads playlist
        let videos = [];
        let nextPageToken = null;

        do {
            const playlistRes =await youtube.playlistItems.list({
                part: "snippet,contentDetails",
                playlistId: uploadsPlaylistId,
                maxResults: 50, // max allowed per request
                pageToken: nextPageToken,
            });
            console.log(playlistRes);
            videos.push(...playlistRes.data.items);
            nextPageToken = playlistRes.data.nextPageToken;
        } while (nextPageToken);

        console.log(`✅ Total Videos: ${videos.length}`);
        videos.forEach((video, index) => {
            console.log(
                `${index + 1}. ${video.snippet.title} (${video.contentDetails.videoId})`
            );
        });

        return videos;
    } catch (error) {
        throw error
    }
}


export {
    getAllVideos
}
export const endpoints = {
    auth: {
        register: '/auth/register',
        login: '/auth/login',
        logout: '/auth/logout',
        changePassword: '/auth/change-password',
        refreshToken: '/auth/refresh-token',
        getCurrentUser: '/auth/me',
    },

    users: {
        getHistory: '/users/history',
        updateAccountDetails: '/users/update-account',
        updateAvatar: '/users/update-avatar',
        updateCoverImage: '/users/update-cover-image',
        getChannel: '/users/channel/:username',
    },

    videos: {
        getHomeFeed: '/videos',// for non-logged in users
        getDashboardVideos: '/dashboard/videos',//only for logged in user
        getMyVideos: '/videos/me',
        getChannelVideos: '/videos/channel/:userId',
        uploadVideo: '/videos/upload',
        getVideoById: '/videos/:videoId',
        toggleVideoPublishStatus: '/videos/:videoId/publish',
        getLikedVideos: '/videos/liked',
        deleteVideo: '/videos/:videoId',
    },

    comments : {
        getCommentsByVideoId: '/comments/:videoId',
        createComment: '/comments/:videoId',
        editComment: '/comments/:commentId',
        replyToComment: '/comments/:commentId/reply',
    },

    playlists: {
        create: '/playlists',
        getPlaylistById: '/playlists/:playlistId',
        deletePlaylist: '/playlists/:playlistId',
        removeVideoFromPlaylist: '/playlists/:playlistId/videos/:videoId',
        togglePlaylistVisibility: '/playlists/:playlistId/visibility',
        getUserPlaylists: '/playlists/user/:userId',
        getMyPlaylists: '/playlists/me',
    }
}
export const endpoints = {
    auth: {
        register: '/auth/register',
        login: '/auth/login',
        logout: '/auth/logout',
        changePassword: '/auth/change-password',
        refreshToken: '/auth/refresh-token',
    },

    users: {
        getCurrentUser: '/user/me',
    },

    dashboard: {
        
    },

    videos: {
        getHomeFeed: '/videos',// for non-logged in users
        getDashboardVideos: '/dashboard/videos',//only for logged in user
        getMyVideos: '/videos/me',
        uploadVideos: '/videos/upload',
        getVideoById: '/videos/:videoId',
        togglePublishStatus: '/videos/:videoId/publish',
        getLikedVideos: '/videos/liked',
        deleteVideo: '/videos/:videoId',
    },

    comments : {
        getCommentsByVideoId: '/comments/:videoId',
        createComment: '/comments/:videoId',
        editComment: '/comments/:commentId',
        replyToComment: '/comments/:commentId/reply',
    },
}
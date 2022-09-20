module.exports = {
    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    AVATAR_MAX_SIZE: 5 * 1024 * 1024,
    VIDEO_MAX_SIZE: 15 * 1024 * 1024,
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],

    DOCS_MIMETYPES: [
        'application/msword',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ],

    VIDEOS_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ]
};

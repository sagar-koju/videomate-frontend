export interface Video {
    _id: string;
    title: string;
    description: string;
    videoFile: string;
    thumbnail: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    likesCount: number;
    views: number;
    duration: number;
    commentsCount: number;
    isPublished: boolean;
}
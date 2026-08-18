import { Video } from "./video";

export type Playlist = {
    _id: string;
    name: string;
    description: string;
    videos: Video[];
    isPublic: boolean;
    owner: {
        _id: string;
        username: string;
        fullName: string;
        avatar: string;
    }
    videoCount: number;
    createdAt: string;
    updatedAt: string;
}
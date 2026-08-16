import { FileUp, ImagePlus, PauseCircle, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { Image as LucideImage } from 'lucide-react'
import { useUploadVideo } from '@/hooks/useVideos';
import ToggleButton from '@/components/ui/toggle-button';

interface PlaylistFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PlaylistForm({ isOpen, onClose }: PlaylistFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // reset state when modal is opened or closed
        if (!isOpen) {
            setTitle('')
            setDescription('')
            setError(null)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) {
            setError('Please provide a title for the video.');
            return;
        }
        if (!description.trim()) {
            setError('Please provide a description for the video.');
            return;
        }
        setError(null)

        uploadVideoMutation.mutate(formData, {
            onSuccess: () => {
                setTitle('')
                setDescription('')
                setError(null)
            }
        });
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-950/70 p-10 backdrop-blur-sm" role="dialog" aria-modal="true" >
            <div className="flex h-full w-full max-w-xl items-stretch overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                <form onSubmit={handleSubmit} className="flex h-full w-full flex-col overflow-y-auto p-6">
                    <div className="flex items-center justify-between border-b pb-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 ">Upload Video</h3>
                        <button type="button" className="h-4 w-4 flex justify-center items-center text-gray-900 hover:bg-gray-200 rounded-full p-4" onClick={onClose} aria-label="Close">✕</button>
                    </div>

                    {/* video */}
                    <div className="mt-4 grid grid-cols-1 gap-4">
                        <label className="block">
                            <span className="text-sm text-gray-700 dark:text-gray-200">Title (required)</span>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full max-w-xl rounded-sm border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border py-1 px-2"
                                placeholder="Add a title that describes your video"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm text-gray-700 dark:text-gray-200">Description (required)</span>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 py-1 px-2 block w-full max-w-xl rounded-sm border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border "
                                rows={4}
                                placeholder="Tell viewers about your video"
                            />
                        </label>

                        <div className="flex ">
                            <div className="flex flex-col gap-2">
                                <span>Visibility</span>
                                <div className="flex items-center gap-2 border rounded-md p-2">
                                    <ToggleButton checked={isPublic} onChange={setIsPublic} label='Public' />
                                    <span className=" text-gray-700 dark:text-gray-200">Public</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                        <button type="submit" disabled={isUploading} className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50">
                            {isUploading ? 'Creating...' : 'Create'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

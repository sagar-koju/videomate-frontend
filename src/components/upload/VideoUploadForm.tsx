import { FileUp, ImagePlus, PauseCircle, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { Image as LucideImage } from 'lucide-react'
import { useUploadVideo } from '@/hooks/useVideos';

interface VideoUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (response: any) => void;
  onUploadError?: (error: any) => void;
  // Optional custom upload handler: receives FormData and an optional progress callback, returns a Promise that resolves with the response
  uploadFunction?: (formData: FormData, onProgress?: (pct: number) => void) => Promise<any>;
}

export default function VideoUploadForm({ isOpen, onClose }: VideoUploadFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const videoFileInputRef = useRef<HTMLInputElement | null>(null)
  const thumbnailFileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // cleanup preview URL when component unmounts or file changes
    return () => {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl)
      if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl)
    }
  }, [videoPreviewUrl])

  useEffect(() => {
    // reset state when modal is opened or closed
    if (!isOpen) {
      setTitle('')
      setDescription('')
      setVideoFile(null)
      setError(null)
      setThumbnailPreviewUrl(null)
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl)
        setVideoPreviewUrl(null)
      }
      if (videoFileInputRef.current) videoFileInputRef.current.value = ''
      if (thumbnailFileInputRef.current) thumbnailFileInputRef.current.value = ''
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

  const videoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const f = e.target.files?.[0] ?? null
    if (!f) {
      setVideoFile(null)
      setVideoPreviewUrl(null)
      return
    }

    // basic validation
    const maxSizeBytes = 200 * 1024 * 1024 // 200MB
    if (!f.type.startsWith('video/')) {
      setError('Please select a video file.')
      setVideoFile(null)
      setVideoPreviewUrl(null)
      return
    }
    if (f.size > maxSizeBytes) {
      setError('File is too large. Max size is 200MB.')
      setVideoFile(null)
      setVideoPreviewUrl(null)
      return
    }

    setVideoFile(f)
    const url = URL.createObjectURL(f)
    setVideoPreviewUrl(url)
  }

  const thumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const f = e.target.files?.[0] ?? null
    if (!f) {
      setThumbnailFile(null)
      setThumbnailPreviewUrl(null)
      return
    }
    if (!f.type.startsWith('image/')) {
      setError('Please select an image file for the thumbnail.')
      setThumbnailPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(f)
    setThumbnailPreviewUrl(url)
  }

  const { uploadVideoMutation, cancleUpload, isUploading, progress } = useUploadVideo()

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
    if (!thumbnailFileInputRef.current?.files?.[0]) {
      setError('Please select a thumbnail image for the video.');
      return;
    }
    if (!videoFile) {
      setError('Please select a video file to upload.');
      return;
    }

    setError(null)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('videoFile', videoFile as Blob)
    formData.append('thumbnail', thumbnailFileInputRef.current?.files?.[0])

    uploadVideoMutation.mutate(formData, {
      onSuccess: () => {
        setTitle('')
        setDescription('')
        setVideoFile(null)
        setThumbnailFile(null)
        setError(null)
        setThumbnailPreviewUrl(null)
        setVideoPreviewUrl(null)
        if (videoFileInputRef.current) videoFileInputRef.current.value = ''
        if (thumbnailFileInputRef.current) thumbnailFileInputRef.current.value = ''
      }
    });
  }

  const handleClose = () => {
  if (isUploading) {
    const confirmCancel = window.confirm('Upload is in progress. Are you sure you want to cancel?');
    if (!confirmCancel) return;
  }
  cancleUpload();
  uploadVideoMutation.reset();
  onClose();
};

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-950/70 p-10 backdrop-blur-sm" role="dialog" aria-modal="true" >
      <div className="flex h-full w-full max-w-4xl items-stretch overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="flex h-full w-full flex-col overflow-y-auto p-6">
          <div className="flex items-center justify-between border-b pb-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 ">Upload Video</h3>
            <button type="button" className="h-4 w-4 flex justify-center items-center text-gray-900 hover:bg-gray-200 rounded-full p-4" onClick={handleClose} aria-label="Close">✕</button>
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

            <div className="flex flex-col md:flex-row gap-4">
              <div className="mt-2 flex-1">
                <span className="text-sm text-gray-700 dark:text-gray-200">Video</span>
                <div className="flex flex-col items-center justify-center mt-2 h-50 w-full max-w-90 rounded-md border border-dashed border-slate-400 gap-1">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={videoFileChange}
                    ref={videoFileInputRef}
                    className="hidden"
                  />
                  <FileUp className="h-6 w-6 text-gray-500" />
                  <span className="text-sm text-slate-900">Drag and drop video files to upload</span>
                  <span className='text-xs text-slate-500'>Your videos will be private until you publish them.</span>
                  <button
                    type="button"
                    onClick={() => videoFileInputRef.current?.click()}
                    className="mt-2 p-2 text-blue-700 text-xs rounded-md hover:bg-slate-100 border-2 border-slate-300"
                  >
                    Select File
                  </button>
                </div>
              </div>

              {videoPreviewUrl ? (
                <div className="mt-2 flex-1">
                  <span className="text-sm text-gray-700 dark:text-gray-200">Preview</span>
                  <video src={videoPreviewUrl} controls className="mt-2 h-50 w-full max-w-90 rounded-md bg-black" />
                </div>
              ) : (
                <div className="mt-2 flex-1">
                  <span className="text-sm text-gray-700 dark:text-gray-200">Preview</span>
                  <div className="mt-2 h-50 w-full max-w-90 rounded-md bg-gray-200 flex flex-col items-center justify-center p-4">
                    <PlayCircle className="h-8 w-8 text-gray-500" />
                    <p className="text-gray-500">No video preview available</p>
                  </div>
                </div>
              )}
            </div>

            {/* thumbnail */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="mt-2 flex-1">
                <span className="text-sm text-gray-700 dark:text-gray-200">Thumbnail</span>
                <div className="flex flex-col items-center justify-center mt-2 p-4  h-50 w-full max-w-90 rounded-md border border-dashed border-slate-400 gap-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={thumbnailFileChange}
                    ref={thumbnailFileInputRef}
                    className="hidden"
                  />
                  <ImagePlus className="h-6 w-6 text-gray-500" />
                  <span className="text-xs text-slate-500 text-center">Upload a picture that shows what's in your video. A good thumbnail can help your video stand out.</span>
                  <button
                    type="button"
                    onClick={() => thumbnailFileInputRef.current?.click()}
                    className="mt-2 p-2 text-blue-700 text-xs rounded-md hover:bg-slate-100 border-2 border-slate-300"
                  >
                    Upload Thumbnail
                  </button>
                </div>
              </div>

              {thumbnailPreviewUrl ? (
                <div className="mt-2 flex-1">
                  <span className="text-sm text-gray-700 dark:text-gray-200">Preview</span>
                  <div className="relative mt-2 h-50 w-full max-w-90 rounded-md">
                    <Image
                      src={thumbnailPreviewUrl}
                      alt="Thumbnail Preview"
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      className="object-cover rounded-md" />
                  </div></div>
              ) : (
                <div className="mt-2 flex-1">
                  <span className="text-sm text-gray-700 dark:text-gray-200">Preview</span>
                  <div className="mt-2 flex flex-col h-50 w-full max-w-90 rounded-md bg-gray-200 items-center justify-center p-4">
                    <LucideImage className="h-8 w-8 text-gray-500" />
                    <p className="text-gray-500">No image preview available</p>
                  </div>
                </div>
              )}
            </div>

            {uploadVideoMutation.error && (
              <div className="text-center text-red-600">{(uploadVideoMutation.error as any)?.response?.data?.message || error || 'Upload failed. Please try again.'}</div>
            )}

            {uploadVideoMutation.isSuccess && (
              <div className="text-center text-slate-500">Video uploaded successfully!</div>
            )}

            {isUploading && progress !== null && (
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mt-2">
                <div className="h-2 bg-blue-600" style={{ width: `${progress}%` }} />
                <div className="text-xs text-gray-600 mt-1">Uploading... {progress}%</div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <button type="button" onClick={handleClose} className="px-4 py-2 rounded-md border">Cancel</button>
            {uploadVideoMutation.isSuccess ? (
              <button type="button" onClick={handleClose} className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50">
              Done
            </button>
            ) : (
              <button type="submit" disabled={isUploading} className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50">
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

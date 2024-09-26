import { configURL } from '@/config'
import { http } from './http.service'

class UploadService {
  async image(image: File) {
    const formData = new FormData()
    formData.append('image', image)
    return await http.post(configURL.UPLOAD_IMAGE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  async images(images: File[]) {
    return await http.post(
      configURL.UPLOAD_IMAGES,
      { images: images },
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
  }
}

export const uploadService = new UploadService()

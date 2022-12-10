import { S3 } from '@aws-sdk/client-s3'

const params = {
    Bucket: 'hydrobud-images',
}

const getS3Client = async () => {
    const client = new S3({
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY
      },
      region: 'us-west-2',
    })
  
    return client
}

const uploadImageToHydrobudMedia = async (data)=> {
    const fileName = Date.now().toString() + '.jpeg'
    try {
        const client = await getS3Client()
        const image = new Promise(async (resolve, reject) => {
            try {
              await client.putObject({...params, Body: data, ContentType: data.type, Key: fileName})
              
              const imageData = {
                uri: `https://hydrobud-images.s3.us-west-2.amazonaws.com/${fileName}`,
                type: data.type || 'image/jpeg',
                altTag: ''
              }
  
              resolve(imageData)
            } catch (error) {
              reject(error)
            }
        })
  
        return image
    } catch {
        return null
    }
  }

export { getS3Client, uploadImageToHydrobudMedia }
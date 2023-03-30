import { isNotionClientError, ClientErrorCode, APIErrorCode } from "@notionhq/client"

export const errorHandler = (err: unknown) => {
  if (isNotionClientError(err)) {
    {
      switch (err.code) {
        case ClientErrorCode.RequestTimeout:
          console.error("Request timeout")
          break
        case APIErrorCode.ObjectNotFound:
          console.error("Object not found")
          break
        case APIErrorCode.Unauthorized:
          console.error("Unauthorized")
          break
        // ...
        default:
          // you could even take advantage of exhaustiveness checking
          console.error("Unknown error")
      }
    }
    return true
  }
  return false
}
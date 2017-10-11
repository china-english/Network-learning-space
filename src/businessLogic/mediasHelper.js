
export default class MediasHelper {
  static getVideoRecordByVideoId (videoRecords = [], videoId) {
    return videoRecords.find(videoRecord => videoRecord.video === videoId)
  }
}

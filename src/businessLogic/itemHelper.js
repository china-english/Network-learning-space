export default class itemHelper {
  static getOptions (item) {
    // todo: add random order
    return Object.keys(item).filter(a => (a.length < 2 && item[a] != '')).map(i => ({value: i, content: item[i]}))
  }
}

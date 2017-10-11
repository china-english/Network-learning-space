
export default class TestpaperHelper {
  // 验证新增或修改的block不与其他block重复：1. block编号；2. 大题编号
  static partValidation (new_part, parts) {
    const other_parts = new_part.id ? parts.filter(part => part.id !== new_part.id) : parts
    if (other_parts.find(part => part.number === new_part.number)) {
      return false
    }

    const all_parts = other_parts.concat(new_part)
    all_parts.sort((part1, part2) => part1.start_number - part2.start_number)
    const repeat_flag = all_parts.reduce((a, x) => {
      if (x.start_number <= a.number) {
        a.flag = false
      }
      a.number = x.end_number
      return a
    }, { number: -1, flag: true })

    if (!repeat_flag.flag) {
      return false
    }

    return true
  }

  static getTestpaperTitleFromTestpapersTitlesById (testpapersTitles, id) {
    const testpaper = testpapersTitles.find(testpaper => testpaper.id == id)
    if (testpaper != null && testpaper != undefined) {
      console.log(testpaper)
      return testpaper.title
    }
    return undefined
  }

  static getTestpaperIdFromTestpapersTitlesByTitle (testpapersTitles, title) {
    const testpaper = testpapersTitles.find(testpaper => testpaper.title == title)
    if (testpaper != null && testpaper != undefined) {
      console.log(testpaper)
      return testpaper.id
    }
    return undefined
  }
}

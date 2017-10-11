export default class ExampaperHelper {
  static getExampaperById (exampapers, id) {
    return exampapers.find(exampaper => exampaper.id === id)
  }

  static getItemById (exampaper, id) {
    if (exampaper == null || exampaper.id == '') {
      return null
    }
    const selection = (exampaper.selections_relations &&
    exampaper.selections_relations.find(selection => selection.selection.id == id))
    if (selection) {
      return Object.assign({},
        {
          relationsId: selection.id,
          id: selection.selection.id,
          sequence: selection.serial_number,
          question: selection.selection.question,
          A: selection.selection.A,
          B: selection.selection.B,
          C: selection.selection.C,
          D: selection.selection.D,
          E: selection.selection.E,
          user_answer: selection.user_answer,
          type: 'selection'
        })
    }

    const judge = (exampaper.judges_relations &&
    exampaper.judges_relations.find(judge => judge.judge.id == id))
    if (judge) {
      return Object.assign({},
        {
          relationsId: judge.id,
          id: judge.judge.id,
          A: '正确',
          B: '错误',
          sequence: judge.serial_number,
          question: judge.judge.question,
          user_answer: judge.user_answer,
          type: 'judge'
        })
    }

    const multiselection = (exampaper.multiselections_relations &&
    exampaper.multiselections_relations.find(multiselection => multiselection.multiselection.id == id))
    if (multiselection) {
      return Object.assign({},
        {
          relationsId: multiselection.id,
          id: multiselection.multiselection.id,
          sequence: multiselection.serial_number,
          question: multiselection.multiselection.question,
          A: multiselection.multiselection.A,
          B: multiselection.multiselection.B,
          C: multiselection.multiselection.C,
          D: multiselection.multiselection.D,
          E: multiselection.multiselection.E,
          user_answer: multiselection.user_answer,
          type: 'multiselection'
        })
    }

    return (selection || judge || multiselection)
  }

  static getNextUnansweredItemId (exampaper) {
    const items = this.getExampaperItems(exampaper)
    const item = items.find(item => item.user_answer == '' || item.user_answer == null)
    if (item) {
      return item.id
    }
    return undefined
  }

  static getPreviousIdByCurrentIdFromItems (items, id) {
    const current = items.find(item => item.id === id)
    const previous = items.find(item => item.sequence == current.sequence - 1)
    if (previous) {
      return previous.id
    }
    return undefined
  }

  static getNextIdByCurrentIdFromItems (items, id) {
    const current = items.find(item => item.id === id)
    const next = items.find(item => item.sequence == current.sequence + 1)
    if (next) {
      return next.id
    }
    return undefined
  }

  static getExampaperItems (exampaper) {
    const getItems = (exampaper, str) => {
      const relationString = str + 's_relations'
      return exampaper[relationString].map(relation => ({
        id: relation[str].id,
        sequence: relation.serial_number,
        user_answer: relation.user_answer
      }))
    }
    const items = []
    exampaper.selections_relations && items.push(...getItems(exampaper, 'selection'))
    exampaper.judges_relations && items.push(...getItems(exampaper, 'judge'))
    exampaper.multiselections_relations && items.push(...getItems(exampaper, 'multiselection'))
    return items
  }

  static getAnsweredCount (exampaper) {
    const items = this.getExampaperItems(exampaper)
    return items.reduce((a, x) => {
      if (x.user_answer != null && x.user_answer != '') {
        a += 1
      }
      return a
    }, 0)
  }

  static getCount (exampaper) {
    return this.getExampaperItems(exampaper).length
  }

  static getSelectorsArray (originRelations = [], name = '') {
    // const relationName = name + 's_relations';
    const relations = (originRelations != null && originRelations != undefined) ? originRelations : []
    return relations.map(relation => (
      {
        sequence: relation.serial_number,
        id: relation[name].id,
        user_answer: relation.user_answer
      }))
  }
}

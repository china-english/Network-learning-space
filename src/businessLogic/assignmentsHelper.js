
export default class AssignmentsHelper {
  static getAssignmentById (assignments, id) {
    return assignments.find(assignment => assignment.id === id)
  }
}

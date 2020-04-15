export default class Utils {
  response (status, description) {
    var responseObject = {
      status: status,
      description: description
    }
    return responseObject
  }
}

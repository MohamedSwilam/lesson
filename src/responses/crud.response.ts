export class CrudResponse {
  /**
   *
   * @param data
   * @param message
   */
  browseResponse(data: [], message = 'Fetched Successfully') {
    return { message, data };
  }

  /**
   *
   * @param data
   * @param message
   */
  viewResponse(data: Record<string, any>, message = 'Fetched Successfully') {
    return { message, data };
  }

  /**
   *
   * @param data
   * @param message
   */
  createResponse(data: Record<string, any>, message = 'Created Successfully') {
    return { message, data };
  }

  /**
   *
   * @param data
   * @param message
   */
  updateResponse(data: Record<string, any>, message = 'Updated Successfully') {
    return { message, data };
  }

  /**
   *
   * @param data
   * @param message
   */
  deleteResponse(data: Record<string, any>, message = 'Deleted Successfully') {
    return { message, data };
  }

  /**
   *
   * @param data
   * @param message
   */
  customResponse(data: Record<string, any> | object[], message: string) {
    return { message, data };
  }
}

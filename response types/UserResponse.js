class UserResponse {
  constructor(data = null, message = null, isError = false) {
    this.data = data;        
    this.message = message;   
    this.isError = isError;
  }
}

export default UserResponse;


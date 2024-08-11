interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiResponseBuilder<T> {
  private response: ApiResponse<T>;

  constructor() {
    this.response = { success: true };
  }

  setSuccess(data: T, message?: string): ApiResponseBuilder<T> {
    this.response.success = true;
    this.response.data = data;
    this.response.message = message;
    return this;
  }

  setError(error: string, message?: string): ApiResponseBuilder<T> {
    this.response.success = false;
    this.response.error = error;
    this.response.message = message;
    return this;
  }

  build(): ApiResponse<T> {
    return this.response;
  }
}

export default ApiResponseBuilder;

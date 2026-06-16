const BASE_URL = "http://localhost:3000";

export class ApiClient {
  static async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
      ...options.headers as Record<string, string>,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (!options.body || typeof options.body === "string") {
      if (!headers["Content-Type"] && typeof options.body === "string") {
        headers["Content-Type"] = "application/json";
      }
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorMsg = "Erro na requisição";
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        // If it's not JSON, ignore
      }
      throw new Error(errorMsg);
    }

    if (response.status === 204) {
      return null as any;
    }

    return response.json();
  }

  static async get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  static async post<T = any>(endpoint: string, body: any): Promise<T> {
    const isFormData = body instanceof FormData;
    const headers: Record<string, string> = {};
    
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    return this.request<T>(endpoint, {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
  }

  static async put<T = any>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  static async delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

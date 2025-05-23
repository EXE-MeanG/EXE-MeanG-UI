// import axios from "axios";
// import { developmentURL } from "./constraints";

// const baseURL = developmentURL;

// export class Api {
//   constructor() {
//     this.instance = axios.create({
//       baseURL,
//       timeout: 10000,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   getOutsideApi(url, body) {
//     return this.instance.get(url, body);
//   }

//   getInstance() {
//     return this.instance;
//   }
// }

// const api = new Api();
// export default api;
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { developmentURL } from "./constraints";
import { useAuthStore } from "../stores/authStore";

const baseURL = developmentURL;

export class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupInterceptors();
  }
  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response interceptor: tự refresh token nếu 401
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = useAuthStore.getState().refreshToken;
            if (!refreshToken) throw new Error("No refresh token");

            const response = await axios.post(
              `${baseURL}api/v1/auth/refresh-token`,
              {
                refreshToken,
              }
            );

            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = response.data.data;

            useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.instance(originalRequest);
          } catch (err) {
            useAuthStore.getState().clearTokens();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );
  }
  // Generic GET method with optional config (params in body)
  public getOutsideApi<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

const api = new Api();
export default api;

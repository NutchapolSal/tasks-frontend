import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface AccessTokenDto {
            accessToken: string;
        }
        export interface AuthDto {
            email: string; // email
            rawPassword: string;
        }
        export interface ChangePasswordDto {
            rawOldPassword: string;
            rawNewPassword: string;
        }
        export interface CreateTaskDto {
            /**
             * Description of the task, can be empty
             */
            description: string;
            title: string;
            status: "pending" | "in_progress" | "completed";
        }
        export interface Task {
            taskId: string;
            title: string;
            description: string;
            status: "pending" | "in_progress" | "completed";
            userId: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        export interface UpdateTaskDto {
            /**
             * Description of the task, can be empty
             */
            description?: string;
            title?: string;
            status?: "pending" | "in_progress" | "completed";
        }
    }
}
declare namespace Paths {
    namespace AuthControllerChangePassword {
        export type RequestBody = Components.Schemas.ChangePasswordDto;
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace AuthControllerClearAllSessions {
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace AuthControllerDeleteUser {
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace AuthControllerGetNewAccessToken {
        namespace Responses {
            export type $200 = Components.Schemas.AccessTokenDto;
        }
    }
    namespace AuthControllerSignIn {
        export type RequestBody = Components.Schemas.AuthDto;
        namespace Responses {
            export type $200 = Components.Schemas.AccessTokenDto;
        }
    }
    namespace AuthControllerSignUp {
        export type RequestBody = Components.Schemas.AuthDto;
        namespace Responses {
            export type $200 = Components.Schemas.AccessTokenDto;
        }
    }
    namespace TasksControllerDeleteTask {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = number;
        }
    }
    namespace TasksControllerGetTask {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Task;
        }
    }
    namespace TasksControllerGetTasks {
        namespace Responses {
            export type $200 = Components.Schemas.Task[];
        }
    }
    namespace TasksControllerPatchTask {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateTaskDto;
        namespace Responses {
            export type $200 = Components.Schemas.Task;
        }
    }
    namespace TasksControllerPostTask {
        export type RequestBody = Components.Schemas.CreateTaskDto;
        namespace Responses {
            export type $201 = Components.Schemas.Task;
        }
    }
}

export interface OperationMethods {
  /**
   * TasksController_getTasks
   */
  'TasksController_getTasks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TasksControllerGetTasks.Responses.$200>
  /**
   * TasksController_postTask
   */
  'TasksController_postTask'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TasksControllerPostTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TasksControllerPostTask.Responses.$201>
  /**
   * TasksController_getTask
   */
  'TasksController_getTask'(
    parameters?: Parameters<Paths.TasksControllerGetTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TasksControllerGetTask.Responses.$200>
  /**
   * TasksController_patchTask
   */
  'TasksController_patchTask'(
    parameters?: Parameters<Paths.TasksControllerPatchTask.PathParameters> | null,
    data?: Paths.TasksControllerPatchTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TasksControllerPatchTask.Responses.$200>
  /**
   * TasksController_deleteTask
   */
  'TasksController_deleteTask'(
    parameters?: Parameters<Paths.TasksControllerDeleteTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TasksControllerDeleteTask.Responses.$200>
  /**
   * AuthController_getNewAccessToken
   */
  'AuthController_getNewAccessToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerGetNewAccessToken.Responses.$200>
  /**
   * AuthController_signIn
   */
  'AuthController_signIn'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerSignIn.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerSignIn.Responses.$200>
  /**
   * AuthController_clearAllSessions
   */
  'AuthController_clearAllSessions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerClearAllSessions.Responses.$204>
  /**
   * AuthController_signUp
   */
  'AuthController_signUp'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerSignUp.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerSignUp.Responses.$200>
  /**
   * AuthController_changePassword
   */
  'AuthController_changePassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerChangePassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerChangePassword.Responses.$204>
  /**
   * AuthController_deleteUser
   */
  'AuthController_deleteUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerDeleteUser.Responses.$204>
}

export interface PathsDictionary {
  ['/tasks']: {
    /**
     * TasksController_getTasks
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TasksControllerGetTasks.Responses.$200>
    /**
     * TasksController_postTask
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TasksControllerPostTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TasksControllerPostTask.Responses.$201>
  }
  ['/tasks/{id}']: {
    /**
     * TasksController_getTask
     */
    'get'(
      parameters?: Parameters<Paths.TasksControllerGetTask.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TasksControllerGetTask.Responses.$200>
    /**
     * TasksController_patchTask
     */
    'patch'(
      parameters?: Parameters<Paths.TasksControllerPatchTask.PathParameters> | null,
      data?: Paths.TasksControllerPatchTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TasksControllerPatchTask.Responses.$200>
    /**
     * TasksController_deleteTask
     */
    'delete'(
      parameters?: Parameters<Paths.TasksControllerDeleteTask.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TasksControllerDeleteTask.Responses.$200>
  }
  ['/auth/accesstoken']: {
    /**
     * AuthController_signIn
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerSignIn.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerSignIn.Responses.$200>
    /**
     * AuthController_getNewAccessToken
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerGetNewAccessToken.Responses.$200>
    /**
     * AuthController_clearAllSessions
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerClearAllSessions.Responses.$204>
  }
  ['/auth/user']: {
    /**
     * AuthController_signUp
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerSignUp.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerSignUp.Responses.$200>
    /**
     * AuthController_deleteUser
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerDeleteUser.Responses.$204>
    /**
     * AuthController_changePassword
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerChangePassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerChangePassword.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type AccessTokenDto = Components.Schemas.AccessTokenDto;
export type AuthDto = Components.Schemas.AuthDto;
export type ChangePasswordDto = Components.Schemas.ChangePasswordDto;
export type CreateTaskDto = Components.Schemas.CreateTaskDto;
export type Task = Components.Schemas.Task;
export type UpdateTaskDto = Components.Schemas.UpdateTaskDto;

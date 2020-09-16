type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value
}

declare type ConfigInterface = import('swr').ConfigInterface

declare namespace defs {
  export class ApiResponse {
    /** code */
    code?: number

    /** message */
    message?: string

    /** type */
    type?: string
  }

  export class Category {
    /** id */
    id?: number

    /** name */
    name?: string
  }

  export class Order {
    /** complete */
    complete?: boolean

    /** id */
    id?: number

    /** petId */
    petId?: number

    /** quantity */
    quantity?: number

    /** shipDate */
    shipDate?: string

    /** Order Status */
    status?: 'placed' | 'approved' | 'delivered'
  }

  export class Pet {
    /** category */
    category?: defs.Category

    /** id */
    id?: number

    /** name */
    name?: string

    /** photoUrls */
    photoUrls?: Array<string>

    /** pet status in the store */
    status?: 'available' | 'pending' | 'sold'

    /** tags */
    tags?: Array<defs.Tag>
  }

  export class Tag {
    /** id */
    id?: number

    /** name */
    name?: string
  }

  export class User {
    /** email */
    email?: string

    /** firstName */
    firstName?: string

    /** id */
    id?: number

    /** lastName */
    lastName?: string

    /** password */
    password?: string

    /** phone */
    phone?: string

    /** User Status */
    userStatus?: number

    /** username */
    username?: string
  }
}

declare namespace API {
  /**
   * Everything about your Pets
   */
  export namespace pet {
    /**
     * Add a new pet to the store
     * /pet
     */
    export namespace addPet {
      export class Params {}

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Update an existing pet
     * /pet
     */
    export namespace updatePet {
      export class Params {}

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
        * Finds Pets by status
Multiple status values can be provided with comma separated strings
        * /pet/findByStatus
        */
    export namespace findPetsByStatus {
      export class Params {
        /** Status values that need to be considered for filter */
        status: Array<string>
      }

      export type HooksParams = () => Params | Params

      export type Response = Array<defs.Pet>

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
        * Finds Pets by tags
Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
        * /pet/findByTags
        */
    export namespace findPetsByTags {
      export class Params {
        /** Tags to filter by */
        tags: Array<string>
      }

      export type HooksParams = () => Params | Params

      export type Response = Array<defs.Pet>

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
        * Find pet by ID
Returns a single pet
        * /pet/{petId}
        */
    export namespace getPetById {
      export class Params {
        /** ID of pet to return */
        petId: number
      }

      export type HooksParams = () => Params | Params

      export type Response = defs.Pet

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Updates a pet in the store with form data
     * /pet/{petId}
     */
    export namespace updatePetWithForm {
      export class Params {
        /** ID of pet that needs to be updated */
        petId: number
      }

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Deletes a pet
     * /pet/{petId}
     */
    export namespace deletePet {
      export class Params {
        /** Pet id to delete */
        petId: number
      }

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * uploads an image
     * /pet/{petId}/uploadImage
     */
    export namespace uploadFile {
      export class Params {
        /** ID of pet to update */
        petId: number
      }

      export type HooksParams = () => Params | Params

      export type Response = defs.ApiResponse

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }
  }

  /**
   * Access to Petstore orders
   */
  export namespace store {
    /**
        * Returns pet inventories by status
Returns a map of status codes to quantities
        * /store/inventory
        */
    export namespace getInventory {
      export class Params {}

      export type HooksParams = () => Params | Params

      export type Response = ObjectMap<any, number>

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Place an order for a pet
     * /store/order
     */
    export namespace placeOrder {
      export class Params {}

      export type HooksParams = () => Params | Params

      export type Response = defs.Order

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
        * Find purchase order by ID
For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
        * /store/order/{orderId}
        */
    export namespace getOrderById {
      export class Params {
        /** ID of pet that needs to be fetched */
        orderId: number
      }

      export type HooksParams = () => Params | Params

      export type Response = defs.Order

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
        * Delete purchase order by ID
For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
        * /store/order/{orderId}
        */
    export namespace deleteOrder {
      export class Params {
        /** ID of the order that needs to be deleted */
        orderId: number
      }

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }
  }

  /**
   * Operations about user
   */
  export namespace user {
    /**
        * Create user
This can only be done by the logged in user.
        * /user
        */
    export namespace createUser {
      export class Params {}

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Creates list of users with given input array
     * /user/createWithArray
     */
    export namespace createUsersWithArrayInput {
      export class Params {}

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Creates list of users with given input array
     * /user/createWithList
     */
    export namespace createUsersWithListInput {
      export class Params {}

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Logs user into the system
     * /user/login
     */
    export namespace loginUser {
      export class Params {
        /** The user name for login */
        username: string
        /** The password for login in clear text */
        password: string
      }

      export type HooksParams = () => Params | Params

      export type Response = string

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Logs out current logged in user session
     * /user/logout
     */
    export namespace logoutUser {
      export class Params {}

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
     * Get user by user name
     * /user/{username}
     */
    export namespace getUserByName {
      export class Params {
        /** The name that needs to be fetched. Use user1 for testing.  */
        username: string
      }

      export type HooksParams = () => Params | Params

      export type Response = defs.User

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
        * Updated user
This can only be done by the logged in user.
        * /user/{username}
        */
    export namespace updateUser {
      export class Params {
        /** name that need to be updated */
        username: string
      }

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }

    /**
        * Delete user
This can only be done by the logged in user.
        * /user/{username}
        */
    export namespace deleteUser {
      export class Params {
        /** The name that needs to be deleted */
        username: string
      }

      export type HooksParams = () => Params | Params

      export type Response = any

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      )

      export function trigger(params?: HooksParams, shouldRevalidate = true)

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error }

      export const method: string

      export function request(params?: Params, option = {}): Promise<Response>
    }
  }
}

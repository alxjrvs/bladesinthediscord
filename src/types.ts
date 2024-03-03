import { Database } from './database.types'


export type ClockUpdateParams = Database['public']['Tables']['clocks']['Update']
export type ClockCreateParams = Database['public']['Tables']['clocks']['Insert']
export type Clock = Database['public']['Tables']['clocks']['Row']
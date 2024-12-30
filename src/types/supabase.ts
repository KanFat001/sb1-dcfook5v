export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bets: {
        Row: {
          id: string
          created_at: string
          user_id: string
          sport: string
          event: string
          bet_type: string
          amount: number
          odds: number
          status: 'pending' | 'won' | 'lost'
          result_date: string | null
          profit_loss: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          sport: string
          event: string
          bet_type: string
          amount: number
          odds: number
          status?: 'pending' | 'won' | 'lost'
          result_date?: string | null
          profit_loss?: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          sport?: string
          event?: string
          bet_type?: string
          amount?: number
          odds?: number
          status?: 'pending' | 'won' | 'lost'
          result_date?: string | null
          profit_loss?: number
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string
          is_vip: boolean
          points: number
          avatar_url: string | null
          favorite_team: string | null
          favorite_sport: string | null
          total_profit: number
          total_bets: number
          winning_ratio: number
        }
        Insert: {
          id: string
          created_at?: string
          username: string
          is_vip?: boolean
          points?: number
          avatar_url?: string | null
          favorite_team?: string | null
          favorite_sport?: string | null
          total_profit?: number
          total_bets?: number
          winning_ratio?: number
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
          is_vip?: boolean
          points?: number
          avatar_url?: string | null
          favorite_team?: string | null
          favorite_sport?: string | null
          total_profit?: number
          total_bets?: number
          winning_ratio?: number
        }
      }
    }
  }
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      business_metrics: {
        Row: {
          cash_flow: number | null
          created_at: string | null
          customer_acquisition_cost: number | null
          customer_lifetime_value: number | null
          debt_to_equity_ratio: number | null
          expenses: number | null
          growth_rate: number | null
          id: string
          inventory_turnover: number | null
          market_share: number | null
          metric_date: string
          profit_margin: number | null
          revenue: number | null
          user_id: string
          working_capital: number | null
        }
        Insert: {
          cash_flow?: number | null
          created_at?: string | null
          customer_acquisition_cost?: number | null
          customer_lifetime_value?: number | null
          debt_to_equity_ratio?: number | null
          expenses?: number | null
          growth_rate?: number | null
          id?: string
          inventory_turnover?: number | null
          market_share?: number | null
          metric_date: string
          profit_margin?: number | null
          revenue?: number | null
          user_id: string
          working_capital?: number | null
        }
        Update: {
          cash_flow?: number | null
          created_at?: string | null
          customer_acquisition_cost?: number | null
          customer_lifetime_value?: number | null
          debt_to_equity_ratio?: number | null
          expenses?: number | null
          growth_rate?: number | null
          id?: string
          inventory_turnover?: number | null
          market_share?: number | null
          metric_date?: string
          profit_margin?: number | null
          revenue?: number | null
          user_id?: string
          working_capital?: number | null
        }
        Relationships: []
      }
      external_integrations: {
        Row: {
          api_endpoint: string | null
          created_at: string | null
          data_quality_score: number | null
          id: string
          integration_type: string
          last_updated: string | null
          provider_name: string
          status: string | null
          usage_count: number | null
          user_id: string
        }
        Insert: {
          api_endpoint?: string | null
          created_at?: string | null
          data_quality_score?: number | null
          id?: string
          integration_type: string
          last_updated?: string | null
          provider_name: string
          status?: string | null
          usage_count?: number | null
          user_id: string
        }
        Update: {
          api_endpoint?: string | null
          created_at?: string | null
          data_quality_score?: number | null
          id?: string
          integration_type?: string
          last_updated?: string | null
          provider_name?: string
          status?: string | null
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      financial_data_sources: {
        Row: {
          api_credentials: Json | null
          connection_status: string | null
          created_at: string | null
          data_points_collected: number | null
          id: string
          last_sync_at: string | null
          source_name: string
          source_type: string
          sync_frequency: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          api_credentials?: Json | null
          connection_status?: string | null
          created_at?: string | null
          data_points_collected?: number | null
          id?: string
          last_sync_at?: string | null
          source_name: string
          source_type: string
          sync_frequency?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          api_credentials?: Json | null
          connection_status?: string | null
          created_at?: string | null
          data_points_collected?: number | null
          id?: string
          last_sync_at?: string | null
          source_name?: string
          source_type?: string
          sync_frequency?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      financial_goals: {
        Row: {
          category: string
          created_at: string
          current_amount: number
          deadline: string | null
          id: string
          target_amount: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          current_amount?: number
          deadline?: string | null
          id?: string
          target_amount: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          current_amount?: number
          deadline?: string | null
          id?: string
          target_amount?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      insurance_policies: {
        Row: {
          coverage_amount: number | null
          created_at: string
          end_date: string | null
          id: string
          policy_name: string
          policy_type: string
          premium_amount: number | null
          provider: string
          start_date: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          coverage_amount?: number | null
          created_at?: string
          end_date?: string | null
          id?: string
          policy_name: string
          policy_type: string
          premium_amount?: number | null
          provider: string
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          coverage_amount?: number | null
          created_at?: string
          end_date?: string | null
          id?: string
          policy_name?: string
          policy_type?: string
          premium_amount?: number | null
          provider?: string
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ml_insights: {
        Row: {
          action_taken: boolean | null
          confidence_score: number | null
          created_at: string | null
          data_sources: string[] | null
          description: string
          expires_at: string | null
          id: string
          impact_level: string | null
          insight_type: string
          model_version: string | null
          recommendation: string | null
          title: string
          user_feedback: number | null
          user_id: string
        }
        Insert: {
          action_taken?: boolean | null
          confidence_score?: number | null
          created_at?: string | null
          data_sources?: string[] | null
          description: string
          expires_at?: string | null
          id?: string
          impact_level?: string | null
          insight_type: string
          model_version?: string | null
          recommendation?: string | null
          title: string
          user_feedback?: number | null
          user_id: string
        }
        Update: {
          action_taken?: boolean | null
          confidence_score?: number | null
          created_at?: string | null
          data_sources?: string[] | null
          description?: string
          expires_at?: string | null
          id?: string
          impact_level?: string | null
          insight_type?: string
          model_version?: string | null
          recommendation?: string | null
          title?: string
          user_feedback?: number | null
          user_id?: string
        }
        Relationships: []
      }
      portfolio_holdings: {
        Row: {
          created_at: string
          current_price: number | null
          id: string
          name: string
          purchase_date: string
          purchase_price: number
          shares: number
          symbol: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_price?: number | null
          id?: string
          name: string
          purchase_date: string
          purchase_price: number
          shares: number
          symbol: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_price?: number | null
          id?: string
          name?: string
          purchase_date?: string
          purchase_price?: number
          shares?: number
          symbol?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string
          id: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date?: string
          description: string
          id?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_journey_steps: {
        Row: {
          completed_at: string | null
          created_at: string | null
          data_collected: Json | null
          id: string
          notes: string | null
          step_category: string | null
          step_name: string
          success: boolean | null
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          data_collected?: Json | null
          id?: string
          notes?: string | null
          step_category?: string | null
          step_name: string
          success?: boolean | null
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          data_collected?: Json | null
          id?: string
          notes?: string | null
          step_category?: string | null
          step_name?: string
          success?: boolean | null
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          business_model: string | null
          business_stage: string | null
          company_name: string | null
          company_size: string | null
          created_at: string | null
          current_step: number | null
          employee_count: number | null
          founded_date: string | null
          id: string
          industry: string | null
          journey_started_at: string | null
          location: string | null
          monthly_revenue: number | null
          onboarding_completed: boolean | null
          target_market: string | null
          updated_at: string | null
          user_id: string
          website_url: string | null
        }
        Insert: {
          business_model?: string | null
          business_stage?: string | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string | null
          current_step?: number | null
          employee_count?: number | null
          founded_date?: string | null
          id?: string
          industry?: string | null
          journey_started_at?: string | null
          location?: string | null
          monthly_revenue?: number | null
          onboarding_completed?: boolean | null
          target_market?: string | null
          updated_at?: string | null
          user_id: string
          website_url?: string | null
        }
        Update: {
          business_model?: string | null
          business_stage?: string | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string | null
          current_step?: number | null
          employee_count?: number | null
          founded_date?: string | null
          id?: string
          industry?: string | null
          journey_started_at?: string | null
          location?: string | null
          monthly_revenue?: number | null
          onboarding_completed?: boolean | null
          target_market?: string | null
          updated_at?: string | null
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

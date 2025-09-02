
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  user_id: string;
  company_name?: string;
  industry?: string;
  company_size?: string;
  founded_date?: string;
  business_stage?: string;
  monthly_revenue?: number;
  employee_count?: number;
  location?: string;
  website_url?: string;
  business_model?: string;
  target_market?: string;
  journey_started_at: string;
  onboarding_completed: boolean;
  current_step: number;
}

export interface JourneyStep {
  id: string;
  user_id: string;
  step_name: string;
  step_category?: string;
  completed_at?: string;
  time_spent_seconds?: number;
  data_collected?: any;
  success: boolean;
  notes?: string;
}

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user profile:', error);
    throw error;
  }

  return data;
};

export const createOrUpdateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const existingProfile = await getUserProfile();
  
  if (existingProfile) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(profileData)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        ...profileData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export const trackJourneyStep = async (stepData: Omit<JourneyStep, 'id' | 'user_id'>): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('user_journey_steps')
    .insert({
      ...stepData,
      user_id: user.id
    });

  if (error) throw error;
};

export const getJourneySteps = async (): Promise<JourneyStep[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_journey_steps')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const hasUserStartedJourney = async (): Promise<boolean> => {
  const profile = await getUserProfile();
  return profile !== null;
};

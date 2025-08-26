
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  hasUserStartedJourney, 
  trackJourneyStep, 
  getUserProfile,
  createOrUpdateUserProfile,
  UserProfile 
} from '@/services/userJourneyService';

export const useJourneyTracking = () => {
  const { user } = useAuth();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkJourneyStatus = async () => {
      if (!user) {
        setHasStarted(false);
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        const started = await hasUserStartedJourney();
        setHasStarted(started);
        
        if (started) {
          const profile = await getUserProfile();
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error checking journey status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkJourneyStatus();
  }, [user]);

  const startJourney = async (initialData?: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const profile = await createOrUpdateUserProfile({
        current_step: 1,
        onboarding_completed: false,
        journey_started_at: new Date().toISOString(),
        ...initialData
      });
      
      await trackJourneyStep({
        step_name: 'journey_started',
        step_category: 'onboarding',
        completed_at: new Date().toISOString(),
        success: true,
        data_collected: initialData
      });
      
      setHasStarted(true);
      setUserProfile(profile);
      
      return profile;
    } catch (error) {
      console.error('Error starting journey:', error);
      throw error;
    }
  };

  const updateJourneyStep = async (stepName: string, stepData?: any) => {
    if (!user) return;
    
    try {
      await trackJourneyStep({
        step_name: stepName,
        step_category: 'progress',
        completed_at: new Date().toISOString(),
        success: true,
        data_collected: stepData
      });
    } catch (error) {
      console.error('Error tracking journey step:', error);
    }
  };

  return {
    hasStarted,
    userProfile,
    loading,
    startJourney,
    updateJourneyStep
  };
};

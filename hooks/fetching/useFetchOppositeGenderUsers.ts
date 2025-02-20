import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';

import { mock_users } from '~/content/users.content';
import { useSwipesContext } from '~/context/SwipesContext';
import { useUserStorage } from '~/store/user.store';
import { Gender } from '~/types/shared.types';
import { IUserProfile } from '~/types/user.types';
import { fetchFilteredProfiles } from '~/utils/fetch.utils';

const useFetchOppositeGenderUsers = () => {
  const { getToken, userId } = useAuth();
  const [data, setData] = useState<IUserProfile[]>([]);
  const { setIsSwipesLoading } = useSwipesContext();
  const { userGender } = useUserStorage();

  const fetchUsers = useCallback(async () => {
    setIsSwipesLoading(true);
    try {
      console.log('fetching users');
      if (!userGender) return;
      const token = await getToken({ template: 'supabase' });

      if (token && userId) {
        const userProfiles = await fetchFilteredProfiles(token, userId, userGender as Gender);

        setData((prev) => [...userProfiles, ...mock_users]);
      }
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setIsSwipesLoading(false);
    }
  }, [userId, userGender, setIsSwipesLoading]);

  useEffect(() => {
    console.log('useEffect, userGender:', userGender);
    if (userGender) fetchUsers();
  }, [userGender, fetchUsers]);

  return { data };
};

export default useFetchOppositeGenderUsers;

import { useAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_IMAGE } from '~/constants/variables';
import { fetchMatchingUsers } from '~/utils/fetch.utils';

type UserType = { user_id: string; image: string; isMine: boolean };

const useRetrieveMatch = (match_id: string) => {
  const { getToken, userId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<{ firstUser: UserType; secondUser: UserType }>({
    firstUser: { user_id: '', image: DEFAULT_IMAGE, isMine: false },
    secondUser: { user_id: '', image: DEFAULT_IMAGE, isMine: false },
  });

  useEffect(() => {
    retrieveMatchData();
  }, [match_id]);

  const retrieveMatchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken({ template: 'supabase' });
      if (!token || !userId) return;

      const [firstUser, secondUser] = await fetchMatchingUsers(token, match_id, userId);
      setUsers({ firstUser, secondUser });
    } catch (error) {
      console.error('Error retrieving match data', error);
    } finally {
      setLoading(false);
    }
  }, [match_id, userId]);

  const getChatId = () => {
    return users.firstUser.user_id === userId ? users.secondUser.user_id : users.firstUser.user_id;
  };

  return { loading, users, retrieveMatchData, getChatId };
};

export default useRetrieveMatch;

import { useEffect, useState } from 'react';

import { mock_full_users } from '~/content/users.content';
import { IUserFullProfile } from '~/types/user.types';

const useFetchUser = (id: string | undefined) => {
  const [user, setUser] = useState<IUserFullProfile | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const fetchedUser = mock_full_users.find((user) => user.id === id);
    setUser(fetchedUser);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [id]);

  return { user, loading };
};

export default useFetchUser;

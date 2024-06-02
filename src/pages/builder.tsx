// pages/builder.tsx
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BuilderLayout from 'src/modules/builder/BuilderLayout';

const BuilderPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return user ? <BuilderLayout /> : null;
};

export default BuilderPage;

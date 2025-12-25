// src/hooks/useFaculty.ts
import {useState, useEffect} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '@/services/firebase';
import type {
  FacultyWithId,
  UseFacultyReturn,
  FacultyType,
} from '@/types/otherTypes';
import {logger} from '../../utils/logger';

export const useFaculty = (type?: FacultyType): UseFacultyReturn => {
  const [faculty, setFaculty] = useState<FacultyWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      setError(null);

      const facultyRef = collection(db, 'faculty');

      let q;
      if (type) {
        q = query(facultyRef, where('type', '==', type));
      } else {
        q = query(facultyRef);
      }

      const querySnapshot = await getDocs(q);
      const facultyData: FacultyWithId[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        facultyData.push({
          id: doc.id,
          name: data.name,
          degrees: data.degrees,
          position: data.position,
          image: data.image,
          details: data.details,
          type: data.type,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        } as FacultyWithId);
      });

      setFaculty(facultyData);
    } catch (err) {
      setError(err as Error);
      logger.error('Error fetching faculty:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchFaculty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return {faculty, loading, error, refetch: fetchFaculty};
};

// Specific hooks for convenience
export const usePrincipal = () => useFaculty('principal');
export const useProfessors = () => useFaculty('professor');
export const useNonTeachingStaff = () => useFaculty('non-teaching');
export const useGuestFaculty = () => useFaculty('guest');

import { useCallback, useEffect, useState } from 'react';
import { getActiveNotes, getArchivedNotes } from '../utils/network-data';

function useNotes(fetchNotes) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError(false);
    const result = await fetchNotes();
    if (result.error) {
      setError(true);
    } else {
      setNotes(result.data);
    }
    setLoading(false);
  }, [fetchNotes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes, loading, error, refetch: loadNotes,
  };
}

const useActiveNotes = () => useNotes(getActiveNotes);
const useArchivedNotes = () => useNotes(getArchivedNotes);

export { useNotes, useActiveNotes, useArchivedNotes };

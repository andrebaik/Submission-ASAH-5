import { useCallback, useEffect, useState } from 'react';
import { getNote } from '../utils/network-data';

function useNote(id) {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadNote = useCallback(async () => {
    setLoading(true);
    setError(false);
    const result = await getNote(id);
    if (result.error) {
      setError(true);
      setNote(null);
    } else {
      setNote(result.data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadNote();
  }, [loadNote]);

  return {
    note, loading, error, refetch: loadNote,
  };
}

export default useNote;

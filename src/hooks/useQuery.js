import { useReducer, useCallback, useEffect, useState } from 'react';
import queryReducer from './utils/reducer';
import useStore from './useStore';

export default function useQuery() {
  const store = useStore();
  const dataStore = store.memory;
  const [state = {}, dispatch] = useReducer(queryReducer);
  const [_query, setQuery] = useState();

  useEffect(() => {
    let subscription;
    if (_query) {
      subscription = dataStore.cache.liveQuery(_query).subscribe((cacheLiveQuery) => {
        let data = cacheLiveQuery.query();
        dispatch({
          type: 'DATA_UPDATE',
          payload: { data },
        });
      });
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [dataStore, _query]);

  useEffect(() => {
    async function fetch(query) {
      try {
        const data = await dataStore.query(query);
        dispatch({
          type: 'DATA_UPDATE',
          payload: { data },
        });
      } catch (e) {
        // noop
        debugger
      }
    }
    if (_query) {
      fetch(_query);
    }
  }, [dataStore, _query]);

  const query = useCallback(
    query => {
      setQuery(() => query)
    },
    [setQuery]
  );

  return { ...state, query };
}

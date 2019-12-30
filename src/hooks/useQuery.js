import {useReducer, useCallback, useEffect, useState} from 'react';
import queryReducer from './utils/reducer';
import useStore from './useStore';

export default function useQuery() {
  const store = useStore();
  const [state = {}, dispatch] = useReducer(queryReducer);
  const [_query, setQuery] = useState();

  useEffect(() => {
    let unsubscribe;
    let immediate = true;
    if (_query) {
      unsubscribe = store.memory.cache.liveQuery(_query).on((data) => {
        dispatch({
          type: immediate ? 'DATA_LOADING' : 'DATA_UPDATE',
          payload: {data},
        });
        immediate = false;
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store.memory, _query]);

  useEffect(() => {
    async function fetch(query) {
      try {
        await store.memory.query(query);
      } catch (e) {
        // noop
      }
    }
    if (_query) {
      fetch(_query);
    }
  }, [store.memory, _query]);

  const query = useCallback(
    (query) => {
      setQuery(() => query);
    },
    [setQuery]
  );

  return {...state, query};
}

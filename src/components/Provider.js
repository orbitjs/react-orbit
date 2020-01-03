import React, { useState, useEffect, useRef } from 'react';
import Coordinator from '@orbit/coordinator';
import ReactOrbitContext from './Context';

export default function Store({ memorySource, remoteSource, addStrategies, children }) {
  const sourcesRef = useRef({ memory: memorySource, remote: remoteSource });
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function initializeCoordinator() {
      const coordinator = new Coordinator({
        sources: [sourcesRef.current.memory, sourcesRef.current.remote],
      });
      addStrategies(coordinator);
      await coordinator.activate();
      setIsInitializing(false);
    }
    initializeCoordinator();
  }, [addStrategies]);

  useEffect(() => {
    const memorySource = sourcesRef.current.memory;
    function skipTaskOnRequestQueue(e) {
      console.log('Request task error on memory source, Skipping', e);
      return memorySource.requestQueue.skip();
    }
    if (memorySource) {
      memorySource.requestQueue.on('fail', skipTaskOnRequestQueue);
      return () => {
        memorySource.requestQueue.off('fail', skipTaskOnRequestQueue);
      }
    }
  }, []);

  if (isInitializing) {
    return null;
  }
  return (
    <ReactOrbitContext.Provider value={sourcesRef.current}>{children}</ReactOrbitContext.Provider>
  );
}

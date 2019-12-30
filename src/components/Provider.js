import React, {useState, useEffect, useRef} from 'react';
import Coordinator from '@orbit/coordinator';
import ReactOrbitContext from './Context'

export default function Store({memorySource, remoteSource, addStrategies, children}) {
  const sourcesRef = useRef({memory: memorySource, remote: remoteSource});
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

  if (isInitializing) {
    return null;
  }
  return <ReactOrbitContext.Provider value={sourcesRef.current}>{children}</ReactOrbitContext.Provider>;
}

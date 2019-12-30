import React from 'react';

const ReactOrbitContext = React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  ReactOrbitContext.displayName = 'ReactOrbit'
}

export default ReactOrbitContext;

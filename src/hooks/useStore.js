import { useContext } from 'react';
import ReactOrbitContext from '../components/Context';

export default function useStore() {
  return useContext(ReactOrbitContext);
}

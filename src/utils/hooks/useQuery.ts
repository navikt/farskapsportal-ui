import { useLocation } from 'react-router-dom';

// TODO: do we require support for IE?
export const useQuery = () => new URLSearchParams(useLocation().search);

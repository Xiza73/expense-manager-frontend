import './styles/loader.scss';

import { useLoader } from '@/store/loader/useLoader';

import Backdrop from '../Backdrop';

export interface LoaderProps {
  loading?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
  const { activeLoaders, isFetching, hideLoader } = useLoader();

  if (!activeLoaders && !isFetching && !loading) return null;

  if (hideLoader) return null;

  return (
    <Backdrop>
      <span className="loader"></span>
    </Backdrop>
  );
};

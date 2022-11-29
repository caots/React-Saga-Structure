import { MapCustom } from 'app/components/MapCustom';
import { useAppDispatch } from 'setup/redux/Hooks';
import { PageTitle } from 'theme/layout/components/HeadTitle';
import { homeActions } from './redux/HomeSlice';
import './style.scss';

type Props = {
}

const HomePage: React.FC<Props> = ({ }) => {
  PageTitle('Home');
  const dispatch = useAppDispatch();

  const openModalInfo = () => {
    dispatch(homeActions.setActionStationInfoModel({ status: true, data: null }));
  }

  return (
    <>
      <div>
        <MapCustom openModalPointInfo={openModalInfo} />
      </div>
    </>
  )

}

export default HomePage;
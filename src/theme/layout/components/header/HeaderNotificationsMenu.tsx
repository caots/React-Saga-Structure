/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap-v5';
import './style.scss';

import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '../../../../app/utils/helpers';
import { useAppDispatch } from '../../../../setup/redux/Hooks';

type Props = {
  loading?: boolean,
  onRefresh?: () => void,
}


const HeaderNotificationsMenu: React.FC<Props> = ({ loading, onRefresh }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
      data-kt-menu='true'
    >
      <Tab.Container id="notification-app" defaultActiveKey="update">
        <Row className='app-notification'>
          <Col sm={12} className='rounded-top menu-tab' style={{ backgroundImage: `url('${toAbsoluteUrl('/media/misc/pattern-1.jpg')}')` }}>
            <div className='d-flex justify-content-between'>
              <h3 className='text-white fw-bold py-5 px-5'>
                {t('HEADER.MENU.NOTIFICATIONS')} <span className='fs-8 opacity-75 ps-3'>{1} {t('HEADER.MENU.REPORTS')}</span>
              </h3>
              <Button variant='' className='btn-sm' onClick={() => onRefresh?.()}>
                <i className="fas fa-sync text-white"></i>
              </Button>
            </div>

            <Nav variant="pills" className='ms-2'>
              <Nav.Item>
                <Nav.Link eventKey="log">{t('HEADER.MENU.LOGS')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="update">{t('HEADER.MENU.UPDATES')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="alert">{t('HEADER.MENU.ALERTS')}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12} className='p-0 bg-white rounded-bottom'>
            <Tab.Content>
              <Tab.Pane eventKey="log">

                <div className='py-10 text-center border-top'>
                  <div className='text-muted'> No message today </div>
                </div>

              </Tab.Pane>
              <Tab.Pane eventKey="update">
                {loading ?
                  <div className='py-10 text-center border-top'>
                    <div className="spinner-border spinner-border-sm text-dark" role="status"></div>
                  </div>
                  :
                  <div className='overflow-auto mh-500px'>
                  </div>
                }

              </Tab.Pane>
              <Tab.Pane eventKey="alert">
                <div className='py-10 text-center border-top'>
                  <div className='text-muted'> No message today </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div >
  )
}
export { HeaderNotificationsMenu };

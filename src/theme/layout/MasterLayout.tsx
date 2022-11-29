import HomeModal from 'app/modules/home/modals/HomeModals';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MenuComponent } from '../assets/ts/components';
import { AsideDefault } from './components/aside/AsideDefault';
import { Content } from './components/Content';
import { HeaderWrapper } from './components/header/HeaderWrapper';
import { ScrollTop } from './components/ScrollTop';
import { PageDataProvider } from './core';

const MasterLayout: React.FC = ({ children }) => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />
          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              {/* <Toolbar /> */}
              <Content>{children}</Content>
            </div>
          </div>
        </div>
      </div>
      {/* begin:: Modals */}
      <HomeModal />
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export { MasterLayout }

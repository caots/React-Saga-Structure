/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap-v5';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ForgotPassword } from './components/ForgotPassword';
import { Login } from './components/Login';
import { Registration } from './components/Registration';

export function AuthPage() {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <Row className='h-100 overflow-auto g-0'>
      <Col sm={12} md={7}>
        <div className='bg-white p-10 p-lg-15 mx-auto col-md-9'>
          <Switch>
            <Route path='/auth/login' component={Login} />
            <Route path='/auth/registration' component={Registration} />
            <Route path='/auth/forgot-password' component={ForgotPassword} />
            <Redirect from='/auth' exact={true} to='/auth/login' />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
        <div className='p-10 text-center p-lg-15 mx-auto col-md-9' style={{direction: 'ltr'}} >
          <span>Copyrights © 2021 All Information is copyrighted for <span className='text-main'>B8ak Ltd</span>.</span>
        </div>
      </Col>
      <Col
        className='d-none d-sm-block'
        md={5}
        style={{backgroundImage: `url("/assets/images/banner/login-banner.png")`, backgroundSize: "cover"}}
      >
        
      </Col>
    </Row>
  )
}

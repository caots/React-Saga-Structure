import { Error500 } from 'app/modules/errors/components/Error500';
import { toAbsoluteUrl } from 'app/utils/helpers';
import Tracking from 'app/utils/helpers/Tracking';
import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';

const ErrorFallback = () => {
  return (
    <div className='d-flex flex-column flex-root'>
      <div
        className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
        style={{ backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/progress-hd.png')}')` }}
      >
        <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-20'>
          <a href='/dashboard' className='mb-10 pt-lg-20'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/logo-1.svg')}
              className='h-50px mb-5'
            />
          </a>
          <div className='pt-lg-10 mb-10'>
            <Error500 />

            <div className='text-center'>
              <a href='/' className='btn btn-lg btn-primary fw-bolder'>
                Go to homepage
              </a>
            </div>
          </div>
          <div
            className='
      d-flex
      flex-row-auto
      bgi-no-repeat
      bgi-position-x-center
      bgi-size-contain
      bgi-position-y-bottom
      min-h-100px min-h-lg-350px
    '
            style={{
              backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/sketchy-1/17.png')}')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={(error, info) => Tracking.error({ e: error, info })}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;

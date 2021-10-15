import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./otherComponent'));

const lazy = () => {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  )
}

export default lazy

import React, { Suspense, useEffect } from 'react';
import { NotFound } from '../components/error';
import { Loading } from '../components/loading';
import { navigateToPath } from '../utils/navigation';
import { getParsedURL } from '../utils/url';
import { DashboardPage } from '../pages/dashboard.tsx';

const UserList = React.lazy(() => import('../pages/user-list'));

const usersListPath = '/users/';

interface PageProps {
  pathname: string;
  params: {
    [k: string]: any;
  };
}

function DashboardRouteView({ pathname }: PageProps) {
  switch (pathname) {
    case '/':
      navigateToPath(usersListPath);
      return <Loading />;
    case usersListPath:
      return <UserList />;
    default:
      return <NotFound />;
  }
}

export default function PageFromURL() {
  const {
    pathname,
    searchParams: params,
    url,
  } = getParsedURL(window.location.href);
  useEffect(() => {
    if (url.pathname !== pathname) {
      window.history.replaceState(null, '', pathname + url.search);
    }
  }, [pathname, url]);

  return (
    <Suspense fallback={<Loading />}>
      <DashboardPage>
        <DashboardRouteView pathname={pathname} params={params} />
      </DashboardPage>
    </Suspense>
  );
}

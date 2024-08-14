import ErrorPage from './error';

export default function NotFound({
  showHomeNav = true,
}: {
  showHomeNav?: boolean;
}) {
  return (
    <ErrorPage
      title="404"
      subtitle="Page Not Found"
      description="The page you're looking for does not seem to exist"
      navigate={
        showHomeNav ? { path: '/users', label: 'Go to Home' } : undefined
      }
    />
  );
}

export default function ErrorPage({ searchParams }) {
    const error = searchParams.error || "An unknown error occurred";
    return (
      <div>
        <h1>Authentication Error</h1>
        <p>{error}</p>
        <a href="/auth/login">Back to login</a>
      </div>
    );
  }

  export const metadata = {
    title: 'CEMS-Error',
  }
  
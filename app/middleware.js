// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/', // Redirect to the home page if not authenticated
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*', // Protect all routes under /dashboard
    '/profile/:path*', // Protect profile routes
    '/events/:path*',  // Protect events route
  ],
};

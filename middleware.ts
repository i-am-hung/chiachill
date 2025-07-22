import { updateSession } from './src/lib/supabase/middleware';

export const middleware = updateSession;

// Uncomment and adjust the matcher if you need to exclude paths (optional)
// export const config = {
//   matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
// }; 
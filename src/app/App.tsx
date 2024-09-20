import { Router } from '@solidjs/router';

import { routes } from '@/shared/route';

export function App() {
  return (
    <Router>
      {routes}
    </Router>
  );
}

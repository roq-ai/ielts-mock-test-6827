const mapping: Record<string, string> = {
  organizations: 'organization',
  results: 'result',
  tests: 'test',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

export const VISIT_TIMESTAMP_KEY = 'last_visit_timestamp';
export const VISIT_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export const getVisitTimestamp = (): number | null => {
  const stored = localStorage.getItem(VISIT_TIMESTAMP_KEY);
  return stored ? parseInt(stored, 10) : null;
};

export const updateVisitTimestamp = () => {
  localStorage.setItem(VISIT_TIMESTAMP_KEY, Date.now().toString());
};

export const isVisitExpired = (): boolean => {
  const lastVisit = getVisitTimestamp();
  if (!lastVisit) return true;
  return Date.now() - lastVisit > VISIT_TIMEOUT_MS;
};

export const clearVisitTimestamp = () => {
  localStorage.removeItem(VISIT_TIMESTAMP_KEY);
};

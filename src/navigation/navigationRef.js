export const MAIN_STACK_ROUTE = 'MainStack';

export const getActiveStackRouteName = (state) => {
  if (!state?.routes?.length) return 'Dashboard';
  const drawerRoute = state.routes[state.index];
  const stackState = drawerRoute?.state;
  if (stackState?.routes?.length) {
    return stackState.routes[stackState.index]?.name ?? 'Dashboard';
  }
  return drawerRoute?.name === MAIN_STACK_ROUTE ? 'Dashboard' : drawerRoute?.name ?? 'Dashboard';
};

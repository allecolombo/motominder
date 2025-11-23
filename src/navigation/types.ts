/**
 * Navigation Types
 * TypeScript types for React Navigation
 */

/**
 * Auth Stack - Screens before user is authenticated
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

/**
 * Main Stack - Screens after user is authenticated
 */
export type MainStackParamList = {
  Home: undefined;
  MotoList: undefined;
  AddMoto: undefined;
  MotoDetail: { motoId: string };
  // Future screens:
  // Deadlines: undefined;
  // Maintenance: undefined;
  // Costs: undefined;
  // MotoGP: undefined;
  // Settings: undefined;
};

/**
 * Root Stack - Top-level navigation
 */
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

// Define constants using the helper function
export const DATABASE_ID = getEnvVar('NEXT_PUBLIC_APPWRITE_DATABASE_ID');
export const WORKSPACES_ID = getEnvVar('NEXT_PUBLIC_APPWRITE_WORKSPACES_ID');
export const MEMBERS_ID = getEnvVar('NEXT_PUBLIC_APPWRITE_MEMBERS_ID');
export const PROJECTS_ID = getEnvVar('NEXT_PUBLIC_APPWRITE_PROJECTS_ID');
export const TASKS_ID = getEnvVar('NEXT_PUBLIC_APPWRITE_TASKS_ID');
export const IMAGES_BUCKET_ID = getEnvVar(
  'NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID'
);

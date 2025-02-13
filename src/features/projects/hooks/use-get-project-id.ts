import { useParams } from 'next/navigation';

export const useGetProjectId = () => {
  const params = useParams();
  return params.projectId as string;
};

import { useParams } from 'next/navigation';

export const useGetTaskId = () => {
  const params = useParams();
  return params.taskId as string;
};

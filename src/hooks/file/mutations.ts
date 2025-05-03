import { postResourceFormData } from '@common/crud';
import { useMutation } from '@tanstack/react-query';

export const useFileUpload = () => {
  return useMutation({
    mutationKey: ['fileUpload'],
    mutationFn: async (file: File) => {
      let form = new FormData();
      form.append('file', file);
      return (await postResourceFormData('file', form)()) as APIFileUplaodResponse;
    },
  });
};

import { api } from '@common/api';
import { postResourceFormData } from '@common/crud';
import { useMutation } from '@tanstack/react-query';

export const useFileUpload = () => {
  return useMutation({
    mutationKey: ['fileUpload'],
    mutationFn: async (file: File) => {
      let form = new FormData();
      form.append('file', file);
      return (await postResourceFormData(api.fileUpload, form)()) as APIFileUplaodResponse;
    },
  });
};

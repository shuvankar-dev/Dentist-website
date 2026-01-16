import { toast } from "sonner";

export const useToast = () => {
  return {
    toast,
    dismiss: toast.dismiss,
  };
};

export { toast };

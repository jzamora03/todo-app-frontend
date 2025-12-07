import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

export const ToastIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    case 'error':
      return <XCircle className="w-6 h-6 text-red-500" />;
    case 'warning':
      return <AlertCircle className="w-6 h-6 text-orange-500" />;
    default:
      return <Info className="w-6 h-6 text-blue-500" />;
  }
};
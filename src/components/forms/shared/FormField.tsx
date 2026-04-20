import type { PropsWithChildren } from 'react';

interface FormFieldProps { label: string; }

export default function FormField({ label, children }: PropsWithChildren<FormFieldProps>) {
  return <div><label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>{children}</div>;
}

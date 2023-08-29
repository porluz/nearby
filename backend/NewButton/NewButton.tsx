export const NewButton = ({ title }: { title?: string }) => {
  const label = title ?? "Click me";
  return <button>{label}</button>;
};

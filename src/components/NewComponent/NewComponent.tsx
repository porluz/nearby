export const NewComponent = ({ title }: { title?: string }) => {
  const text = title ?? "Hello World";
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

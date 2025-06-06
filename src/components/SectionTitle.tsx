export default function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-sm">{description}</p>
    </>
  );
}

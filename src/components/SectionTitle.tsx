import TextGradient from "./TextGradient";

export default function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">
        <TextGradient from="from-primary" via="via-secondary" to="to-accent" text={title} />
      </h2>
      <p className="text-sm text-neutral">{description}</p>
    </>
  );
}

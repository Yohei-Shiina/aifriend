export default function TitleDivider({ title }: { title: string }) {
  return (
    <div className="flex w-full flex-col">
      <div className="divider">
        <h2 className="text-2xl">{title}</h2>
      </div>
    </div>
  );
}

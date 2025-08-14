type TextGradientProps = {
  from: string;
  via: string;
  to: string;
  text?: string;
  children?: React.ReactNode;
};

export default function TextGradient(props: TextGradientProps) {
  const { from, via, to, text, children } = props;
  return (
    <span
      className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent font-normal`}
    >
      {text}
      {children}
    </span>
  );
}

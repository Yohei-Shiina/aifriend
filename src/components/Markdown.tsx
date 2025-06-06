import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => {
            return <h1 className="text-xl md:text-4xl" {...props}></h1>;
          },
          h2: (props) => {
            return <h2 className="text-lg md:text-3xl" {...props} />;
          },
          h3: (props) => {
            return <h3 className="text-md md:text-2xl" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

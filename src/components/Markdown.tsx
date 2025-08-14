import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import TextGradient from "./TextGradient";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => {
            const { children } = props;
            return (
              <>
                <h1 className="text-xl md:text-3xl text-secondary mb-0">
                  <TextGradient from="from-primary" via="via-secondary" to="to-accent">
                    {children}
                  </TextGradient>
                </h1>
                <div className="divider"></div>
              </>
            );
          },
          h2: (props) => {
            const { children } = props;
            return (
              <>
                <h2 className="text-lg md:text-2xl text-secondary">
                  <TextGradient from="from-primary" via="via-secondary" to="to-accent">
                    {children}
                  </TextGradient>
                </h2>
                <div className="divider"></div>
              </>
            );
          },
          h3: (props) => {
            const { children } = props;
            return (
              <>
                <h3 className="text-md md:text-xl text-accent">
                  <TextGradient from="from-primary" via="via-secondary" to="to-accent">
                    {children}
                  </TextGradient>
                </h3>
                <div className="divider"></div>
              </>
            );
          },
          p: (props) => {
            const { children } = props;
            return (
              <p className="text-sm md:text-lg text-neutral leading-7 md:leading-10">{children}</p>
            );
          },
          ul: (props) => {
            const { children } = props;
            return <ul className="text-sm md:text-lg text-neutral">{children}</ul>;
          },
          a: (props) => {
            const { children, href } = props;
            return (
              <a
                href={href}
                className="text-primary! hover:text-secondary!"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

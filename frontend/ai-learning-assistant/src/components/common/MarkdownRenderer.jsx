import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="text-neutral-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h1 className="text-xl font-bold mb-2 mt-4" {...props} />,
          h2: (props) => <h2 className="text-lg font-semibold mb-2 mt-4 " {...props} />,
          h3: (props) => <h3 className="text-md font-medium mb-2 mt-3" {...props} />,
          h4: (props) => <h4 className="text-sm font-medium mb-1 mt-3" {...props} />,

          p: (props) => <p className=" mb-2 leading-relaxed" {...props} />,

          a: (props) => (
            <a
              className="text-[#00d492] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          ul: (props) => <ul className="list-disc list-inside ml-4 mb-2" {...props} />,
          ol: (props) => <ol className="list-decimal list-inside ml-4 mb-2" {...props} />,
          li: (props) => <li className="mb-1" {...props} />,

          strong: (props) => <strong className="font-semibold" {...props} />,
          em: (props) => <em className="italic" {...props} />,

          blockquote: (props) => (
            <blockquote className="border-l-4 border-neutral-300 pl-4 italic text-neutral-600 my-4" {...props} />
          ),

          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-neutral-100 p-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },

          pre: (props) => <pre className="bg-neutral-800 text-white p-3 rounded-md overflow-x-auto font-mono text-sm my-4" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
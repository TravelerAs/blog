"use client";

import { useMDXComponent } from "@content-collections/mdx/react";
import Image from "./Image";
import Pre from "./Pre";

export default function MDXContentMain({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="markdown-docs prose max-w-full" id="markdown-docs">
      <Component
        components={{
          pre: Pre,
          img: Image,
        }}
      />
    </div>
  );
}

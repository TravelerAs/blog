import NavigationLink from "./NavigationLink";
import { MetadataConfig } from "@/lib/metadata";

export default function HeaderMain() {
  return (
    <header>
      <h1 className="text-xl font-bold">
        <NavigationLink
          href="/"
          className="hover:no-underline! text-current mr-0!"
        >
          {MetadataConfig.metadata.title.default}
        </NavigationLink>
      </h1>
      <nav className="my-4 text-sm">
        <NavigationLink href="/">关于</NavigationLink>
        <NavigationLink href="/posts">文章</NavigationLink>
        <NavigationLink
          href="https://wallpapers-phi.vercel.app/"
          target="_blank"
        >
          壁纸
        </NavigationLink>
        <NavigationLink href="/photography">摄影</NavigationLink>
        <NavigationLink href="/rss.xml">RSS</NavigationLink>
      </nav>
    </header>
  );
}

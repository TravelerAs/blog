import RSSGenerator from "@/lib/rss";
import { parseISO, setHours } from "date-fns";
import { baseUrl } from "@/lib/config";
import { postsOrderedByDate } from "@/lib/posts";
import { IRSSChannel } from "@/lib/types";
import { MetadataConfig } from "@/lib/metadata";

const createPostUrl = (url: string) => {
  return url + "?utm_campaign=feed&utm_source=rss2";
};

const feedChannel: IRSSChannel = {
  title: MetadataConfig.metadata.title.default,
  link: baseUrl,
  description: `Recent content on ${MetadataConfig.metadata.title.default}`,
  language: "zh-cn",
  generator: "RSS 2.0",
  lastBuildDate: new Date(),
  atomLink: {
    href: baseUrl + "/rss.xml",
    rel: "self",
    type: "application/rss+xml",
  },
  managingEditor: `implicit-charm@foxmail.com (${MetadataConfig.metadata.title.default})`,
  docs: "https://www.rssboard.org/rss-specification",
};

const createFeed = async () => {
  const feed = new RSSGenerator(feedChannel);

  postsOrderedByDate.forEach((post) => {
    const id = `${baseUrl}${post.url}`;
    const url = createPostUrl(id);
    feed.addItem({
      title: post.title,
      link: url,
      pubDate: setHours(parseISO(post.date), 13),
      description: post.description,
      categories: [post.category],
      guid: {
        value: url,
      },
    });
  });

  return feed.generate();
};

export const GET = async () => {
  const feed = await createFeed();
  return new Response(feed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};

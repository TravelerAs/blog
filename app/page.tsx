import { compareDesc, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import type { Posts } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";
import HeaderBox from "@/components/HeaderBox";
import { FollowMe } from "@/lib/nav";
import { AccType, GroupPostsType } from "@/types";

export default function Home() {
  const groupedAllPosts = allPosts.reduce((acc: AccType, item) => {
    const { date } = item;
    acc[format(date, "yyyy")] = acc[format(date, "yyyy")] || [];
    acc[format(date, "yyyy")].push(item);
    return acc;
  }, {});
  const sortedAllPosts = Object.entries(groupedAllPosts)
    .map(([year, data]) => {
      return { year, data };
    })
    .sort(
      (a: GroupPostsType, b: GroupPostsType) =>
        parseInt(b.year) - parseInt(a.year)
    )
    .map((item: GroupPostsType) => ({
      ...item,
      data: item.data.sort((a: Posts, b: Posts) =>
        compareDesc(new Date(a.date), new Date(b.date))
      ),
    }));
  return (
    <main>
      <HeaderBox />
      {/* banner */}
      <section className="relative md:h-80 h-52">
        <Image
          src="/images/anime_character_embrace_scene.webp"
          alt=""
          fill
          priority
          sizes="100%"
          className="rounded-lg object-cover"
        />
      </section>
      {/* Follow Me */}
      <section>
        <div className="font-bold my-4 text-lg">Follow Me</div>
        <div>
          <ul className="flex flex-wrap">
            {FollowMe.map((me) => (
              <li key={me.title} className="pr-4">
                <Link
                  href={me.isEmail ? `mailto:${me.url}` : me.url}
                  className="hover:text-[#27AE60]"
                >
                  {me.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Recent Posts */}
      <section>
        <div className="font-bold my-4 text-lg">Recent Posts</div>
        {sortedAllPosts.map((_allPosts: GroupPostsType) => (
          <div key={_allPosts.year}>
            <div className="mb-4">
              {_allPosts.year}
              <span>[{_allPosts?.data?.length || 0}]</span>
            </div>
            {_allPosts?.data?.map((_posts: Posts) => (
              <div className="flex mb-4" key={_posts.title}>
                <span className="pl-4 mr-8">
                  {format(_posts.date, "MM/dd")}
                </span>
                <Link href={_posts.url} className="text-[#800] hover:underline">
                  {_posts.category} | {_posts.title}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}

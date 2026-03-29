import Link from "next/link";
import { getAllPosts } from "@/services/postService";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-24">
      <div className="mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-900 dark:text-zinc-50">
          The Feed.
        </h1>
        <p className="mt-6 text-xl text-zinc-500 max-w-2xl">
          Exploring the intersections of technology, design, and code. Thoughtfully curated stories from our production-grade blog.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
          <p className="text-zinc-500 font-medium">No posts yet. Why don't you create one?</p>
          <Link
            href="/new"
            className="mt-4 inline-flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-50 hover:underline transition-all"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
          {posts.map((post) => (
            <article key={post.id} className="group relative flex flex-col items-start bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm transition-all hover:bg-zinc-100/50 dark:bg-zinc-900/40 dark:border-zinc-800 dark:hover:bg-zinc-900/60">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                <Link href={`/posts/${post.id}`}>
                  <span className="absolute inset-0 z-20 rounded-3xl" />
                  <span className="relative z-10">{post.title}</span>
                </Link>
              </h2>
              <time className="relative z-10 order-first mb-4 flex items-center pl-3.5 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                </span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {post.content}
              </p>
              <div
                aria-hidden="true"
                className="relative z-10 mt-6 flex items-center text-sm font-bold text-black dark:text-zinc-50 transition group-hover:translate-x-1"
              >
                Read story
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="ml-1 h-4 w-4 stroke-current"
                >
                  <path
                    d="M6.75 5.75L9.25 8l-2.5 2.25"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

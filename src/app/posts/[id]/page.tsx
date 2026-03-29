import { getPostById } from "@/services/postService";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-12 md:py-24 animate-in fade-in duration-1000">
      <Link
        href="/"
        className="group mb-12 inline-flex items-center text-sm font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="mr-2 h-4 w-4 stroke-current transition-transform group-hover:-translate-x-1"
        >
          <path
            d="M9.25 11.25L6.75 9l2.5-2.25"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to feed
      </Link>

      <header className="flex flex-col">
        <time className="order-first flex items-center text-base font-semibold text-zinc-400 dark:text-zinc-500">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500 mr-4" />
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-6xl">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center gap-3 text-sm font-bold text-zinc-500">
          <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" />
          <span>{post.author.name}</span>
        </div>
      </header>

      <div className="mt-16 sm:mt-24 space-y-8">
        {post.content?.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-xl leading-9 text-zinc-600 dark:text-zinc-400 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-50 dark:selection:text-black">
            {paragraph}
          </p>
        ))}
      </div>

      <footer className="mt-24 border-t border-zinc-100 pt-12 dark:border-zinc-800">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-zinc-300 dark:text-zinc-600">The End.</p>
          <Link
            href="/"
            className="group text-lg font-bold text-zinc-900 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300 transition-all flex items-center gap-2"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to all stories
          </Link>
        </div>
      </footer>
    </article>
  );
}

"use client";

import { useActionState } from "react";
import { createPostAction } from "@/actions/postActions";
import { Input, Button } from "@/components/ui";
import Link from "next/link";

export default function NewPostPage() {
  const [state, action, isPending] = useActionState(createPostAction, null);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="group mb-8 inline-flex items-center text-sm font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="mr-2 h-4 w-4 stroke-current transition-transform group-hover:-translate-x-1"
        >
          <path
            d="M9.25 10.25L6.75 8l2.5-2.25"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to feed
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Create something new.
        </h1>
        <p className="text-xl text-zinc-500">
          Share your ideas with the world. Your story will be published instantly.
        </p>
      </div>

      <form action={action} className="mt-12 space-y-8">
        {state?.error && (
          <div className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
            {state.error}
          </div>
        )}

        <Input
          label="Title"
          id="title"
          name="title"
          required
          placeholder="Give your story a name..."
        />

        <div className="grid gap-2">
          <label
            htmlFor="content"
            className="text-sm font-semibold uppercase tracking-wider text-zinc-500"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            required
            placeholder="What's on your mind?"
            className="block w-full rounded-xl border-0 bg-white px-4 py-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 dark:ring-zinc-800 dark:focus:ring-zinc-50 sm:text-sm transition-all"
          />
        </div>

        <Button type="submit" loading={isPending} className="w-full sm:w-auto">
          Publish Story
        </Button>
      </form>
    </div>
  );
}

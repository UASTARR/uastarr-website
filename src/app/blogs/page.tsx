import { Metadata } from "next";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "Blogs",
};

export default function BlogsPage() {
  const notionUrl = process.env.NEXT_PUBLIC_NOTION_BLOGS_URL;

  if (!notionUrl) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-black px-6 pt-32">
        <p className="text-white text-center text-lg">
          Set <code className="text-yellow-500">NEXT_PUBLIC_NOTION_BLOGS_URL</code> to
          your published Notion page URL.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[rgb(25,25,25)] pt-32">
      <iframe
        src={notionUrl}
        title="STARR Blogs"
        className="block h-[calc(100dvh-8rem)] w-full border-0"
        allow="fullscreen"
      />
    </main>
  );
}

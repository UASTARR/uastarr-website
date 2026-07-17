import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wiki",
};

export default function WikiPage() {
  const notionUrl = process.env.NEXT_PUBLIC_NOTION_WIKI_URL;

  if (!notionUrl) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-black px-6 pt-32">
        <p className="text-white text-center text-lg">
          Set <code className="text-yellow-500">NEXT_PUBLIC_NOTION_WIKI_URL</code> to
          your published Notion page URL.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[rgb(25,25,25)] pt-32">
      <iframe
        src={notionUrl}
        title="STARR Wiki"
        className="block h-[calc(100dvh-8rem)] w-full border-0"
        allow="fullscreen"
      />
    </main>
  );
}

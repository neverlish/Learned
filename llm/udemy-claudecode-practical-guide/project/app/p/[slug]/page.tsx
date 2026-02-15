export default function PublicNotePage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold">Public Note</h1>
        <p className="mt-4 text-muted-foreground">Slug: {params.slug}</p>
        <p className="text-sm text-muted-foreground">Read-only content viewer</p>
      </main>
    </div>
  );
}

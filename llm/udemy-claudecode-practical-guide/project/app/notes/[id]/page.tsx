export default function NotePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold">Note Editor</h1>
        <p className="mt-4 text-muted-foreground">Note ID: {params.id}</p>
        <p className="text-sm text-muted-foreground">TipTap editor + Title field + Share toggle + Delete button</p>
      </main>
    </div>
  );
}

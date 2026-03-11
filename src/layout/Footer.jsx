export default function Footer() {
  return (
    <footer className="border-t p-5">
      <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Weatherly.
      </div>
    </footer>
  );
}

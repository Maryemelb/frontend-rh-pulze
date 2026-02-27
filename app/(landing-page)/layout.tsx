import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header style={{ padding: "2px", borderBottom: "1px bg-white #ccc" }}>
       
      </header>

      <main style={{ padding: "20px" }}>{children}</main>

      <footer style={{ padding: "20px", borderTop: "1px solid #ccc" }}>
        © 2026
      </footer>
    </div>
  );
}

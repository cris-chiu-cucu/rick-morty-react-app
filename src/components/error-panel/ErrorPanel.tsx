import "./ErrorPanel.css";

export default function ErrorPanel({ errorMessage }: { errorMessage: string }) {
  return <div className="error-panel">{errorMessage}</div>;
}

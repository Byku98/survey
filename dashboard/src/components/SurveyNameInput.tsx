type Props = {
  openName: string;
  setOpenName: React.Dispatch<React.SetStateAction<string>>;
};

export default function NameInput({ openName, setOpenName }: Props) {
  return (
    <div className="card shadow-lg p-2 mb-1">
      <p className="mb-2 font-semibold">Give me Your name handsome...</p>
      <textarea
        value={openName}
        onChange={(e) => setOpenName(e.target.value)}
        className="w-full p-2 border rounded resize-none"
        rows={1}
        maxLength={50}
        placeholder="Your beautiful name..."
      />
    </div>
  );
}
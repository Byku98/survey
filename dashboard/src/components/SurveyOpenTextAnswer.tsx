type Props = {
  openAnswer: string;
  setOpenAnswer: React.Dispatch<React.SetStateAction<string>>;
};

export default function OpenTextAnswer({ openAnswer, setOpenAnswer }: Props) {
  return (
    <div className="card shadow-lg p-2 mb-1">
      <p className="mb-2 font-semibold">How is Your mood today?</p>
      <textarea
        value={openAnswer}
        onChange={(e) => setOpenAnswer(e.target.value)}
        className="w-full p-2 border rounded resize-none"
        rows={4}
        placeholder="Your answer..."
      />
    </div>
  );
}
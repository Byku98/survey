type Props = {
  radioAnswer: string;
  setRadioAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const options = [
  "Night Owl",
  "Morning Sunshine",
  "Sleeper all time",
  "Sleep? What sleep?",
];

export default function RadioGroup({ radioAnswer, setRadioAnswer }: Props) {
  return (
    <div className="card shadow-lg p-2 border rounded mb-1">
      <p className="mb-2 font-semibold">How You'd describe Yourself?</p>
      {options.map((option) => (
        <label key={option} className="block">
          <input
            type="radio"
            name="decision"
            value={option}
            checked={radioAnswer === option}
            onChange={(e) => setRadioAnswer(e.target.value)}
            className="mx-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
}
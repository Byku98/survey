type Props = {
  checkboxAnswers: string[];
  setCheckboxAnswers: React.Dispatch<React.SetStateAction<string[]>>;
};

const options = [
  "Meat",
  "Cheese",
  "Onion",
  "Fried Onion",
  "Tomato",
  "Picle",
  "Salad",
  "Sauce",
];

export default function CheckboxGroup({ checkboxAnswers, setCheckboxAnswers }: Props) {
  return (
    <div className="card shadow-lg p-2 mb-1">
      <p className="mb-2 font-semibold">How You'd compose Your hamburger?</p>
      {options.map((option) => (
        <label key={option} className="block">
          <input
            type="checkbox"
            value={option}
            checked={checkboxAnswers.includes(option)}
            onChange={() => {
              if (checkboxAnswers.includes(option)) {
                setCheckboxAnswers(checkboxAnswers.filter((item) => item !== option));
              } else {
                setCheckboxAnswers([...checkboxAnswers, option]);
              }
            }}
            className="mr-2 mx-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
}
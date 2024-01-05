import {
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";

interface PageSelectorProps {
  setActivePath: (path: string) => void;
}

const PageSelector = ({ setActivePath }: PageSelectorProps) => {
  const pages = [
    { name: "intro", title: "Introduction" },
    { name: "mathematics_of_transformers", title: "The Math of Transformers" },
  ];

  const handleChange = (e: { target: { value: string; }; }) => {
    setActivePath(e.target.value as string);
  };

  return (
    <>
      <FormControl>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Post
        </InputLabel>
        <NativeSelect
          defaultValue={"intro"}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          onChange={handleChange}
        >
          {pages.map((page) => {
            return <option value={page.name}>{page.title}</option>;
          })}
        </NativeSelect>
      </FormControl>
    </>
  );
};

export default PageSelector;

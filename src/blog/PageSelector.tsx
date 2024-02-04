import { FormControl, InputLabel, NativeSelect } from "@mui/material";

const PageSelector = () => {
  const pages = [
    { name: "intro", title: "Introduction" },
    { name: "mathematics_of_transformers", title: "The Math of Transformers" },
    { name: "example_page_1", title: "Example Page" },
  ];

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
        >
          {pages.map((page) => {
            return (
              <option key={page.name} value={page.name}>
                {page.title}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </>
  );
};

export default PageSelector;

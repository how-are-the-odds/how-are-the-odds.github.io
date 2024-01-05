import PageSelector from "./PageSelector";
import "./blog.css";
import { useState } from "react";

const BlogApp = () => {
  const [pathToContent, setPathToContent] = useState("intro");

  const ContentPromise = import(`./pages/${pathToContent}.mdx`);

  const [displayPage, setDisplayPage] = useState(<></>);

  ContentPromise.then((content) => {
    setDisplayPage(<>{content.default({})}</>);
  });

  return (
    <div className="blog">
      <div className="selector">
        <PageSelector setActivePath={setPathToContent}></PageSelector>
      </div>

      {displayPage}
    </div>
  );
};

export default BlogApp;

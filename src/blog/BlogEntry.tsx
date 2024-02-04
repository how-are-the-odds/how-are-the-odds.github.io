import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "katex/dist/katex.min.css";
import { Article } from "./Article";

const BlogEntry = () => {
  const params = useParams();
  const [displayArticle, setDisplayArticle] = useState<Article>();

  useEffect(() => {
    const ContentPromise = import(`./pages/${params.entry}.mdx`);
    ContentPromise.then((content) => {
      setDisplayArticle(
        new Article(
          content.title,
          content.default({}),
          content.date,
          params.entry ?? ""
        )
      );
      document.title = content.title;
    });
  }, []);

  const articleFormatted = displayArticle ? (
    <>
      <h2>{displayArticle.title} </h2> {displayArticle.content}{" "}
    </>
  ) : (
    <p>Article Not Found :/</p>
  );

  return (
    <>
      <p style={{ textAlign: "right", lineHeight: "0px", fontStyle: "italic" }}>
        <Link to="../blog">(Back to blog)</Link>
      </p>
      {articleFormatted}
    </>
  );
};

export default BlogEntry;

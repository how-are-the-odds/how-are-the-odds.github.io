import { useEffect, useState } from "react";
import "./blog.css";
import { Stack } from "@mui/material";
import { Article } from "./Article";
import EntryPreview from "./EntryPreview";

const BlogApp = () => {
  const articleNames = ["mathematics_of_transformers", "intro"];

  const [articles, setArticles] = useState<Article[]>([]);

  async function loadArticles() {
    Promise.all(
      articleNames.map(async (name) => {
        const article = await import(`./pages/${name}.mdx`);
        return new Article(
          article.title,
          article.default({}),
          article.date,
          name,
          article.preview
        );
      })
    ).then((articles) => {
      articles.sort((a, b) => b.date.getTime() - a.date.getTime());
      setArticles(articles);
    });
  }

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <Stack className="blog">
      <h2>Recent</h2>
      {articles.map((article) => (
        <EntryPreview key={article.title} article={article} />
      ))}
    </Stack>
  );
};

export default BlogApp;

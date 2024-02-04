import { Link } from "react-router-dom";
import { Article } from "./Article";

interface EntryPreviewProps {
  article: Article;
}

const EntryPreview = ({ article }: EntryPreviewProps) => {
  console.log(article.content)
  return (
    <div>
      <h3 style={{ lineHeight: "0px", display: "inline"}}>
        <Link to={article.name}>{article.title} </Link>
      </h3>
      <p style={{ opacity: 0.5, fontStyle: "italic", display: "inline" }}>
        ({article.date.toDateString()})
      </p>
      <blockquote className="preview">{article.preview}</blockquote>
    </div>
  );
};

export default EntryPreview;

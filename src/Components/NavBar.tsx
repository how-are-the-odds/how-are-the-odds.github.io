const NavBar = () => {
  const pages = [
    { text: "Home", link: "/" },
    { text: "Pick a matchup", link: "/static" },
    { text: "Live Game Predictions", link: "/livegames" },
    { text: "Methodology", link: "/methodology" },
  ];
  const pageOptions = pages.map((page) => {
    let classes = ["nav-item", "nav-link"];
    if (window.location.pathname == page.link) {
      classes = [...classes, "active"];
    }
    return (
      <a
        className={classes.join(" ")}
        href={page.link == window.location.pathname ? "#" : page.link}
        key={page.text}
      >
        {page.text}
      </a>
    );
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        The Odds
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">{pageOptions}</div>
      </div>
    </nav>
  );
};

export default NavBar;

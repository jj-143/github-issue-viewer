import SearchRepositories from "./repository/SearchRepositories";
import Issues from "./issue/Issues";

function Main() {
  return (
    <main style={{ display: "flex" }}>
      <div style={{ width: "500px" }}>
        <SearchRepositories />
      </div>
      <div style={{ flex: 1 }}>
        <Issues />
      </div>
    </main>
  );
}
export default Main;

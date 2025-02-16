import EditorPick from "./editor-pick";
import MenuCategories from "./menu-categories";
import Trending from "./trending";

function Menu() {
  return (
    <div className="hidden md:block w-1/3">
      <Trending />
      <MenuCategories />
      <EditorPick />
    </div>
  );
}
export default Menu;

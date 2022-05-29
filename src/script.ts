import { set100ViewMode } from "./services/set100ViewMode";
import { searchPreset } from "./services/searchPreset";

function main() {
  // 詳細画面か確認
  var url = new URL(location.href);
  if (url.pathname !== "/yugiohdb/card_search.action") return;

  // 100件セット
  set100ViewMode(url);
  // プリセット
  searchPreset(url);
}

main();

import { set100ViewMode } from "./services/set100ViewMode";
import { searchPreset } from "./services/searchPreset";

function main() {
  // 詳細画面か確認
  var url = new URL(location.href);
  const WHITE_LIST = [
    "/yugiohdb/card_search.action",
    "yugiohdb/member_have_want_card.action",
  ];
  if (!WHITE_LIST.includes(url.pathname)) return;

  // 100件セット
  set100ViewMode(url);
  // プリセット
  searchPreset(url);
}

main();

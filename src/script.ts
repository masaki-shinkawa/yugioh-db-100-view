function main() {
  var url = new URL(location.href);
  if (url.pathname !== "/yugiohdb/card_search.action") return;

  const selectTag = document.getElementById("rp");
  if (!selectTag) return;

  // 詳細画面以外は処理を中断
  if (url.searchParams.get("ope") !== "1") return;

  if (url.searchParams.get("rp") !== "100") {
    url.searchParams.set("rp", "100");
    location.href = url.toString();
  }
}

main();

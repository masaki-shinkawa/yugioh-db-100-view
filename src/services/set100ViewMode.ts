export const set100ViewMode = (url: URL) => {
  const selectTag = document.getElementById("rp");
  if (!selectTag) return;

  // 詳細画面以外は処理を中断
  if (!["1", "2"].includes(url.searchParams.get("ope") ?? "")) return;

  const rp = parseInt(url.searchParams.get("rp") ?? "100");
  if (rp < 100) {
    url.searchParams.set("rp", "100");
    location.href = url.toString();
  }
};

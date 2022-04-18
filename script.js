function main() {
  var url = new URL(location.href)
  if (url.pathname !== "/yugiohdb/card_search.action") return

  const selectTag = document.getElementById('rp')
  if (!selectTag) return

  if (url.searchParams.get("rp") !== "100") {
    url.searchParams.set("rp", 100)
    location.href = url.toString()
  }
}

main()

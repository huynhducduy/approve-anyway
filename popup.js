var matchesElm = document.getElementById("matches");
var saveBtn = document.getElementById("save-button");

chrome.storage.sync.get(["matches"], ({ matches }) => {
  matchesElm.value = matches || '';
});

saveBtn.addEventListener("click", async () => {
  chrome.storage.sync.set({'matches': matchesElm.value});
});

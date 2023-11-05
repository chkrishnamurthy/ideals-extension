document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const increaseWidthBtn = document.getElementById("increase-width");
  const decreaseWidthBtn = document.getElementById("decrease-width");
  const increaseHeightBtn = document.getElementById("increase-height");
  const decreaseHeightBtn = document.getElementById("decrease-height");

  // Initialize the dimensions from chrome.storage or use default values
  chrome.storage.sync.get({ width: 480, height: 400 }, (items) => {
    popup.style.width = items.width + "px";
    popup.style.height = items.height + "px";
  });

  // Function to update the dimensions and save to chrome.storage
  const updateDimensions = (widthChange, heightChange) => {
    chrome.storage.sync.get({ width: 480, height: 400 }, (items) => {
      const newWidth = items.width + widthChange;
      const newHeight = items.height + heightChange;

      if (newWidth >= 100 && newHeight >= 100) {
        chrome.storage.sync.set({ width: newWidth, height: newHeight });
        popup.style.width = newWidth + "px";
        popup.style.height = newHeight + "px";
      }
    });
  };

  // Add event listeners for buttons
  increaseWidthBtn.addEventListener("click", () => updateDimensions(10, 0));
  decreaseWidthBtn.addEventListener("click", () => updateDimensions(-10, 0));
  increaseHeightBtn.addEventListener("click", () => updateDimensions(0, 10));
  decreaseHeightBtn.addEventListener("click", () => updateDimensions(0, -10));
});

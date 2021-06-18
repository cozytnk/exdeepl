console.log(`${chrome.runtime.id} background.js`)
chrome.storage.sync.set({ active: true })


// REF:
// [chrome.storage - Chrome Developers](https://developer.chrome.com/docs/extensions/reference/storage/)


window.isActive = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['active'], result => resolve(result.active))
  })
}

chrome.browserAction.onClicked.addListener(async tab => {
  const active = await window.isActive()
  chrome.storage.sync.set({ active: !active })
})


chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    // console.log(
    //   `Storage key "${key}" in namespace "${namespace}" changed.`,
    //   `Old value was "${oldValue}", new value is "${newValue}".`
    // )

    if (namespace === 'sync' && key === 'active') {
      const active = newValue
      chrome.browserAction.setIcon({ path: active ? 'favicon-38.png' : 'favicon-gray-38.png' })
    }

  }
})
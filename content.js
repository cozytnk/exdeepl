console.log(chrome.runtime.name)

// 参考
// [クリップボードとのやりとり - Mozilla | MDN](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard)
// [HTMLElement.onpaste - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/onpaste)
// [[JavaScript]クリップボードを使ったコピーとペースト - Qiita](https://qiita.com/butakoma/items/642c0ec4b77f6bb5ebcf)


/*
this is
test.
*/


window.isActive = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['active'], result => resolve(result.active))
  })
}

let repasteFlg = false

document.querySelector('.lmt__source_textarea').addEventListener('paste', async event => {
  console.log(`@textarea.onpaste`)

  let text = event.clipboardData.getData('text')
  console.log('text:', text)

  if (repasteFlg) {
    repasteFlg = false
    return
  }


  // 今回のペーストを取り消し
  event.preventDefault()
  event.stopPropagation()


  // テキストの整形の要否を確認
  const active = await window.isActive()
  console.log('active:', active)

  if (active && confirm(`改行とか消しときます？\n\n${text}`)) {

    // テキストの整形
    text = text.replace(/\r?\n/g, ' ')
    console.log(`new text:`, text)

  }


  // 整形後のテキストをクリップボードにコピー

  const tmp = document.createElement('textarea')
  tmp.value = text
  document.body.appendChild(tmp)
  tmp.select()
  let ret = document.execCommand('copy')
  document.body.removeChild(tmp)
  console.log('ret:', ret)

  // await (ms => new Promise(resolve => setTimeout(resolve, ms))) (500)


  // 再ペースト
  repasteFlg = true
  event.target.focus()
  document.execCommand('paste')

})
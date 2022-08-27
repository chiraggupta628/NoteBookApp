import { HtmlDiffer } from 'html-differ'
import React from 'react'

const diffhtml = ()=>{
  const option = {
    "ignoreEndTags":"true"
  }
  const html1 = "abcdefghijkl<em><u>mnop</u></em>"
  const html2 = "abcdefghijklmnop"
  const differ = new HtmlDiffer(option);
  const array = differ.diffHtml(html1,html2);
  console.log(array);
}
export const HTMLDiffer = () => {
  return (
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={diffhtml}>
    HTML Differ
</button>
  )
}

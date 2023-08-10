const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const filePath = '../pdf/pdf1.pdf';

const loadingTask = pdfjsLib.getDocument(filePath);
loadingTask.promise.then((pdfDocument) => {
    const textPromises = [];
    const numPages = pdfDocument.numPages;
    console.log("numPages==", numPages);
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      textPromises.push(
        pdfDocument.getPage(pageNumber).then((page) => {
          return page.getTextContent().then((textContent) => {
            console.log("textContent===", textContent);
            return textContent.items.map((item) => item.str).join(' ');
          }).catch(e=> {
            console.log("getTextContent===error==", e);
          });
        }).catch(e=> {
            console.log("error===",e)
        })
      );
    }
    
    Promise.all(textPromises).then((pagesText) => {
      console.log('整个文档的文本内容:', pagesText.join('\n'));
    });
    
}).catch((error) => {
  console.error('发生错误:', error);
});

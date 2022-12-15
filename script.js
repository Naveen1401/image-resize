let aspectRatio;

let orgHeight, orgWidth;
let newHeight, newWidth;

let svgUrl = null;

const input = document.getElementById("imageFile");

input.onchange = function (ev) {
    const file = ev.target.files[0]; // get the file
    // console.log(file.innerText);
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;

    // const preview = document.querySelector('img');
    // const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();


    // reader.addEventListener("load",function () {
    //         // convert image file to base64 string
    //         // preview.src = reader.result;
    //         var svg = atob(reader.result.replace(/data:image\/svg\+xml;base64,/, ""));
    //         let newSvg = document.createElement("svg");

    //         const parser = new DOMParser();
    //         const doc = parser.parseFromString(svg, "text/html");
    //         let temp = doc.getElementsByTagName("svg")[0];
    //         temp.setAttribute("height", "385px");
    //         temp.setAttribute("width", "500px");
    //         console.log(doc.getElementsByTagName("svg")[0]);




    //         const svgTodownload = temp;
    //         if (svgTodownload) {
    //             let { width, height } = svgTodownload.getBBox();
    //             let clonedSvgElement = svgTodownload.cloneNode(true);
    //             let outerHTML = clonedSvgElement.outerHTML,
    //                 blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
    //             let URL = window.URL || window.webkitURL || window;
    //             let blobURL = URL.createObjectURL(blob);
    //             let image = new Image();
    //             image.onload = () => {
    //                 let canvas = document.createElement("canvas");
    //                 canvas.width = width;
    //                 canvas.height = height;
    //                 let context = canvas.getContext("2d");
    //                 context.drawImage(image, 0, 0, width, height);
    //                 svgUrl = URL.createObjectURL(blob);

    //                 // downloadFunc(svgUrl, "svg");
    //             };
    //             image.src = blobURL;
    //             setTimeout(() => {
    //                 if (lang === "en") {
    //                     window.location.href = `/download?tool=${pageTool}`;
    //                 } else {
    //                     window.location.href = `/${lang}/download?tool=${pageTool}`;
    //                 }
    //             }, 1000);
    //         }




    //         newSvg.append(temp);
    //         document.getElementById("root").append(newSvg);
    //         // document.getElementById("root").append(svg);
    //         // newSvg.setAttribute("height", "500px");

    //         // console.log(newSvg);
    //         // console.log(newSvg.height);
    //     },
    //     false
    // );


    reader.onload = function (e) {
        document.getElementById('preview').src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }

    img.onerror = function () {
        URL.revokeObjectURL(this.src);
        // Handle the failure properly
        console.log("Cannot load image");
    };
    img.onload = function () {
        URL.revokeObjectURL(this.src);
        document.getElementById("myHeight").setAttribute("value", `${img.height}`);
        document.getElementById("myWidth").setAttribute("value", `${img.width}`);
        orgHeight = img.height;
        orgWidth = img.width;
        aspectRatio = img.height / img.width;
        // console.log(aspectRatio);
    };
};




let useHeight = false;
let useWidth = false;
let notRatio = false;

const heightFnc = (myH) => {
    newHeight = parseInt(myH.value);
    console.log(newHeight)
    if (notRatio == false) {
        useHeight = true;
        useWidth = false;
    }

    // newWidth = newHeight * (orgWidth / orgHeight);
    // document.getElementById("myWidth").value = `${newWidth}`;
    // document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
    // document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
}

const widthFnc = (myW) => {
    newWidth = parseInt(myW.value);
    console.log(newWidth)
    if (notRatio == false) {
        useHeight = false;
        useWidth = true;
    }

    // newHeight = newWidth * (orgHeight / orgWidth);
    // document.getElementById("myHeight").value = `${newHeight}`;
    // document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
    // document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
}


// const notByRatio = () => {
//     useHeight = false;
//     useWidth = false;
//     notRatio = true;
// }

const aspectRatio2 = () =>{
    let temp = document.getElementById("aspectRatio");
    if(temp.checked){
        console.log("check");
        useHeight = true;
        useWidth = true;
        notRatio = false;
    }else{
        console.log("uncheck")
        useHeight = false;
        useWidth = false;
        notRatio = true;
    }
}








const ResizeImage = () =>{
    console.log(1);
    const input = document.getElementById("imageFile");
    const file = input.files[0];

    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;

    // const preview = document.querySelector('img');
    // const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        // preview.src = reader.result;
        var svg = atob(reader.result.replace(/data:image\/svg\+xml;base64,/, ""));
        let newSvg = document.createElement("svg");

        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, "text/html");
        let temp = doc.getElementsByTagName("svg")[0];

        if(useHeight == true){
            svgHeight = newHeight;
            svgWidth = newHeight * (orgWidth / orgHeight);
        }
        if(useWidth == true){
            svgHeight = newWidth * (orgHeight / orgWidth);
            svgWidth = newWidth;
        }
        if(notRatio == true){
            svgHeight = newHeight;
            svgWidth = newWidth;
        }

        temp.setAttribute("height", `${svgHeight}`);
        temp.setAttribute("width", `${svgWidth}`);
        console.log(doc.getElementsByTagName("svg")[0]);




        const svgTodownload = temp;
        if (svgTodownload) {
            let { width, height } = svgTodownload.getBBox();
            let clonedSvgElement = svgTodownload.cloneNode(true);
            let outerHTML = clonedSvgElement.outerHTML,
                blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
            let URL = window.URL || window.webkitURL || window;
            let blobURL = URL.createObjectURL(blob);
            let image = new Image();
            image.onload = () => {
                let canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, width, height);
                svgUrl = URL.createObjectURL(blob);

                // downloadFunc(svgUrl, "svg");
            };
            image.src = blobURL;
            setTimeout(() => {
                if (lang === "en") {
                    window.location.href = `/download?tool=${pageTool}`;
                } else {
                    window.location.href = `/${lang}/download?tool=${pageTool}`;
                }
            }, 1000);
        }




        newSvg.append(temp);
        document.getElementById("root").append(newSvg);
        // document.getElementById("root").append(svg);
        // newSvg.setAttribute("height", "500px");

        // console.log(newSvg);
        // console.log(newSvg.height);
    },
        false
    );
    if (file) {
        reader.readAsDataURL(file);
    }
}















// const heightFnc = (myH) =>{
//     newHeight = parseInt(myH.value);
//     console.log(newHeight)
//     newWidth = newHeight * (orgWidth/orgHeight);
//     document.getElementById("myWidth").value = `${newWidth}`;
//     document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
//     document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
// }

// const widthFnc = (myW) =>{
//     newWidth = parseInt(myW.value);
//     console.log(newWidth)
//     newHeight = newWidth * (orgHeight / orgWidth);
//     document.getElementById("myHeight").value = `${newHeight}`;
//     document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
//     document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
// }

// $(document).ready(function() {

//     $('#imageFile').change(function(evt) {

//         var files = evt.target.files;
//         var file = files[0];

//         if (file) {
//             var reader = new FileReader();
//             reader.onload = function(e) {
//                 document.getElementById('preview').src = e.target.result;
//             };
//             reader.readAsDataURL(file);
//         }
//     });
// });

// let MAX_WIDTH = parseInt(newWidth);
// let MAX_HEIGHT = parseInt(newHeight);
// let MIME_TYPE = "image/svg+xml";
// let QUALITY = 1;

// function ResizeImage(){
//     MAX_HEIGHT = parseInt(newHeight);
//     MAX_WIDTH = parseInt(newWidth);
//     console.log(MAX_HEIGHT, MAX_WIDTH);
//     const input = document.getElementById("img-input");
//    //   input.onchange = function (ev) {
//         var filesToUploads = document.getElementById('imageFile').files;
//         var file = filesToUploads[0];
//        // //   const file = ev.target.files[0];  get the file
//         const blobURL = URL.createObjectURL(file);
//         const img = new Image();
//         img.src = blobURL;
//         img.onerror = function () {
//             URL.revokeObjectURL(this.src);
//            //   Handle the failure properly
//             console.log("Cannot load image");
//         };
//         img.onload = function () {
//             URL.revokeObjectURL(this.src);
//             const [newWidth2, newHeight2] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
//             const canvas = document.createElement("canvas");
//             canvas.width = MAX_WIDTH;
//             canvas.height = MAX_HEIGHT;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);
//             canvas.toBlob(
//                 (blob) => {
//                    //   Handle the compressed image. es. upload or save in local state
//                     displayInfo('Original file', file);
//                     displayInfo('Compressed file', blob);

//                     var url = window.URL.createObjectURL(blob);
//                     var a = document.createElement("a");
//                     a.href = url;
//                     a.setAttribute("target", "_blank");
//                     a.download = "pdfBytes";
//                     a.dispatchEvent(new MouseEvent("click"));

//                 },
//                 MIME_TYPE,
//                 QUALITY
//             );
//             document.getElementById("root").append(canvas);
//         };
//    //   };

//     function calculateSize(img, maxWidth, maxHeight) {
//         let width = img.width;
//         let height = img.height;

//        //   calculate the width and height, constraining the proportions
//         if (width > height) {
//             if (width > maxWidth) {
//                 height = Math.round((height * maxWidth) / width);
//                 width = maxWidth;
//             }
//         } else {
//             if (height > maxHeight) {
//                 width = Math.round((width * maxHeight) / height);
//                 height = maxHeight;
//             }
//         }
//         return [width, height];
//     }
// }

// function displayInfo(label, file) {
//     const p = document.createElement('p');
//     p.innerText = `${label} - ${readableBytes(file.size)}`;
//     document.getElementById('root').append(p);
// }

// function readableBytes(bytes) {
//     const i = Math.floor(Math.log(bytes) / Math.log(1024)),
//         sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

//     return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
// }

// input.onchange = function (ev) {
//    //  const file = ev.target.files[0];  get the file
//     const blobURL = URL.createObjectURL(file);
//     const img = new Image();
//     img.src = blobURL;
//     img.onerror = function () {
//         URL.revokeObjectURL(this.src);
//        //   Handle the failure properly
//         console.log("Cannot load image");
//     };
//     img.onload = function () {
//         URL.revokeObjectURL(this.src);
//         const MIME_TYPE = "image/jpeg";
//         const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
//         const canvas = document.createElement("canvas");
//         canvas.width = newWidth;
//         canvas.height = newHeight;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, newWidth, newHeight);
//         canvas.toBlob(
//             (blob) => {
//                //   Handle the compressed image. es. upload or save in local state
//                 displayInfo('Original file', file);
//                 displayInfo('Compressed file', blob);
//             },
//             MIME_TYPE,
//             QUALITY
//         );
//         document.getElementById("root").append(canvas);
//     };
// };

// function calculateSize(img, maxWidth, maxHeight) {
//     let width = img.width;
//     let height = img.height;

//    //   calculate the width and height, constraining the proportions
//     if (width > height) {
//         if (width > maxWidth) {
//             height = Math.round((height * maxWidth) / width);
//             width = maxWidth;
//         }
//     } else {
//         if (height > maxHeight) {
//             width = Math.round((width * maxHeight) / height);
//             height = maxHeight;
//         }
//     }
//     return [width, height];
// }

// //  Utility functions for demo purpose

// function displayInfo(label, file) {
//     const p = document.createElement('p');
//     p.innerText = `${label} - ${readableBytes(file.size)}`;
//     document.getElementById('root').append(p);
// }

// function readableBytes(bytes) {
//     const i = Math.floor(Math.log(bytes) / Math.log(1024)),
//         sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

//     return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
// }

// Array.from(downloadButtons).map((item) => {
//     item.addEventListener("click", (e) => {
//         const svgTodownload = document.getElementById("qrcode").childNodes[0];
//         if (svgTodownload) {
//             let { width, height } = svgTodownload.getBBox();
//             let clonedSvgElement = svgTodownload.cloneNode(true);
//             let outerHTML = clonedSvgElement.outerHTML,
//                 blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
//             let URL = window.URL || window.webkitURL || window;
//             let blobURL = URL.createObjectURL(blob);
//             let image = new Image();
//             image.onload = () => {
//                 let canvas = document.createElement("canvas");
//                 canvas.width = width;
//                 canvas.height = height;
//                 let context = canvas.getContext("2d");
//                 context.drawImage(image, 0, 0, width, height);
//                 if (e.target.dataset.downloadtype === "jpeg") {
//                     let jpeg = canvas.toDataURL("image/jpeg");
//                     downloadFunc(jpeg, "jpeg");
//                 }
//                 if (e.target.dataset.downloadtype === "png") {
//                     let png = canvas.toDataURL();
//                     downloadFunc(png, "png");
//                 }
//                 if (e.target.dataset.downloadtype === "all") {
//                     let png = getBase64String(canvas.toDataURL());
//                     let jpeg = getBase64String(canvas.toDataURL("image/jpeg"));
//                     let webp = getBase64String(canvas.toDataURL("image/webp"));
//                     let svgString = new XMLSerializer().serializeToString(svgTodownload);
//                     let decoded = unescape(encodeURIComponent(svgString));
//                     let base64 = btoa(decoded);
//                     const zip = new JSZip();
//                     const img = zip.folder("images");
//                     img.file("theqrcodekit.png", png, { base64: true });
//                     img.file("theqrcodekit.webp", webp, { base64: true });
//                     img.file("theqrcodekit.jpeg", jpeg, { base64: true });
//                     img.file("theqrcodekit.svg", base64, { base64: true });
//                     zip.generateAsync({ type: "blob" }).then(function (content) {
//                         saveAs(content, "theqrcodekit.zip");
//                     });
//                 }
//                 if (e.target.dataset.downloadtype === "webp") {
//                     let webp = canvas.toDataURL("image/webp");
//                     downloadFunc(webp, "webp");
//                 }
//                 if (e.target.dataset.downloadtype === "svg") {
//                     let svgUrl = URL.createObjectURL(blob);
//                     downloadFunc(svgUrl, "svg");
//                 }
//             };
//             image.src = blobURL;
//             setTimeout(() => {
//                 if (lang === "en") {
//                     window.location.href = `/download?tool=${pageTool}`;
//                 } else {
//                     window.location.href = `/${lang}/download?tool=${pageTool}`;
//                 }
//             }, 1000);
//         }
//     });
// });

const Download =() =>{
    downloadFunc(svgUrl, "svg");
}

const downloadFunc = (url, type) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `qr-code.${type}`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        if (lang === "en") {
            window.location.href = `/download?tool=${pageTool}`;
        } else {
            window.location.href = `/${lang}/download?tool=${pageTool}`;
        }
    }, 70);
};

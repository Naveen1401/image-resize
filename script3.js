
const preview = () => {

    const input = document.querySelector('#imageFile');
    const files = input.files;
    
    let orgHeight, orgWidth;
    
    for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        console.log(file);



        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            // Handle the failure properly
            console.log("Cannot load image");
        };
        img.onload = function () {
            URL.revokeObjectURL(this.src);
            // document.getElementById("myHeight").setAttribute("value", `${img.height}`);
            // document.getElementById("myWidth").setAttribute("value", `${img.width}`);
            orgHeight = img.height;
            orgWidth = img.width;
            // aspectRatio = img.height / img.width;
            console.log(orgHeight);
            let preDiv = document.createElement("div");
            let preImage = document.createElement("img");
            let preSize = document.createElement("spam");
            preSize.innerText = `${orgHeight}` + " X " + `${orgWidth}`;
            // console.log(file.height);
            preImage.setAttribute("id", "preview" + `${i}`)
            preImage.setAttribute("height", "100px");
            preDiv.append(preImage);
            preDiv.append(preSize);
            document.getElementById("root").append(preDiv);
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('preview' + `${i}`).src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
    }
}


let newHeight, newWidth;

let useHeight = false;
let useWidth = false;
let notRatio = false;

const heightFnc = (myH) => {
    newHeight = parseInt(myH.value);
    console.log(newHeight)
    if(notRatio == false){
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
    if(notRatio == false){
        useHeight = false;
        useWidth = true;    
    }
    
    // newHeight = newWidth * (orgHeight / orgWidth);
    // document.getElementById("myHeight").value = `${newHeight}`;
    // document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
    // document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
}


const notByRatio = () =>{
    useHeight = false;
    useWidth = false;
    notRatio = true;
}




const ResizeImage = () => {
    if (useHeight == true) {
        // let MAX_HEIGHT = 100;
        // let MAX_WIDTH = 100;
        let MIME_TYPE = "image/jpeg";
        let QUALITY = 1;
        const input = document.querySelector('#imageFile');

        // Retrieve FileList boject
        const files = input.files;

        // Loop through files
        for (let i = 0; i < files.length; i++) {
            let file = files.item(i);
            console.log(file.name);

            const blobURL = URL.createObjectURL(file);
            const img = new Image();
            img.src = blobURL;
            img.onerror = function () {
                URL.revokeObjectURL(this.src);
                // Handle the failure properly
                console.log("Cannot load image");
            };
            img.onload = function () {
                URL.revokeObjectURL(this.src);

                MAX_HEIGHT = newHeight;
                MAX_WIDTH = newHeight * (img.width/img.height);

                const [newWidth2, newHeight2] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
                const canvas = document.createElement("canvas");
                canvas.width = MAX_WIDTH;
                canvas.height = MAX_HEIGHT;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);
                canvas.toBlob(
                    (blob) => {
                        // Handle the compressed image. es. upload or save in local state
                        // displayInfo('Original file', file);
                        // displayInfo('Compressed file', blob);


                        var url = window.URL.createObjectURL(blob);
                        var a = document.createElement("a");
                        a.href = url;
                        a.setAttribute("target", "_blank");
                        //   a.download = "pdfBytes";
                        a.dispatchEvent(new MouseEvent("click"));


                    },
                    MIME_TYPE,
                    QUALITY
                );
                document.getElementById("root").append(canvas);
            };
            // };

            function calculateSize(img, maxWidth, maxHeight) {
                let width = img.width;
                let height = img.height;

                // calculate the width and height, constraining the proportions
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                return [width, height];
            }
        }
    }
    if (useWidth == true) {
        // let MAX_HEIGHT = 100;
        // let MAX_WIDTH = 100;
        let MIME_TYPE = "image/jpeg";
        let QUALITY = 1;
        const input = document.querySelector('#imageFile');

        // Retrieve FileList boject
        const files = input.files;

        // Loop through files
        for (let i = 0; i < files.length; i++) {
            let file = files.item(i);
            console.log(file.name);

            const blobURL = URL.createObjectURL(file);
            const img = new Image();
            img.src = blobURL;
            img.onerror = function () {
                URL.revokeObjectURL(this.src);
                // Handle the failure properly
                console.log("Cannot load image");
            };
            img.onload = function () {
                URL.revokeObjectURL(this.src);

                MAX_WIDTH = newWidth;
                MAX_HEIGHT = newWidth * (img.height / img.width);

                const [newWidth2, newHeight2] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
                const canvas = document.createElement("canvas");
                canvas.width = MAX_WIDTH;
                canvas.height = MAX_HEIGHT;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);
                canvas.toBlob(
                    (blob) => {
                        // Handle the compressed image. es. upload or save in local state
                        // displayInfo('Original file', file);
                        // displayInfo('Compressed file', blob);


                        var url = window.URL.createObjectURL(blob);
                        var a = document.createElement("a");
                        a.href = url;
                        a.setAttribute("target", "_blank");
                        //   a.download = "pdfBytes";
                        a.dispatchEvent(new MouseEvent("click"));


                    },
                    MIME_TYPE,
                    QUALITY
                );
                document.getElementById("root").append(canvas);
            };
            // };

            function calculateSize(img, maxWidth, maxHeight) {
                let width = img.width;
                let height = img.height;

                // calculate the width and height, constraining the proportions
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                return [width, height];
            }
        }
    }
    if(notRatio == true){
        // let MAX_HEIGHT = 100;
        // let MAX_WIDTH = 100;
        let MIME_TYPE = "image/png";
        let QUALITY = 1;
        const input = document.querySelector('#imageFile');

        // Retrieve FileList boject
        const files = input.files;

        // Loop through files
        for (let i = 0; i < files.length; i++) {
            let file = files.item(i);
            console.log(file.name);

            const blobURL = URL.createObjectURL(file);
            const img = new Image();
            img.src = blobURL;
            img.onerror = function () {
                URL.revokeObjectURL(this.src);
                // Handle the failure properly
                console.log("Cannot load image");
            };
            img.onload = function () {
                URL.revokeObjectURL(this.src);

                MAX_WIDTH = newWidth;
                MAX_HEIGHT = newHeight;

                const [newWidth2, newHeight2] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
                const canvas = document.createElement("canvas");
                canvas.width = MAX_WIDTH;
                canvas.height = MAX_HEIGHT;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);
                canvas.toBlob(
                    (blob) => {
                        // Handle the compressed image. es. upload or save in local state
                        // displayInfo('Original file', file);
                        // displayInfo('Compressed file', blob);


                        var url = window.URL.createObjectURL(blob);
                        var a = document.createElement("a");
                        a.href = url;
                        a.setAttribute("target", "_blank");
                        //   a.download = "pdfBytes";
                        a.dispatchEvent(new MouseEvent("click"));


                    },
                    MIME_TYPE,
                    QUALITY
                );
                document.getElementById("root").append(canvas);
            };
            // };

            function calculateSize(img, maxWidth, maxHeight) {
                let width = img.width;
                let height = img.height;

                // calculate the width and height, constraining the proportions
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                return [width, height];
            }
        }
    }
}
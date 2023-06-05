
export default function perspectiveAction(){
    const canvas2 = document.getElementById("canvas2");
    const ctx = canvas2.getContext("2d");
    const image = document.getElementById("logoImg");
    console.log(image)

    return image.addEventListener("load", (e) => {
    ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
    });
}
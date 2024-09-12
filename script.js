const throttleFunction = (func, delay) => {
    let prev = 0;
    return (...args) => {
        let now = new Date().getTime();
        if (now - prev > delay) {
            prev = now;
            return func(...args);
        }
    }
}
const Data=[
"https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZWx8ZW58MHx8MHx8fDA%3D",
"https://plus.unsplash.com/premium_photo-1673757121102-0ca51260861f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1440&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
const Images=[] 
var idx=0;
var lastX=0, lastY=0
 const tl=gsap.timeline();
 function animation() {
    window.addEventListener("mousemove", throttleFunction(
      (e) => {
        let main = document.querySelector(".main");
        const Imgwrap=document.createElement("div");
        const Img = document.createElement("img");
        Imgwrap.className="imgwrapper";
        Img.className = "img" + idx;
        Img.src = Data[idx % Data.length];
        Imgwrap.style.top =(lastY == 0 ? e.clientY : lastY)+"px";
        Imgwrap.style.left=(lastX == 0 ? e.clientX : lastX)+"px";
       
        idx++;
        main.appendChild(Imgwrap);
        Imgwrap.appendChild(Img);
        gsap.to(Imgwrap,{
          top:e.clientY+"px",
          left:e.clientX+"px",
          duration:.8,
          ease: "power2.Out",
          clipPath:"circle(100% at 50% 50%)"
        })
        gsap.to(Img,{
          delay:.9,
          opacity:0,
          ease: "power2.Out",
        })
        lastX=e.clientX;
        lastY=e.clientY;
      
        Images.push(Imgwrap.className);       
      
        setTimeout(() => {
          const curImgWrap= document.querySelector(`[class="${Images.shift()}"]`); 
          if (curImgWrap) {
             main.removeChild(curImgWrap);
          }
        }, 1200);
      }, 100)
    );
  }
  
  animation();
  

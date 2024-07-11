import { el, setChildren, setAttr, setStyle } from "redom";
import { avtodorLogo } from "./icons.js";

export function avtodorSpinner(toggle ='on') {
    const loadHolderArea = document.getElementById('load-holder-area');
    if(toggle == 'off') {
        loadHolderArea.innerHTML = '';
        loadHolderArea.style.display = 'none';
        // if(timeIntervalID != undefined) clearInterval(timeIntervalID);
    } else if(toggle == 'on') {
        loadHolderArea.style.display = 'block';
        // ============================================
        // Заставка загрузки
        // ============================================
            const holderArea = el("div");
            setAttr(holderArea, {
                style: { backgroundColor: "dimgray", opacity: 0.8 },
                className: "container-fluid d-flex justify-content-center w-100 h-100 flex-column align-items-center holder-wrapper", // You could also just use 'class'
            });
            holderArea.innerHTML = avtodorLogo+'<span>ЗАГРУЗКА...</span>';        
            loadHolderArea.appendChild(holderArea);
            const logoContent = document.querySelectorAll('.holder-wrapper svg path');
            let flag = 1;
            let index = 0;
            let timeIntervalID = setInterval(() => {
            logoContent.forEach(el => { el.style.fill = 'rgb(241, 75, 28)' });
            if(logoContent[index] != undefined) logoContent[index].style.fill = 'white';
            index += flag;
            if(index == 3 || index == 0) flag *= -1;
            }, 500);
        // ============================================
    }
    return;
}
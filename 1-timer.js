import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f,i as c}from"./assets/vendor-BbbuE1sJ.js";const o=document.querySelector("[data-start]"),r=document.querySelector("#datetime-picker"),h=document.querySelector("[data-days]"),y=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),S=document.querySelector("[data-seconds]");o.disabled=!0;let i,s;const C={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];t<=new Date?(c.error({backgroundColor:"#ef4040",message:"Please choose a date in the future",messageColor:"white",messageSize:"20",position:"topRight",close:!0,displayMode:2}),o.disabled=!0):(i=t,o.disabled=!1)}};f(r,C);function n(e){return String(e).padStart(2,"0")}function D(e){const u=Math.floor(e/864e5),d=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:u,hours:d,minutes:l,seconds:m}}o.addEventListener("click",b);function b(){o.disabled=!0,r.disabled=!0,s=setInterval(()=>{const t=i-new Date;if(t<=0){clearInterval(s),a(0),r.disabled=!1,c.success({title:"Done",message:"Countdown finished!",timeout:3e3});return}a(t)},1e3)}function a(e){const t=D(e);h.textContent=n(t.days),y.textContent=n(t.hours),p.textContent=n(t.minutes),S.textContent=n(t.seconds)}
//# sourceMappingURL=1-timer.js.map
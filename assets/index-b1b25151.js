var l=Object.defineProperty;var c=(r,e,t)=>e in r?l(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var u=(r,e,t)=>(c(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();class d extends Error{constructor(t){super("The value must be a number.");u(this,"origin");this.name="NaNError",this.origin=t}}class f extends Error{constructor(){super("The entered day is out of range."),this.name="InvalidDayError"}}class m extends Error{constructor(){super("The entered month does not exist."),this.name="InvalidMonthError"}}class h extends Error{constructor(){super("The entered year does not exist."),this.name="InvalidYearError"}}const g=[0,2,4,6,7,9,11],p=[3,5,8,10];function y(r,e,t){return r<1||r>31?!1:e===1?t%4===0?r<=29:r<=28:g.includes(e)?r<=31:p.includes(e)?r<=30:!1}function v(r,e){if(r<0||r>11)return!1;const t=new Date;return e===t.getUTCFullYear()?r<=t.getUTCMonth():!0}const a=new Date(Date.now());document.getElementById("year").oninput=r=>{const e=r.target,t=e.value,o=a.getFullYear();parseInt(t)>o&&(e.value=o.toString())};document.getElementById("month").oninput=r=>{const e=r.target,t=e.value;t.length>2&&(e.value=t.substring(0,2))};document.getElementById("day").oninput=r=>{const e=r.target,t=e.value;t.length>2&&(e.value=t.substring(0,2))};document.getElementById("birthday-form").onsubmit=r=>{r.preventDefault(),document.querySelectorAll("span.invalid").forEach(e=>{e.classList.remove("invalid"),e.lastElementChild.innerHTML=""});try{const{day:e,month:t,year:o}=E();I(e,t,o);const n=T(new Date(o,t,e));M(n)}catch(e){let t;switch(e.name){case"NaNError":t=document.querySelector(`#${e.origin}-input-column`);break;case"InvalidDayError":t=document.querySelector("#day-input-column");break;case"InvalidMonthError":t=document.querySelector("#month-input-column");break;case"InvalidYearError":t=document.querySelector("#year-input-column")}t.classList.add("invalid"),t.lastElementChild.innerHTML=e.message}};function E(){const r={day:0,month:0,year:0};return document.querySelectorAll('input[type="number"]').forEach(e=>{const t=parseInt(e.value);if(isNaN(t))throw new d(e.id);r[e.id]=t}),r.month--,r}function I(r,e,t){if(t<1900||t>a.getFullYear())throw new h;if(!v(e,t))throw new m;if(!y(r,e,t))throw new f}function T(r){const e=new Date(Date.UTC(a.getFullYear(),a.getMonth(),a.getDate())-r.getTime()).getTime()/1e3/60/60/24,t=Math.floor(e/365);console.log("days ",a.getFullYear(),a.getMonth(),a.getDate());const o=Math.floor(e/(365/12)-12*t);return{days:Math.floor(e-365*t-365/12*o),months:o,years:t}}function M(r){const{days:e,months:t,years:o}=r,[n,s,i]=document.querySelectorAll("span.number");i.innerHTML=`${e}`,s.innerHTML=`${t}`,n.innerHTML=`${o}`}
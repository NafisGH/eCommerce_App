import{c,P as d}from"./constants-D72KXPuJ.js";document.addEventListener("DOMContentLoaded",u);const l=c(d);function u(){const r=document.querySelector(".registration"),t=document.querySelector(".email"),o=document.querySelector(".password");r&&t&&o?r.addEventListener("submit",a):console.error("Form elements not found");async function a(i){i.preventDefault();const n=t.value.trim(),s=o.value.trim();if(!(!n||!s))try{const e=await l.createUser(n,s);localStorage.setItem("user",JSON.stringify(e)),setTimeout(()=>{window.location.href="index.html"},2e3)}catch(e){console.error("Error creating user:",e)}}}
import{r as a,u,j as e}from"./index-5f14f6ae.js";import{m as x}from"./logo-3792b528.js";import{u as m,V as g,a as h}from"./index.esm-692289c6.js";import{s as f,a as b,b as j,c as p}from"./Firebase-aa39438e.js";import"./iconBase-7c88ac89.js";const v="/assets/fb_logo-291307c5.png",N="/assets/google_logo-b9d3850f.png",k=()=>{const[r]=m(p),[i,n]=a.useState(""),[s,c]=a.useState(""),[o,d]=a.useState(!1),t=u();return a.useEffect(()=>{r&&t("/home")},[r,t]),document.querySelector("title").innerHTML="Login - Meja Belajar Digital",e.jsxs("div",{className:"App",children:[e.jsx("div",{className:"absolute w-full h-full pattern-box"}),e.jsxs("div",{className:"flex lg:w-4/5 xl:w-3/5 lg:h-3/4 lg:shadow-2xl rounded-3xl z-10",children:[e.jsxs("div",{className:"h-screen lg:h-auto w-screen lg:w-1/2 p-4 px-7 pb-7 flex flex-col justify-evenly lg:justify-between bg-blue-50 lg:rounded-s-3xl",children:[e.jsx("div",{className:"flex justify-center my-7",children:e.jsx("p",{className:"font-bold text-4xl text-slate-600",children:"Login"})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"email",className:"placeholder:text-slate-500 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2",placeholder:"Enter Email",value:i,onChange:l=>n(l.target.value)}),e.jsxs("div",{className:"w-full relative flex items-center",children:[e.jsxs("button",{className:"absolute right-2 mt-4 p-2 hover:bg-slate-300 rounded-full text-lg",onClick:()=>d(l=>!l),children:[s!==""&&!o&&e.jsx(g,{}),s!==""&&o&&e.jsx(h,{})]}),e.jsx("input",{type:o?"text":"password",className:"pr-11 w-full placeholder:text-slate-500 mt-4 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2",placeholder:"Password",value:s,onChange:l=>c(l.target.value)})]}),e.jsx("button",{className:"transition ease-in-out hover:to-blue-600 hover:from-blue-400 bg-gradient-to-l from-cyan-400 to-blue-500 h-12 rounded mt-4",onClick:async()=>{if(s==="")return alert("Password Empty!");f(i,s)},children:"Login"}),e.jsxs("div",{className:"flex justify-center mt-4 text-sm",children:[e.jsx("p",{children:"Don't have an account?"}),e.jsx("button",{className:"transition ease-in-out hover:text-blue-600 ml-2 text-blue-500",onClick:()=>{t("/signup")},children:"Signup"})]})]}),e.jsx("div",{children:e.jsxs("div",{className:"flex justify-between my-4 grow",children:[e.jsx("div",{className:"grow",children:e.jsx("hr",{className:"h-px my-4 bg-slate-300 border-0"})}),e.jsx("p",{className:"mx-2 mt-1 text-slate-500",children:"Or"}),e.jsx("div",{className:"grow",children:e.jsx("hr",{className:"h-px my-4 bg-slate-300 border-0"})})]})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("button",{className:"transition ease-in-out hover:bg-slate-200 relative bg-blue-50 h-12 rounded border-2 border-slate-300 flex justify-center items-center",onClick:b,children:[e.jsx("img",{src:N,alt:"Logo Google",className:"absolute w-5 left-0 ml-4"}),"Login with Google"]}),e.jsxs("button",{className:"transition ease-in-out hover:bg-fb-600 bg-fb-500 relative text-blue-50 h-12 rounded border mt-4 mb-1 flex justify-center items-center",onClick:j,children:[e.jsx("div",{className:"absolute w-7 left-0 ml-3 bg-blue-50 rounded-full p-1",children:e.jsx("img",{src:v,alt:"Logo Google",className:"rounded-full"})}),"Login with Facebook"]})]})]}),e.jsx("div",{className:"lg:flex hidden w-1/2 bg-gradient-to-bl from-cyan-500 to-blue-500 justify-center items-center rounded-e-3xl",children:e.jsx("div",{className:"px-7 flex flex-col text-center text-blue-50 h-full justify-center ",children:e.jsxs("div",{className:"relative flex flex-col items-center mt-5 h-8/10",children:[e.jsx("img",{src:x,alt:"Logo MBD",className:"w-10/12 cursor-pointer",onClick:()=>t("/")}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-4xl",children:"Meja Belajar Digital"}),e.jsx("p",{className:"px-7",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ut consequatur vero excepturi officia repellendus."})]})]})})})]})]})};export{k as default};
import{r as a,u as x,j as e}from"./index-49b8fe3f.js";import{m as u}from"./logo-3792b528.js";import{u as m,V as g,a as h}from"./index.esm-3b1c118f.js";import{s as p,a as j,b as f,c as b}from"./Firebase-9af91a01.js";import"./iconBase-3d83a6f8.js";const N="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoBAMAAACIy3zmAAAAD1BMVEXu7u4bgOT///8PeuR4s+2nRttrAAAEK0lEQVR42u2cYVriMBRFa2ABE7OB2GEBxHQDFPa/pgGqoyNI0yGt7+p5//pjnPOd77b0xodNO0xshpG4bIAGGmiggQZaENoN83LZ/ntp3PTHcWah43rn8/V5NgoddyHn8An0o0VoFw8nNn+cFHzyr3O6CN6Hx/uT9npj1LvcHBW/oV5M+HX3f1Qfep1PPrWgd7csG4Xe5eDHoKMx6IfsvRczvR71bA96M5Zng9AxFDAby7TblzDbMu0KbkJ78QheDrowHLYyvSkLhynTsVS0IWi3LhV9H3Td9+li0fe9T1eF3hQzG4LeC0IXPzosQU8QbQY6ThBtBdo9JT3oZu/1oKfchmagV0kP2gWvB71JetDuQRB62rPDCPSkTxZv5NT0KU2EtlACVorQ0x54NqCnRtpEG5/4lLZh+rci9MSntA3o4PUyHZOg6Y0i9JMi9MoLZnrvBU0HRei8LHSV9+npDw8DJQDopaALS62pdSBXVFtCTod303+16VUR86G9nC80XfLZkvsKdhaGzr9aOejQmVvbHIUOyVmDHj8wPb7T6UFnZ2+rd3Q1rIt60Llv9KDTPFvN971Pj71Od1W3WNtFoM9vdHLQvSB0doLQvhWE7gShwxbohaAfFaGfFW/EZ0xjGtMLnJqGked05Q2vOj8rFxxFizWXsI0GoeO3NE2myTSZJtNkmkyT6TkyTXOhuWAa05jGNKYxjWlMc2pKc6GN08Z/XKYvJpSsSn86cXbow7UZW2E63J7Zoa/+dcQ0Ydn7cro4O/Q16tHV6Zuznd+0v3vSx7UsBejLPVQ96BT1oE/Ls3rQ0z8vp75Pu+rQwxccZi0B9aGDE4ROrSB0Jwg9tF416F4QOjtB6NQKQneC0C/3oRb0yxf+xEw7QejUCkJ3gtCv9+HMp6aVoftFDmtC5c9DQegUBaE7Qejh5FoMOveKpp0gdGoFoTtB6LBVhO4FoY/9UA86tYLQnSD06b10kV3Tmu/Tp7+Q4NRKQHCC0KkRhD69l6pBn39vIQfdC0Kf+6EadGoEoc/9UAx6+P2hGHTuBaGDIvRwTrPM2ubVhZP/WVLploS+QuBH1oFSSBdz3qexvGtqY8Wtief5uwE5Bh1dE9/9W/d2yQYkW71s9ZJpMk2myTSZJtOzZJpvyd3aj/jx35LDNKYxjWlMYxrTmF7SNB2RjkhHJNNkmkyTaTJNpsm0kUzTXGgumMY0pjGNaUxjGtOcmtJcaOO0cTJNpsk0mSbTZJpMc2pKc8E0pjGNaUxjGtOY5tSU5kIbp42TaTJNpsk0mSbTZJpTU5oLpjGNaUxjGtOYxjSnpjQX2jhtnEyTaTJNpsk0mSbTnJrSXDCNaUxjGtOYxjSmOTWludDGaeNkmkyTaTJNpsk0mebU9Hs3l9tjE7q5Pc4k9NdcAg000EADDfQPh/4DpdNNM2DMG2oAAAAASUVORK5CYII=",v="/assets/google_logo-4a6f2350.png",Q=()=>{const[n]=m(b),[r,i]=a.useState(""),[s,c]=a.useState(""),[o,d]=a.useState(!1),l=x();return a.useEffect(()=>{n&&l("/home")},[n,l]),e.jsxs("div",{className:"App",children:[e.jsx("div",{className:"absolute w-full h-full pattern-box"}),e.jsxs("div",{className:"flex lg:w-4/5 xl:w-3/5 lg:h-3/4 lg:shadow-2xl rounded-3xl z-10",children:[e.jsxs("div",{className:"h-screen lg:h-auto w-screen lg:w-1/2 p-4 px-7 pb-7 flex flex-col justify-evenly lg:justify-between bg-blue-50 lg:rounded-s-3xl",children:[e.jsx("div",{className:"flex justify-center my-7",children:e.jsx("p",{className:"font-bold text-4xl text-slate-600",children:"Login"})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"email",className:"placeholder:text-slate-500 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2",placeholder:"Enter Email",value:r,onChange:t=>i(t.target.value)}),e.jsxs("div",{className:"w-full relative flex items-center",children:[e.jsxs("button",{className:"absolute right-2 mt-4 p-2 hover:bg-slate-300 rounded-full text-lg",onClick:()=>d(t=>!t),children:[s!==""&&!o&&e.jsx(g,{}),s!==""&&o&&e.jsx(h,{})]}),e.jsx("input",{type:o?"text":"password",className:"pr-11 w-full placeholder:text-slate-500 mt-4 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2",placeholder:"Password",value:s,onChange:t=>c(t.target.value)})]}),e.jsx("button",{className:"transition ease-in-out hover:to-blue-600 hover:from-blue-400 bg-gradient-to-l from-cyan-400 to-blue-500 h-12 rounded mt-4",onClick:async()=>{if(s==="")return alert("Password Empty!");p(r,s)},children:"Login"}),e.jsxs("div",{className:"flex justify-center mt-4 text-sm",children:[e.jsx("p",{children:"Don't have an account?"}),e.jsx("button",{className:"transition ease-in-out hover:text-blue-600 ml-2 text-blue-500",onClick:()=>{l("/signup")},children:"Signup"})]})]}),e.jsx("div",{children:e.jsxs("div",{className:"flex justify-between my-4 grow",children:[e.jsx("div",{className:"grow",children:e.jsx("hr",{className:"h-px my-4 bg-slate-300 border-0"})}),e.jsx("p",{className:"mx-2 mt-1 text-slate-500",children:"Or"}),e.jsx("div",{className:"grow",children:e.jsx("hr",{className:"h-px my-4 bg-slate-300 border-0"})})]})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("button",{className:"transition ease-in-out hover:bg-slate-200 relative bg-blue-50 h-12 rounded border-2 border-slate-300 flex justify-center items-center",onClick:j,children:[e.jsx("img",{src:v,alt:"Logo Google",className:"absolute w-5 left-0 ml-4"}),"Login with Google"]}),e.jsxs("button",{className:"transition ease-in-out hover:bg-fb-600 bg-fb-500 relative text-blue-50 h-12 rounded border mt-4 mb-1 flex justify-center items-center",onClick:f,children:[e.jsx("div",{className:"absolute w-7 left-0 ml-3 bg-blue-50 rounded-full p-1",children:e.jsx("img",{src:N,alt:"Logo Google",className:"rounded-full"})}),"Login with Facebook"]})]})]}),e.jsx("div",{className:"lg:flex hidden w-1/2 bg-gradient-to-bl from-cyan-500 to-blue-500 justify-center items-center rounded-e-3xl",children:e.jsx("div",{className:"px-7 flex flex-col text-center text-blue-50 h-full justify-center ",children:e.jsxs("div",{className:"relative flex flex-col items-center mt-5 h-8/10",children:[e.jsx("img",{src:u,alt:"Logo MBD",className:"w-10/12 cursor-pointer",onClick:()=>l("/")}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold text-4xl",children:"Meja Belajar Digital"}),e.jsx("p",{className:"px-7",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ut consequatur vero excepturi officia repellendus."})]})]})})})]})]})};export{Q as default};

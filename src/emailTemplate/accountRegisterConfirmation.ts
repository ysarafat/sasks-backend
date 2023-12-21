const accountRegisterConfirmation = (
  userId: string,
  defaultPassword: string,
) => {
  return `<!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="UTF-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <link rel="preconnect" href="https://fonts.googleapis.com" />
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
           <link
             href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
             rel="stylesheet"
           />
           <title>User register confirmation</title>
           <style>
             body {
               font-family: "Poppins", sans-serif !important;
               margin: 10px;
               padding: 0;
               box-sizing: border-box;
             }
             .container {
               max-width: 600px;
               margin: 0 auto;
               background: linear-gradient(
                 0deg,
                 rgba(241, 245, 249, 1) 0%,
                 rgba(103, 232, 249, 0.479) 100%
               );
               padding: 8px 15px;
               border-radius: 10px;
               text-align: left;
             }
             table {
               width: 100%;
               border-collapse: collapse;
               margin-bottom: 20px;
               margin-top: 25px;
             }
       
             th,
             td {
               border: 1px solid #cac5c5;
               padding: 8px;
               text-align: left;
             }
       
             th {
               background-color: #f1f5f9;
               font-weight: 500;
             }
             td {
               background-color: #f8fafc;
               font-weight: 400;
             }
             button {
               margin-bottom: 20px;
               padding: 5px 10px;
               border: none;
               outline: none;
               background: #188686;
               color: white;
               border-radius: 5px;
               font-weight: 500;
               font-size: 18px;
             }
           </style>
         </head>
         <body>
           <section class="container">
             <h1
               style="
                 font-size: 22px;
                 text-align: center;
                 color: #188686;
                 margin-bottom: 8px;
               "
             >
               Samiridho Agamir Aomaj Kollan Songstha
             </h1>
             <p style="text-align: center; font-size: 18px">
               Your user account is register successfully
             </p>
             <div style="border-bottom: 1px solid rgb(131, 124, 124)"></div>
             <p style="text-align: center">Your login credential</p>
             <div style="margin-top: 20px; margin-bottom: 20px">
               <p>username: ${userId}</p>
               <p>password: ${defaultPassword}</p>
             </div>
             <a href="https://sasks.org/members" target="_blank">
               <button>Login Now</button></a
             >
       
             <div style="border-bottom: 1px solid rgb(131, 124, 124)"></div>
             <div>
               <p>
                 Note:Please use a strong password when changing your password.
                 Password must be 8 characters long and one special character and one
                 number. if any query email us
                 <span
                   ><a
                     href="mailto:admin@sasks.org"
                     style="color: #188686; text-decoration: none"
                     >admin@sasks.org</a
                   ></span
                 >
               </p>
             </div>
             <footer style="margin-top: 30px; text-align: center">
               <a
                 href="https://sasks.org"
                 target="_blank"
                 style="
                   color: #188686;
                   font-size: 22px;
                   text-decoration: none;
                   margin: 0;
                 "
                 >Team SASKS</a
               >
               <br />
               <span style="font-family: 'Dancing Script', cursive; font-size: 20px"
                 >our tag line</span
               >
               <div
                 style="
                   border-bottom: 4px solid rgb(131, 124, 124);
                   width: 50%;
                   margin: 10px auto;
                   border-radius: 10px;
                 "
               ></div>
               <div style="margin: 15px 0; text-align: center">
                 <img
                   src="https://res.cloudinary.com/db8ei7i7y/image/upload/v1703150108/web-assets-don%27t-change/icons8-facebook-96_e9motr.png"
                   alt=""
                   style="width: 35px; height: 35px"
                 />
                 <img
                   src="https://res.cloudinary.com/db8ei7i7y/image/upload/v1703150108/web-assets-don%27t-change/icons8-telegram-96_pqtyoo.png"
                   alt=""
                   style="width: 35px; height: 35px"
                 />
                 <img
                   src="https://res.cloudinary.com/db8ei7i7y/image/upload/v1703150108/web-assets-don%27t-change/icons8-instagram-96_wjvyxh.png"
                   alt=""
                   style="width: 35px; height: 35px"
                 />
                 <img
                   src="https://res.cloudinary.com/db8ei7i7y/image/upload/v1703150108/web-assets-don%27t-change/icons8-youtube-96_reuhen.png"
                   alt=""
                   style="width: 35px; height: 35px"
                 />
               </div>
             </footer>
           </section>
         </body>
       </html>
       `;
};

export default accountRegisterConfirmation;
